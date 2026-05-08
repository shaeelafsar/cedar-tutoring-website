/**
 * Cedar Tutoring Academy — Live Click-Through Smoke Test
 * Mouse / QA Agent — 2026-05-07
 *
 * Covers all MANDATORY checks:
 *   1. Page load + HTTP 200 + no console errors
 *   2. h1 present and non-empty
 *   3. Header nav — every link href contains BASE_PATH; click → verify URL+h1
 *   4. Footer nav — same
 *   5. CTA buttons/links (book|assess|trial|contact|enroll|start|begin|schedule)
 *      → click/navigate each; tel:/mailto:/external → record; Calendly → record
 *   6. Dead-link sweep — HEAD-request every unique internal href; flag 404
 *   7. Image rendering — naturalWidth > 0 for every <img>
 *   8. Below-fold scroll → screenshot (catches Reveal whileInView failures)
 *   9. Mobile pass (375×812) — hamburger opens, links work
 *
 * Run: node scripts/smoke-clickthrough.mjs
 */

import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BASE = "https://shaeelafsar.github.io/cedar-tutoring-website";
const BASE_PATH = "/cedar-tutoring-website";
const SCREENSHOTS_DIR = join(ROOT, ".squad/agents/mouse/screenshots");
const PAGE_TIMEOUT = 35_000;
const CTA_RE = /book|assess|trial|contact|enroll|start|begin|schedule/i;

const THIRD_PARTY_NOISE =
  /cookie.*has been rejected.*cross-site|samesite|calendly|stripe|datadog|segment|hotjar|googletagmanager|gtag|analytics/i;

mkdirSync(SCREENSHOTS_DIR, { recursive: true });

// ── Helpers ─────────────────────────────────────────────────────────────────

function slugify(path) {
  return path === "/" ? "home" : path.replace(/\//g, "-").replace(/^-/, "");
}

function isInternal(href) {
  if (!href) return false;
  if (/^(tel:|mailto:|javascript:|#)/.test(href)) return false;
  if (/^https?:\/\//.test(href)) {
    return href.startsWith(BASE);
  }
  return true; // relative or absolute-path
}

function isCalendly(href, text) {
  return (
    (href && href.includes("calendly")) ||
    /schedule.*appointment|book.*calendly/i.test(text ?? "")
  );
}

function normalizeHref(href) {
  if (!href) return null;
  if (href.startsWith("http")) return href;
  // Absolute path like /cedar-tutoring-website/pricing → full URL
  if (href.startsWith("/")) return `https://shaeelafsar.github.io${href}`;
  return href;
}

// Attach console error listener and return collector
function attachErrorCollector(page) {
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      const t = msg.text();
      if (!THIRD_PARTY_NOISE.test(t)) errors.push(t.slice(0, 160));
    }
  });
  page.on("pageerror", (err) => {
    const t = err.message;
    if (!THIRD_PARTY_NOISE.test(t)) errors.push(t.slice(0, 160));
  });
  return errors;
}

// ── Route discovery ──────────────────────────────────────────────────────────

async function discoverRoutes() {
  const fallback = [
    "/",
    "/about",
    "/why-us",
    "/programs",
    "/programs/math",
    "/programs/reading",
    "/programs/writing",
    "/programs/science",
    "/programs/arabic",
    "/test-prep",
    "/test-prep/sat",
    "/test-prep/act",
    "/test-prep/psat",
    "/pricing",
    "/summer-programs",
    "/contact-us",
    "/faq",
    "/reviews",
    "/locations",
    "/privacy-policy",
    "/book-assessment",
    "/free-trial",
  ];

  try {
    const resp = await fetch(`${BASE}/sitemap.xml`, { signal: AbortSignal.timeout(10_000) });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const xml = await resp.text();
    const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
    if (locs.length === 0) throw new Error("Empty sitemap");
    const paths = locs
      .map((loc) => {
        const u = new URL(loc);
        // Strip the basePath prefix to get the logical route path
        return u.pathname.replace(new RegExp(`^${BASE_PATH}`), "") || "/";
      })
      .filter((p) => p.length > 0);
    console.log(`  ℹ️  Discovered ${paths.length} routes from sitemap.xml`);
    return paths;
  } catch (e) {
    console.warn(`  ⚠️  Sitemap fetch failed (${e.message}). Using hardcoded list.`);
    return fallback;
  }
}

// ── Per-page check ────────────────────────────────────────────────────────────

async function checkPage(context, routePath, viewport) {
  const url = BASE + routePath;
  const slug = slugify(routePath);
  const vp = viewport === "desktop" ? "desktop" : "mobile";

  const result = {
    path: routePath,
    url,
    load: false,
    status: null,
    h1: null,
    h1Text: null,
    headerNavLinks: [],       // { href, text, hrefOk, navOk }
    footerNavLinks: [],       // same
    ctaLinks: [],             // { href, text, kind, navOk }
    brokenImages: [],         // { src, alt }
    consoleErrors: [],
    notes: [],
  };

  const page = await context.newPage();
  page.setDefaultTimeout(PAGE_TIMEOUT);
  const errors = attachErrorCollector(page);
  result.consoleErrors = errors; // live reference — populated during test

  try {
    // 1. Load
    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: PAGE_TIMEOUT,
    });
    result.status = response?.status() ?? null;
    result.load = result.status !== null && result.status < 400;

    if (!result.load) {
      result.notes.push(`HTTP ${result.status}`);
      await page.close();
      return result;
    }

    // For /free-trial, wait for client-side redirect
    if (routePath === "/free-trial") {
      try {
        await page.waitForURL(/\/book-assessment/, { timeout: 8_000 });
      } catch {
        /* didn't redirect — captured in h1/load checks */
      }
    }

    // Give dynamic content (framer-motion reveals, etc.) a moment to paint
    await page.waitForLoadState("networkidle", { timeout: 12_000 }).catch(() => {});

    // 2. h1
    const h1Count = await page.locator("h1").count();
    if (h1Count > 0) {
      result.h1 = true;
      result.h1Text = (await page.locator("h1").first().innerText()).trim().slice(0, 80);
    } else {
      result.h1 = false;
      result.notes.push("No <h1> found");
    }

    // /book-assessment specific checks — Calendly embed + no old assessment form
    if (routePath === "/book-assessment") {
      // Allow Calendly client component to mount
      await page.waitForTimeout(3000);
      const calendlyCount = await page.locator(".cedar-calendly-host").count();
      result.calendlyEmbed =
        calendlyCount > 0 &&
        (await page.locator(".cedar-calendly-host").first().isVisible());
      if (!result.calendlyEmbed) {
        result.notes.push("Calendly embed (.cedar-calendly-host) NOT visible — Calendly widget may have failed to mount");
      }
      const formCount = await page.locator("form").count();
      result.noAssessmentForm = formCount === 0;
      if (!result.noAssessmentForm) {
        result.notes.push(`Unexpected <form> on /book-assessment (${formCount} form(s)) — old assessment form may have re-appeared`);
      }
    }

    // 3. Header nav links
    const headerLinks = await page
      .locator("header a[href]")
      .evaluateAll((els) =>
        els.map((el) => ({ href: el.getAttribute("href"), text: (el.textContent ?? "").trim() }))
      );
    for (const link of headerLinks) {
      const href = link.href;
      if (!href || /^(tel:|mailto:|#)/.test(href)) continue;
      const hrefOk =
        href.startsWith("http") ? href.includes(BASE_PATH) : href.startsWith(BASE_PATH);
      result.headerNavLinks.push({ href, text: link.text, hrefOk });
      if (!hrefOk) {
        result.notes.push(`Header link missing basePath: "${link.text}" → ${href}`);
      }
    }

    // 4. Footer nav links
    const footerLinks = await page
      .locator("footer a[href]")
      .evaluateAll((els) =>
        els.map((el) => ({ href: el.getAttribute("href"), text: (el.textContent ?? "").trim() }))
      );
    for (const link of footerLinks) {
      const href = link.href;
      if (!href || /^(tel:|mailto:|#)/.test(href)) continue;
      const hrefOk =
        href.startsWith("http") ? href.includes(BASE_PATH) : href.startsWith(BASE_PATH);
      result.footerNavLinks.push({ href, text: link.text, hrefOk });
      if (!hrefOk) {
        result.notes.push(`Footer link missing basePath: "${link.text}" → ${href}`);
      }
    }

    // 5. CTAs — collect all <a> and <button> matching CTA text
    const ctaEls = await page.evaluate((ctaPattern) => {
      const re = new RegExp(ctaPattern, "i");
      const results = [];
      for (const el of document.querySelectorAll("a, button")) {
        const text = (el.textContent ?? "").trim();
        if (!re.test(text)) continue;
        const href = el.tagName === "A" ? el.getAttribute("href") : null;
        results.push({ tag: el.tagName, text: text.slice(0, 80), href });
      }
      return results;
    }, "book|assess|trial|contact|enroll|start|begin|schedule");

    for (const cta of ctaEls) {
      const href = cta.href;
      let kind = "button-nolink";

      if (href) {
        if (/^tel:/.test(href)) kind = "tel";
        else if (/^mailto:/.test(href)) kind = "mailto";
        else if (/^https?:\/\//.test(href) && !href.startsWith(BASE)) kind = "external";
        else if (isCalendly(href, cta.text)) kind = "calendly";
        else if (href.startsWith("http") && href.startsWith(BASE)) kind = "internal-abs";
        else if (href.startsWith("/")) kind = "internal-path";
        else kind = "other";
      }

      // Check href has basePath for internal links
      const hrefOk =
        kind === "tel" || kind === "mailto" || kind === "external" || kind === "button-nolink" || kind === "other"
          ? null // not applicable
          : href.includes(BASE_PATH);

      if ((kind === "internal-abs" || kind === "internal-path") && !hrefOk) {
        result.notes.push(`CTA missing basePath: "${cta.text}" → ${href}`);
      }

      result.ctaLinks.push({ href, text: cta.text, kind, hrefOk });
    }

    // 7. Images — check naturalWidth > 0
    const images = await page.evaluate(() => {
      return Array.from(document.images).map((img) => ({
        src: img.currentSrc || img.src,
        alt: img.alt,
        naturalWidth: img.naturalWidth,
        complete: img.complete,
      }));
    });
    for (const img of images) {
      if (img.complete && img.naturalWidth === 0) {
        result.brokenImages.push({ src: img.src?.slice(0, 120), alt: img.alt });
        result.notes.push(`Broken image: ${img.src?.slice(0, 80)}`);
      }
    }

    // 8. Below-fold scroll → screenshot
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(800); // brief pause for reveal animations
    await page.screenshot({
      path: join(SCREENSHOTS_DIR, `smoke-${slug}-${vp}-bottom.png`),
      fullPage: false,
    });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.screenshot({
      path: join(SCREENSHOTS_DIR, `smoke-${slug}-${vp}-top.png`),
      fullPage: false,
    });

  } catch (err) {
    result.load = false;
    result.notes.push(`Error: ${err.message.slice(0, 160)}`);
  } finally {
    // Snapshot final error count
    result.consoleErrorCount = errors.length;
    result.consoleErrorSamples = errors.slice(0, 3);
    await page.close();
  }

  return result;
}

// ── Header nav click-through (desktop) ───────────────────────────────────────

async function checkHeaderNavClickThrough(context, routePath) {
  const url = BASE + routePath;
  const page = await context.newPage();
  page.setDefaultTimeout(PAGE_TIMEOUT);
  const clickResults = [];

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: PAGE_TIMEOUT });
    await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => {});

    // Collect nav link hrefs/texts from header (desktop)
    const navLinks = await page
      .locator("header nav a[href], header a[href]")
      .evaluateAll((els) =>
        els
          .map((el) => ({ href: el.getAttribute("href"), text: (el.textContent ?? "").trim() }))
          .filter((l) => l.href && !l.href.startsWith("tel:") && !l.href.startsWith("mailto:") && l.text.length > 0)
      );

    for (const link of navLinks) {
      const href = link.href;
      const fullUrl = href.startsWith("http") ? href : `https://shaeelafsar.github.io${href}`;

      // Navigate directly (equivalent to click, avoids losing page context)
      const navPage = await context.newPage();
      navPage.setDefaultTimeout(PAGE_TIMEOUT);
      try {
        const resp = await navPage.goto(fullUrl, {
          waitUntil: "domcontentloaded",
          timeout: PAGE_TIMEOUT,
        });
        const status = resp?.status() ?? 0;
        const finalUrl = navPage.url();
        const h1Count = await navPage.locator("h1").count();
        const h1Text = h1Count > 0 ? (await navPage.locator("h1").first().innerText()).trim().slice(0, 60) : null;

        clickResults.push({
          text: link.text,
          href,
          status,
          ok: status < 400 && h1Count > 0,
          finalUrl,
          h1Text,
        });

        if (status >= 400 || h1Count === 0) {
          // Flag missing basePath as likely cause
          const missingBasePath = !href.includes(BASE_PATH);
          clickResults[clickResults.length - 1].likelyCause = missingBasePath
            ? "href missing basePath"
            : status >= 400 ? `HTTP ${status}` : "h1 missing on destination";
        }
      } catch (e) {
        clickResults.push({ text: link.text, href, status: 0, ok: false, error: e.message.slice(0, 80) });
      } finally {
        await navPage.close();
      }
    }
  } catch (e) {
    clickResults.push({ text: "LOAD_ERROR", href: url, status: 0, ok: false, error: e.message.slice(0, 80) });
  } finally {
    await page.close();
  }

  return clickResults;
}

// ── CTA click-through verification ───────────────────────────────────────────

async function verifyCTANavigation(context, ctaHref) {
  const fullUrl = ctaHref.startsWith("http") ? ctaHref : `https://shaeelafsar.github.io${ctaHref}`;
  const page = await context.newPage();
  page.setDefaultTimeout(PAGE_TIMEOUT);
  try {
    const resp = await page.goto(fullUrl, { waitUntil: "domcontentloaded", timeout: PAGE_TIMEOUT });
    const status = resp?.status() ?? 0;
    const h1Count = await page.locator("h1").count();
    const h1Text = h1Count > 0 ? (await page.locator("h1").first().innerText()).trim().slice(0, 60) : null;
    return { ok: status < 400 && h1Count > 0, status, h1Text, finalUrl: page.url() };
  } catch (e) {
    return { ok: false, status: 0, error: e.message.slice(0, 80) };
  } finally {
    await page.close();
  }
}

// ── Dead-link HEAD sweep ──────────────────────────────────────────────────────

async function deadLinkSweep(hrefs) {
  const results = [];
  const unique = [...new Set(hrefs)];

  // Process in batches of 8 to avoid overwhelming the server
  const BATCH = 8;
  for (let i = 0; i < unique.length; i += BATCH) {
    const batch = unique.slice(i, i + BATCH);
    const batchResults = await Promise.all(
      batch.map(async (href) => {
        const url = href.startsWith("http") ? href : `https://shaeelafsar.github.io${href}`;
        try {
          const resp = await fetch(url, {
            method: "HEAD",
            signal: AbortSignal.timeout(12_000),
            redirect: "follow",
          });
          return { href, url, status: resp.status, ok: resp.status < 400 };
        } catch (e) {
          return { href, url, status: 0, ok: false, error: e.message.slice(0, 60) };
        }
      })
    );
    results.push(...batchResults);
  }
  return results;
}

// ── Mobile pass ──────────────────────────────────────────────────────────────

async function mobilePass(context, routePath) {
  const url = BASE + routePath;
  const slug = slugify(routePath);
  const page = await context.newPage();
  page.setDefaultTimeout(PAGE_TIMEOUT);

  const result = {
    path: routePath,
    load: false,
    h1: false,
    noHScroll: true,
    hamburgerExists: null,
    hamburgerOpens: null,
    mobileNavLinksOk: null,
    ctaBroken: [],
    notes: [],
  };

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: PAGE_TIMEOUT });
    await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => {});

    result.load = true;
    result.h1 = (await page.locator("h1").count()) > 0;

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    result.noHScroll = scrollWidth <= 376; // small tolerance
    if (!result.noHScroll) result.notes.push(`H-scroll: scrollWidth=${scrollWidth}px`);

    // Hamburger check
    const hamburger = page.getByRole("button", { name: /open navigation menu/i });
    const hamburgerCount = await hamburger.count();
    result.hamburgerExists = hamburgerCount > 0;

    if (hamburgerCount > 0) {
      await hamburger.click();
      // Wait for sheet/drawer to animate in
      await page.waitForTimeout(600);

      // Verify at least some nav links are now visible inside the sheet
      const sheetLinks = page.locator("[data-slot='sheet-content'] a[href], [role='dialog'] a[href]");
      const sheetLinkCount = await sheetLinks.count();
      result.hamburgerOpens = sheetLinkCount > 0;

      if (!result.hamburgerOpens) {
        result.notes.push("Hamburger clicked but no links visible in sheet/drawer");
      } else {
        // Check each link has basePath
        const linkData = await sheetLinks.evaluateAll((els) =>
          els.map((el) => ({ href: el.getAttribute("href"), text: (el.textContent ?? "").trim() }))
        );
        let badLinks = 0;
        for (const link of linkData) {
          if (!link.href) continue;
          if (/^(tel:|mailto:|#)/.test(link.href)) continue;
          const ok = link.href.includes(BASE_PATH);
          if (!ok) {
            badLinks++;
            result.notes.push(`Mobile nav link missing basePath: "${link.text}" → ${link.href}`);
          }
        }
        result.mobileNavLinksOk = badLinks === 0;

        // Click the first real nav link to verify navigation works
        const firstNavLink = linkData.find(
          (l) => l.href && l.href.includes(BASE_PATH) && !/^(tel:|mailto:)/.test(l.href)
        );
        if (firstNavLink) {
          const navTarget = await context.newPage();
          navTarget.setDefaultTimeout(PAGE_TIMEOUT);
          try {
            const resp = await navTarget.goto(
              firstNavLink.href.startsWith("http")
                ? firstNavLink.href
                : `https://shaeelafsar.github.io${firstNavLink.href}`,
              { waitUntil: "domcontentloaded", timeout: PAGE_TIMEOUT }
            );
            const navOk = resp && resp.status() < 400 && (await navTarget.locator("h1").count()) > 0;
            if (!navOk) {
              result.notes.push(`Mobile nav click failed for: "${firstNavLink.text}" → ${firstNavLink.href}`);
            }
          } finally {
            await navTarget.close();
          }
        }
      }
    } else {
      result.notes.push("No hamburger button found at this viewport");
    }

    // Screenshot
    await page.screenshot({
      path: join(SCREENSHOTS_DIR, `smoke-${slug}-mobile.png`),
      fullPage: false,
    });

    // CTAs on mobile — find matching CTAs and verify hrefs
    const ctaEls = await page.evaluate((ctaPattern) => {
      const re = new RegExp(ctaPattern, "i");
      const out = [];
      for (const el of document.querySelectorAll("a[href], button")) {
        const text = (el.textContent ?? "").trim();
        if (!re.test(text)) continue;
        const href = el.tagName === "A" ? el.getAttribute("href") : null;
        if (href && /^\//.test(href) && !href.includes("/cedar-tutoring-website")) {
          out.push({ text: text.slice(0, 60), href });
        }
      }
      return out;
    }, "book|assess|trial|contact|enroll|start|begin|schedule");

    result.ctaBroken = ctaEls;
    if (ctaEls.length > 0) {
      result.notes.push(
        `${ctaEls.length} CTA(s) with raw href (missing basePath): ` +
          ctaEls.map((c) => `"${c.text}"→${c.href}`).join(", ")
      );
    }
  } catch (e) {
    result.load = false;
    result.notes.push(`Error: ${e.message.slice(0, 120)}`);
  } finally {
    await page.close();
  }

  return result;
}

// ── Main ─────────────────────────────────────────────────────────────────────

console.log("🌲 Cedar Tutoring Academy — Click-Through Smoke Test");
console.log(`   Target: ${BASE}`);
console.log(`   Run at: 2026-05-07T19:02:14-05:00\n`);

// Discover routes
const routePaths = await discoverRoutes();

// ── Desktop pass ─────────────────────────────────────────────────────────────
const desktopBrowser = await chromium.launch({ headless: true });
const desktopContext = await desktopBrowser.newContext({
  viewport: { width: 1280, height: 800 },
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
});

console.log("── Desktop Pass ─────────────────────────────────────\n");
const desktopResults = [];
const allInternalHrefs = new Set();
const allCTAHrefs = new Set();

for (const path of routePaths) {
  process.stdout.write(`  [Desktop] ${path} … `);
  const r = await checkPage(desktopContext, path, "desktop");
  desktopResults.push(r);

  // Collect internal hrefs for dead-link sweep
  for (const l of [...r.headerNavLinks, ...r.footerNavLinks]) {
    if (l.href && !l.href.startsWith("tel:") && !l.href.startsWith("mailto:")) {
      allInternalHrefs.add(l.href.startsWith("http") ? l.href : `https://shaeelafsar.github.io${l.href}`);
    }
  }
  // Collect internal CTA hrefs for navigation verification
  for (const cta of r.ctaLinks) {
    if (
      (cta.kind === "internal-abs" || cta.kind === "internal-path") &&
      cta.href
    ) {
      allCTAHrefs.add(cta.href);
      allInternalHrefs.add(
        cta.href.startsWith("http") ? cta.href : `https://shaeelafsar.github.io${cta.href}`
      );
    }
  }

  const pass =
    r.load && r.h1 && r.consoleErrorCount === 0 && r.brokenImages.length === 0;
  console.log(pass ? "✅" : "❌" + (r.notes.length ? ` ${r.notes[0]}` : ""));
}

// ── Header nav click-through (from homepage) ─────────────────────────────────
console.log("\n  [Desktop] Header nav click-through from / …");
const headerNavClickResults = await checkHeaderNavClickThrough(desktopContext, "/");
for (const r of headerNavClickResults) {
  const icon = r.ok ? "✅" : "❌";
  console.log(`    ${icon} "${r.text}" → ${r.href} (HTTP ${r.status}) h1="${r.h1Text ?? "MISSING"}"`);
}

// ── CTA navigation verification ───────────────────────────────────────────────
console.log("\n  [Desktop] CTA navigation verification …");
const ctaNavResults = [];
for (const href of allCTAHrefs) {
  const r = await verifyCTANavigation(desktopContext, href);
  ctaNavResults.push({ href, ...r });
  const icon = r.ok ? "✅" : "❌";
  console.log(`    ${icon} CTA → ${href} (HTTP ${r.status}) h1="${r.h1Text ?? "MISSING"}"`);
}

await desktopContext.close();
await desktopBrowser.close();

// ── Dead-link HEAD sweep ──────────────────────────────────────────────────────
console.log("\n── Dead-Link Sweep ──────────────────────────────────\n");
const deadLinkResults = await deadLinkSweep([...allInternalHrefs]);
for (const r of deadLinkResults) {
  if (!r.ok) {
    console.log(`  ❌ ${r.status} ${r.url}`);
  }
}
const brokenLinks = deadLinkResults.filter((r) => !r.ok);
console.log(
  `  Swept ${deadLinkResults.length} unique internal hrefs — ${brokenLinks.length} broken`
);

// ── Mobile pass ───────────────────────────────────────────────────────────────
console.log("\n── Mobile Pass (375×812) ────────────────────────────\n");
const mobileBrowser = await chromium.launch({ headless: true });
const mobileContext = await mobileBrowser.newContext({
  viewport: { width: 375, height: 812 },
  isMobile: true,
  hasTouch: true,
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
});

const mobileResults = [];
for (const path of routePaths) {
  process.stdout.write(`  [Mobile] ${path} … `);
  const r = await mobilePass(mobileContext, path);
  mobileResults.push(r);
  const pass = r.load && r.h1 && r.noHScroll;
  console.log(pass ? "✅" : "❌" + (r.notes.length ? ` ${r.notes[0]}` : ""));
}

await mobileContext.close();
await mobileBrowser.close();

// ── Build final report ────────────────────────────────────────────────────────

// Summarise desktop results
const desktopMap = Object.fromEntries(desktopResults.map((r) => [r.path, r]));
const mobileMap = Object.fromEntries(mobileResults.map((r) => [r.path, r]));

let totalPages = routePaths.length;
let totalCTAsClicked = ctaNavResults.length + headerNavClickResults.length;
let totalConsoleErrors = desktopResults.reduce((s, r) => s + (r.consoleErrorCount ?? 0), 0);
let totalBrokenImages = desktopResults.reduce((s, r) => s + r.brokenImages.length, 0);
let totalBrokenLinks = brokenLinks.length;

// ── Print structured report ───────────────────────────────────────────────────

console.log("\n\n");
console.log("════════════════════════════════════════════════════════════════");
console.log("  🌲 CEDAR TUTORING — CLICK-THROUGH SMOKE REPORT");
console.log(`  Live URL: ${BASE}`);
console.log("════════════════════════════════════════════════════════════════\n");

// A. PASS/FAIL TABLE
console.log("## A. PASS/FAIL TABLE\n");
const TABLE_HEADER =
  "| Route | Load | h1 | Header CTAs | Footer | Body CTAs | Images | Dead Links | D | M |";
const TABLE_SEP =
  "|-------|------|----|-------------|--------|-----------|--------|------------|---|---|";
console.log(TABLE_HEADER);
console.log(TABLE_SEP);

const defects = [];

for (const path of routePaths) {
  const d = desktopMap[path];
  const m = mobileMap[path];
  if (!d) continue;

  const loadOk = d.load ? "✅" : "❌";
  const h1Ok = d.h1 ? "✅" : "❌";

  const badHeaderLinks = d.headerNavLinks.filter((l) => !l.hrefOk);
  const headerCTAsOk = badHeaderLinks.length === 0 ? "✅" : `❌ ${badHeaderLinks.length}`;

  const badFooterLinks = d.footerNavLinks.filter((l) => !l.hrefOk);
  const footerOk = badFooterLinks.length === 0 ? "✅" : `❌ ${badFooterLinks.length}`;

  const badCTAs = d.ctaLinks.filter(
    (c) => (c.kind === "internal-abs" || c.kind === "internal-path") && c.hrefOk === false
  );
  const bodyCTAsOk = badCTAs.length === 0 ? "✅" : `❌ ${badCTAs.length}`;

  const imagesOk = d.brokenImages.length === 0 ? "✅" : `❌ ${d.brokenImages.length}`;

  // Dead links for this page's nav links
  const thisPageHrefs = [
    ...d.headerNavLinks.map((l) =>
      l.href.startsWith("http") ? l.href : `https://shaeelafsar.github.io${l.href}`
    ),
    ...d.footerNavLinks.map((l) =>
      l.href.startsWith("http") ? l.href : `https://shaeelafsar.github.io${l.href}`
    ),
  ];
  const deadHere = brokenLinks.filter((bl) => thisPageHrefs.includes(bl.url));
  const deadLinksOk = deadHere.length === 0 ? "✅" : `❌ ${deadHere.length}`;

  const desktopPass =
    d.load && d.h1 && badHeaderLinks.length === 0 && badFooterLinks.length === 0 &&
    badCTAs.length === 0 && d.brokenImages.length === 0 && (d.consoleErrorCount ?? 0) === 0;
  const mobilePass2 = m && m.load && m.h1 && m.noHScroll;

  console.log(
    `| \`${path}\` | ${loadOk} | ${h1Ok} | ${headerCTAsOk} | ${footerOk} | ${bodyCTAsOk} | ${imagesOk} | ${deadLinksOk} | ${desktopPass ? "✅" : "❌"} | ${mobilePass2 ? "✅" : "❌"} |`
  );

  // Collect defects
  if (!d.load) defects.push({ path, severity: "P0", element: "page", expected: "HTTP 200", actual: `HTTP ${d.status}`, notes: d.notes.join("; ") });
  if (!d.h1) defects.push({ path, severity: "P1", element: "<h1>", expected: "Present and non-empty", actual: "Missing", notes: "" });
  for (const bl of badHeaderLinks) defects.push({ path, severity: "P1", element: `header a "${bl.text}"`, expected: `href contains ${BASE_PATH}`, actual: bl.href, notes: "basePath missing — raw href" });
  for (const bl of badFooterLinks) defects.push({ path, severity: "P1", element: `footer a "${bl.text}"`, expected: `href contains ${BASE_PATH}`, actual: bl.href, notes: "basePath missing" });
  for (const bc of badCTAs) defects.push({ path, severity: "P0", element: `CTA "${bc.text}"`, expected: `href contains ${BASE_PATH}`, actual: bc.href, notes: "Dead CTA — same class of bug as pricing-page basePath bug" });
  for (const img of d.brokenImages) defects.push({ path, severity: "P1", element: `<img alt="${img.alt}">`, expected: "naturalWidth > 0", actual: "0 (broken)", notes: img.src });
  if ((d.consoleErrorCount ?? 0) > 0) defects.push({ path, severity: "P1", element: "Console", expected: "0 errors", actual: `${d.consoleErrorCount} error(s)`, notes: d.consoleErrorSamples?.join(" | ") });
  if (m && !m.noHScroll) defects.push({ path, severity: "P2", element: "viewport", expected: "No horizontal scroll", actual: `scrollWidth > 375`, notes: m.notes.join("; ") });
  if (m && m.hamburgerExists === false) defects.push({ path, severity: "P1", element: "hamburger", expected: "Button[Open navigation menu] visible on mobile", actual: "Not found", notes: "" });
  if (m && m.hamburgerExists && m.hamburgerOpens === false) defects.push({ path, severity: "P1", element: "hamburger", expected: "Opens sheet with nav links", actual: "Sheet opened but no links visible", notes: "" });
  if (m && m.ctaBroken && m.ctaBroken.length > 0) {
    for (const bc of m.ctaBroken) defects.push({ path, severity: "P0", element: `Mobile CTA "${bc.text}"`, expected: `href contains ${BASE_PATH}`, actual: bc.href, notes: "Raw href — basePath injection skipped" });
  }
}

// ── Header nav click-through result in table ─────────────────────────────────
console.log("\n### Header Nav Click-Through (desktop, from /)\n");
console.log("| Link Text | href | HTTP | h1 | Pass |");
console.log("|-----------|------|------|----|------|");
for (const r of headerNavClickResults) {
  const pass = r.ok ? "✅" : "❌";
  console.log(`| ${r.text} | \`${r.href}\` | ${r.status} | ${r.h1Text ?? "—"} | ${pass} |`);
  if (!r.ok) {
    defects.push({
      path: r.href,
      severity: "P0",
      element: `Header nav link "${r.text}"`,
      expected: "HTTP 200 + h1 on destination",
      actual: r.likelyCause ?? `HTTP ${r.status} / h1 missing`,
      notes: `Likely cause: ${r.likelyCause ?? "unknown"}`,
    });
  }
}

// ── CTA nav results ───────────────────────────────────────────────────────────
console.log("\n### CTA Navigation Verification\n");
console.log("| CTA href | HTTP | h1 | Pass |");
console.log("|----------|------|----|------|");
for (const r of ctaNavResults) {
  const pass = r.ok ? "✅" : "❌";
  console.log(`| \`${r.href}\` | ${r.status} | ${r.h1Text ?? "—"} | ${pass} |`);
  if (!r.ok) {
    defects.push({
      path: r.href,
      severity: "P0",
      element: `CTA destination`,
      expected: "HTTP 200 + h1",
      actual: `HTTP ${r.status}${r.h1Text ? "" : " / h1 missing"}`,
      notes: r.finalUrl ?? "",
    });
  }
}

// B. DEFECTS
console.log("\n\n## B. DEFECTS FOUND\n");
if (defects.length === 0) {
  console.log("No defects found. All checks passed. 🎉\n");
} else {
  let idx = 1;
  for (const d of defects) {
    console.log(`### DEF-${String(idx).padStart(3, "0")} [${d.severity}] — ${d.path}`);
    console.log(`- **Element:** ${d.element}`);
    console.log(`- **Expected:** ${d.expected}`);
    console.log(`- **Actual:** ${d.actual}`);
    if (d.notes) console.log(`- **Notes:** ${d.notes}`);
    console.log();
    idx++;
  }
}

// C. SUMMARY METRICS
console.log("## C. SUMMARY METRICS\n");
console.log(`| Metric | Value |`);
console.log(`|--------|-------|`);
console.log(`| Pages tested | ${totalPages} |`);
console.log(`| CTAs/nav links clicked/verified | ${totalCTAsClicked} |`);
console.log(`| Broken internal links (HEAD sweep) | ${totalBrokenLinks} |`);
console.log(`| Broken images | ${totalBrokenImages} |`);
console.log(`| Console errors (desktop) | ${totalConsoleErrors} |`);
console.log(`| Defects found | ${defects.length} |`);
console.log(`| P0 (broken) | ${defects.filter((d) => d.severity === "P0").length} |`);
console.log(`| P1 (degraded) | ${defects.filter((d) => d.severity === "P1").length} |`);
console.log(`| P2 (polish) | ${defects.filter((d) => d.severity === "P2").length} |`);
console.log(`| Screenshots saved | ${SCREENSHOTS_DIR} |`);
console.log();

// Save JSON results for offline inspection
const jsonOut = join(ROOT, ".squad/agents/mouse/last-smoke-clickthrough.json");
writeFileSync(
  jsonOut,
  JSON.stringify(
    { desktopResults, mobileResults, headerNavClickResults, ctaNavResults, deadLinkResults, defects },
    null,
    2
  )
);
console.log(`Results JSON saved: ${jsonOut}\n`);
