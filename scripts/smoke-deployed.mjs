/**
 * Firefox smoke test against the live GitHub Pages deployment.
 * Run with: node scripts/smoke-deployed.mjs
 *
 * Tests every key route for:
 *  - Successful page load (no hard error)
 *  - Non-empty page title
 *  - Visible H1
 *  - Footer presence
 *  - No "404 / not found" text in body
 *  - Zero console errors
 *  - Route-specific checks (Calendly embed, redirect, nav, hero CTA, mobile viewport)
 */

import { firefox } from "playwright";

const BASE = "https://shaeelafsar.github.io/cedar-tutoring-website";
const PAGE_TIMEOUT = 30_000;

const ROUTES = [
  { path: "/", name: "Homepage" },
  { path: "/about", name: "About Us" },
  { path: "/why-us", name: "Why Us" },
  { path: "/programs", name: "Programs Hub" },
  { path: "/programs/math", name: "Math Program" },
  { path: "/programs/reading", name: "Reading Program" },
  { path: "/programs/writing", name: "Writing Program" },
  { path: "/programs/science", name: "Science Program" },
  { path: "/programs/arabic", name: "Arabic Program" },
  { path: "/test-prep", name: "Test Prep Hub" },
  { path: "/test-prep/sat", name: "SAT Prep" },
  { path: "/test-prep/act", name: "ACT Prep" },
  { path: "/test-prep/psat", name: "PSAT Prep" },
  { path: "/pricing", name: "Pricing" },
  { path: "/summer-programs", name: "Summer Programs" },
  { path: "/contact-us", name: "Contact Us" },
  { path: "/faq", name: "FAQ" },
  { path: "/reviews", name: "Reviews" },
  { path: "/locations", name: "Locations" },
  { path: "/privacy-policy", name: "Privacy Policy" },
  { path: "/book-assessment", name: "Book Assessment (Calendly-only)" },
  { path: "/free-trial", name: "Free Trial (→ redirect)" },
];

function fmt(v) {
  if (v === true) return "✅";
  if (v === false) return "❌";
  if (v === null || v === undefined) return "—";
  return String(v);
}

async function checkPage(browser, route) {
  const url = BASE + route.path;
  const result = {
    route: route.name,
    path: route.path,
    finalUrl: null,
    loaded: false,
    title: null,
    h1Visible: null,
    footerVisible: null,
    no404: null,
    consoleErrors: [],
    calendlyEmbed: null,   // only for /book-assessment
    noAssessmentForm: null, // only for /book-assessment
    redirectOk: null,       // only for /free-trial
    notes: [],
  };

  const page = await browser.newPage();
  page.setDefaultTimeout(PAGE_TIMEOUT);

  // Capture console errors — filter known third-party cross-site cookie noise
  // (Calendly, Stripe, Datadog, Segment all set SameSite cookies inside their
  // iframes; Firefox rejects them. These are NOT app errors.)
  const THIRD_PARTY_COOKIE_NOISE =
    /cookie.*has been rejected.*cross-site|samesite/i;

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      const text = msg.text();
      if (THIRD_PARTY_COOKIE_NOISE.test(text)) {
        result.thirdPartyCookieWarnings = (result.thirdPartyCookieWarnings ?? 0) + 1;
      } else {
        result.consoleErrors.push(text.slice(0, 120));
      }
    }
  });
  page.on("pageerror", (err) => {
    const text = err.message;
    if (THIRD_PARTY_COOKIE_NOISE.test(text)) {
      result.thirdPartyCookieWarnings = (result.thirdPartyCookieWarnings ?? 0) + 1;
    } else {
      result.consoleErrors.push(text.slice(0, 120));
    }
  });

  try {
    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: PAGE_TIMEOUT,
    });

    result.finalUrl = page.url();
    result.loaded = true;

    // --- /free-trial redirect check ---
    if (route.path === "/free-trial") {
      // Client-side redirect via useRouter — wait for navigation
      try {
        await page.waitForURL(/\/book-assessment/, { timeout: 10_000 });
        result.finalUrl = page.url();
      } catch {
        // redirect didn't happen within timeout
      }
      result.redirectOk = result.finalUrl.includes("/book-assessment");
      if (!result.redirectOk) {
        result.notes.push(`Final URL: ${result.finalUrl}`);
      }
    }

    // Title
    const title = await page.title();
    result.title = title || "(empty)";

    // H1 visibility
    const h1 = page.locator("h1").first();
    const h1Count = await page.locator("h1").count();
    if (h1Count === 0) {
      result.h1Visible = false;
      result.notes.push("No <h1> found");
    } else {
      result.h1Visible = await h1.isVisible();
    }

    // Footer visibility — look for footer element or copyright text
    const footerEl = page.locator("footer").first();
    const footerCount = await page.locator("footer").count();
    if (footerCount > 0) {
      result.footerVisible = await footerEl.isVisible();
    } else {
      // Fallback: look for copyright text
      const copyrightCount = await page
        .locator("text=/©|copyright/i")
        .count();
      result.footerVisible = copyrightCount > 0;
      if (!result.footerVisible) result.notes.push("No <footer> element found");
    }

    // 404 check — check body text
    const bodyText = await page.locator("body").innerText();
    const lower = bodyText.toLowerCase();
    const has404 =
      lower.includes("404") ||
      lower.includes("not found") ||
      lower.includes("page not found");
    result.no404 = !has404;
    if (has404) result.notes.push("404/not-found text detected in body");

    // --- /book-assessment specific checks ---
    if (route.path === "/book-assessment") {
      // Wait a bit for the Calendly client component to mount
      await page.waitForTimeout(3000);

      // CalendlyInline renders a div.cedar-calendly-host
      const calendlyHost = page.locator(".cedar-calendly-host").first();
      const calendlyCount = await page.locator(".cedar-calendly-host").count();
      result.calendlyEmbed = calendlyCount > 0 && (await calendlyHost.isVisible());

      // Ensure NO <form> element that would be the old assessment form
      const formCount = await page.locator("form").count();
      result.noAssessmentForm = formCount === 0;
      if (formCount > 0) {
        result.notes.push(
          `Unexpected <form> elements on /book-assessment: ${formCount}`,
        );
      }
    }
  } catch (err) {
    result.loaded = false;
    result.notes.push(`Load error: ${err.message.slice(0, 150)}`);
  } finally {
    await page.close();
  }

  return result;
}

async function checkHomepageExtras(browser) {
  const extras = { heroCta: null, noFreeTrial: null, notes: [] };
  const page = await browser.newPage();
  page.setDefaultTimeout(PAGE_TIMEOUT);
  try {
    await page.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: PAGE_TIMEOUT });

    // Nav should NOT contain "Free Trial" link
    const navFreeTrialCount = await page
      .locator("nav")
      .getByRole("link", { name: /free trial/i })
      .count();
    extras.noFreeTrial = navFreeTrialCount === 0;
    if (navFreeTrialCount > 0) {
      extras.notes.push(`Nav still has ${navFreeTrialCount} "Free Trial" link(s)`);
    }

    // Hero CTA should point to /book-assessment with "Book Free Assessment" (or similar)
    const heroCtaLinks = page.locator(
      "main a[href*='book-assessment'], main a[href*='/book-assessment']",
    );
    const heroCtaCount = await heroCtaLinks.count();
    if (heroCtaCount > 0) {
      const firstText = await heroCtaLinks.first().innerText();
      const href = await heroCtaLinks.first().getAttribute("href");
      extras.heroCta = { text: firstText.trim(), href };
      const ctaOk =
        href?.includes("book-assessment") &&
        /book.*assessment|assessment/i.test(firstText);
      if (!ctaOk) {
        extras.notes.push(
          `Hero CTA text "${firstText}" / href "${href}" doesn't match expected`,
        );
      }
    } else {
      extras.heroCta = null;
      extras.notes.push(
        "No CTA link pointing to /book-assessment found in <main>",
      );
    }
  } catch (err) {
    extras.notes.push(`Error during homepage extras: ${err.message.slice(0, 120)}`);
  } finally {
    await page.close();
  }
  return extras;
}

async function checkMobile(browser, path, label) {
  const result = { label, path, rendered: null, noHScroll: null, notes: [] };
  const page = await browser.newPage();
  page.setDefaultTimeout(PAGE_TIMEOUT);
  try {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE + path, {
      waitUntil: "domcontentloaded",
      timeout: PAGE_TIMEOUT,
    });

    // Basic render check
    const h1Count = await page.locator("h1").count();
    result.rendered = h1Count > 0;

    // Horizontal scroll: scrollWidth > viewport width means overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    result.noHScroll = scrollWidth <= 390;
    if (scrollWidth > 390) {
      result.notes.push(`Horizontal overflow: scrollWidth=${scrollWidth}px (viewport=390px)`);
    }

    // On book-assessment, also wait for Calendly container
    if (path === "/book-assessment") {
      await page.waitForTimeout(3000);
      const calendlyCount = await page.locator(".cedar-calendly-host").count();
      const calendlyVisible =
        calendlyCount > 0 &&
        (await page.locator(".cedar-calendly-host").first().isVisible());
      result.calendlyVisibleMobile = calendlyVisible;
      if (!calendlyVisible) {
        result.notes.push("Calendly embed NOT visible on mobile viewport");
      }
    }
  } catch (err) {
    result.rendered = false;
    result.notes.push(`Error: ${err.message.slice(0, 120)}`);
  } finally {
    await page.close();
  }
  return result;
}

// ─── Main ───────────────────────────────────────────────────────────────────

const browser = await firefox.launch({ headless: true });
console.log("🦊 Firefox smoke test — Cedar Tutoring Academy live deployment");
console.log(`   Target: ${BASE}\n`);

const results = [];
for (const route of ROUTES) {
  process.stdout.write(`  Checking ${route.name} (${route.path}) … `);
  const r = await checkPage(browser, route);
  results.push(r);
  const errors = r.consoleErrors.length;
  const pass =
    r.loaded &&
    r.h1Visible !== false &&
    r.footerVisible !== false &&
    r.no404 !== false &&
    errors === 0 &&
    (route.path !== "/book-assessment" || (r.calendlyEmbed && r.noAssessmentForm)) &&
    (route.path !== "/free-trial" || r.redirectOk);
  console.log(pass ? "✅" : "❌");
}

// Homepage extras
process.stdout.write("  Checking Homepage extras (nav + hero CTA) … ");
const homepageExtras = await checkHomepageExtras(browser);
console.log(
  homepageExtras.noFreeTrial && homepageExtras.heroCta ? "✅" : "❌",
);

// Mobile checks
const mobileRoutes = [
  { path: "/", label: "Homepage (mobile)" },
  { path: "/book-assessment", label: "Book Assessment (mobile)" },
];
const mobileResults = [];
for (const mr of mobileRoutes) {
  process.stdout.write(`  Checking ${mr.label} … `);
  const r = await checkMobile(browser, mr.path, mr.label);
  mobileResults.push(r);
  console.log(r.rendered && r.noHScroll ? "✅" : "❌");
}

await browser.close();

// ─── Report ─────────────────────────────────────────────────────────────────

console.log("\n");
console.log("## 🌲 Cedar Tutoring Academy — Firefox Smoke Test Report");
console.log(`**Deployment:** ${BASE}`);
console.log(`**Run at:** ${new Date().toISOString()}\n`);

// Main route table
console.log("### Route Results\n");
console.log(
  "| Route | Loaded | Title | H1 | Footer | No 404 | Console Errors | Special Check | Notes |",
);
console.log(
  "|-------|--------|-------|----|--------|--------|----------------|---------------|-------|",
);

let pass = 0;
let fail = 0;
const issues = [];

for (const r of results) {
  let special = "—";
  let specialOk = true;

  if (r.path === "/book-assessment") {
    const embedOk = r.calendlyEmbed === true;
    const noFormOk = r.noAssessmentForm === true;
    special = `Calendly: ${fmt(embedOk)} NoForm: ${fmt(noFormOk)}`;
    specialOk = embedOk && noFormOk;
  } else if (r.path === "/free-trial") {
    special = `Redirect→/book-assessment: ${fmt(r.redirectOk)}`;
    specialOk = r.redirectOk === true;
  }

  const errorCell =
    r.consoleErrors.length === 0
      ? "✅ none"
      : `❌ ${r.consoleErrors.length}`;

  const rowOk =
    r.loaded &&
    r.h1Visible !== false &&
    r.footerVisible !== false &&
    r.no404 !== false &&
    r.consoleErrors.length === 0 &&
    specialOk;

  if (rowOk) {
    pass++;
  } else {
    fail++;
    const rowIssues = [];
    if (!r.loaded) rowIssues.push("failed to load");
    if (r.h1Visible === false) rowIssues.push("no H1");
    if (r.footerVisible === false) rowIssues.push("footer missing");
    if (r.no404 === false) rowIssues.push("404 text detected");
    if (r.consoleErrors.length > 0) rowIssues.push(`${r.consoleErrors.length} console error(s)`);
    if (!specialOk) rowIssues.push("special check failed");
    issues.push({ route: r.name, path: r.path, problems: rowIssues, errors: r.consoleErrors, notes: r.notes });
  }

  const notesCell = r.notes.length > 0 ? r.notes.join("; ").slice(0, 80) : "—";
  const cookieNote = r.thirdPartyCookieWarnings
    ? ` (${r.thirdPartyCookieWarnings} 3rd-party cookie warnings suppressed)`
    : "";
  const finalNotes = notesCell === "—" ? cookieNote || "—" : notesCell + cookieNote;

  console.log(
    `| **${r.route}** \`${r.path}\` | ${fmt(r.loaded)} | ${r.title ? "✅" : "❌"} | ${fmt(r.h1Visible)} | ${fmt(r.footerVisible)} | ${fmt(r.no404)} | ${errorCell} | ${special} | ${finalNotes} |`,
  );
}

// Homepage extras
console.log("\n### Homepage Extras\n");
console.log(`- **Nav "Free Trial" removed:** ${fmt(homepageExtras.noFreeTrial)}`);
if (homepageExtras.heroCta) {
  console.log(
    `- **Hero CTA:** text="${homepageExtras.heroCta.text}" → href="${homepageExtras.heroCta.href}"`,
  );
  const ctaOk =
    homepageExtras.heroCta.href?.includes("book-assessment") &&
    /book.*assessment|assessment/i.test(homepageExtras.heroCta.text);
  console.log(`- **Hero CTA points to /book-assessment:** ${fmt(ctaOk)}`);
} else {
  console.log("- **Hero CTA:** ❌ not found");
}
if (homepageExtras.notes.length > 0) {
  homepageExtras.notes.forEach((n) => console.log(`  ⚠️  ${n}`));
}

// Mobile results
console.log("\n### Mobile Sanity (390×844 — iPhone)\n");
console.log("| Page | H1 Renders | No H-Scroll | Notes |");
console.log("|------|-----------|-------------|-------|");
for (const mr of mobileResults) {
  const note = mr.notes.length > 0 ? mr.notes.join("; ") : "—";
  let extra = "";
  if (mr.path === "/book-assessment" && mr.calendlyVisibleMobile !== undefined) {
    extra = ` Calendly mobile: ${fmt(mr.calendlyVisibleMobile)}`;
  }
  console.log(
    `| **${mr.label}** | ${fmt(mr.rendered)} | ${fmt(mr.noHScroll)} | ${note}${extra} |`,
  );
}

// Summary
console.log("\n---\n");
console.log("### Summary\n");
const routeTotal = results.length;
const extraOk =
  homepageExtras.noFreeTrial &&
  homepageExtras.heroCta?.href?.includes("book-assessment");
const mobileOk = mobileResults.every((m) => m.rendered && m.noHScroll);
const totalPass = pass + (extraOk ? 1 : 0) + (mobileOk ? 1 : 0);
const totalFail = fail + (extraOk ? 0 : 1) + (mobileOk ? 0 : 1);

console.log(`- **Routes checked:** ${routeTotal}`);
console.log(`- **Route pass:** ${pass} / ${routeTotal}`);
console.log(`- **Route fail:** ${fail} / ${routeTotal}`);
console.log(`- **Homepage extras:** ${extraOk ? "✅ PASS" : "❌ FAIL"}`);
console.log(`- **Mobile sanity:** ${mobileOk ? "✅ PASS" : "❌ FAIL"}`);
console.log(`- **Overall: ${totalPass} passed, ${totalFail} failed**\n`);

if (issues.length === 0 && extraOk && mobileOk) {
  console.log("🎉 **All checks passed — deployment looks healthy.**");
} else {
  console.log("### ❌ Issues Found\n");
  for (const issue of issues) {
    console.log(`#### ${issue.route} (\`${issue.path}\`)`);
    issue.problems.forEach((p) => console.log(`  - ${p}`));
    if (issue.errors.length > 0) {
      console.log("  Console errors:");
      issue.errors.forEach((e) => console.log(`    - \`${e}\``));
    }
    if (issue.notes.length > 0) {
      issue.notes.forEach((n) => console.log(`  - Note: ${n}`));
    }
  }
  if (!extraOk) {
    console.log("\n#### Homepage extras");
    homepageExtras.notes.forEach((n) => console.log(`  - ${n}`));
  }
  if (!mobileOk) {
    console.log("\n#### Mobile issues");
    mobileResults
      .filter((m) => !m.rendered || !m.noHScroll)
      .forEach((m) => {
        console.log(`  - **${m.label}**: ${m.notes.join("; ")}`);
      });
  }
}

process.exit(totalFail > 0 ? 1 : 0);
