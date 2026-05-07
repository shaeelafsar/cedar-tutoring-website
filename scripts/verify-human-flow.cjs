/* eslint-disable */
/**
 * Full human-capable booking flow E2E test.
 *
 * Asserts that a real user can:
 *   1. Land on /free-trial and see the calendar (iframe fills the card)
 *   2. Click an event type ("2 Free Learning Sessions")
 *   3. See the date picker calendar
 *   4. Pick an available date
 *   5. See time slots for that date
 *   6. Click a time slot
 *   7. Reach the "Confirm details" form
 *
 * Run with: node scripts/verify-human-flow.cjs [URL]
 * Default URL: production. Pass http://localhost:3000/free-trial for local.
 */

const { chromium, devices } = require("playwright");

const URL =
  process.argv[2] ||
  "https://shaeelafsar.github.io/cedar-tutoring-website/free-trial/";

async function findCalendlyFrame(page, timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const candidates = page.frames().filter((f) => {
      const u = f.url();
      return u.includes("calendly.com") && !u.includes("stripe");
    });
    for (const f of candidates) {
      try {
        const interactive = await f.evaluate(() => {
          const links = document.querySelectorAll(
            "a[href*='cedartutoring/']",
          );
          const buttons = document.querySelectorAll("button");
          return links.length + buttons.length;
        });
        if (interactive > 0) return f;
      } catch {}
    }
    await page.waitForTimeout(500);
  }
  return null;
}

async function runOnViewport(browser, label, contextOpts) {
  console.log(`\n━━━ ${label} ━━━`);
  console.log(`URL: ${URL}`);
  const ctx = await browser.newContext(contextOpts);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(`PAGEERROR: ${e.message}`));

  try {
    await page.goto(URL, { waitUntil: "load", timeout: 30000 });
    await page.locator("section#book").scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);

    // Step 1: iframe attached and fills the card
    const iframeEl = page.locator(
      "section#book iframe[src*='calendly.com']",
    );
    await iframeEl.waitFor({ state: "attached", timeout: 30000 });
    const dims = await page.evaluate(() => {
      const iframe = document.querySelector(
        "section#book iframe[src*='calendly.com']",
      );
      const card = document.querySelector(
        "section#book .relative.w-full",
      );
      const ir = iframe.getBoundingClientRect();
      const cr = card.getBoundingClientRect();
      return {
        iframeH: ir.height,
        iframeW: ir.width,
        cardH: cr.height,
        cardW: cr.width,
        fills: Math.abs(ir.height - cr.height) < 8,
      };
    });
    console.log(
      `  step 1: iframe=${Math.round(dims.iframeW)}x${Math.round(dims.iframeH)} card=${Math.round(dims.cardW)}x${Math.round(dims.cardH)} fills=${dims.fills}`,
    );
    if (!dims.fills) throw new Error("iframe does not fill card container");
    if (dims.iframeH < 600) throw new Error(`iframe is too short (${dims.iframeH}px)`);

    // Step 2: Calendly SPA renders event-type chooser
    console.log("  step 2: waiting for Calendly SPA to render...");
    const cal = await findCalendlyFrame(page);
    if (!cal) throw new Error("Calendly SPA did not render");

    const eventTypeLinks = cal.locator("a[href*='cedartutoring/']");
    const linkCount = await eventTypeLinks.count();
    console.log(`           ${linkCount} event types visible`);
    if (linkCount === 0) throw new Error("No event types found");

    // Step 3: click "2 Free Learning Sessions"
    const targetLink = cal.locator(
      "a[href*='cedartutoring/'][href*='learning' i], a[href*='cedartutoring/']:has-text('2 Free Learning Sessions')",
    );
    const targetCount = await targetLink.count();
    console.log(`  step 3: '2 Free Learning Sessions' link count=${targetCount}`);
    if (targetCount === 0) {
      // fall back to first link
      console.log("           falling back to first event type");
      await eventTypeLinks.first().click();
    } else {
      await targetLink.first().click();
    }

    // Step 4: wait for date picker (table with day buttons)
    console.log("  step 4: waiting for date picker calendar...");
    await page.waitForTimeout(3000);
    // Calendly's URL changes after picking event, so the frame may be different
    const cal2 = await findCalendlyFrame(page, 30000);
    if (!cal2) throw new Error("Date-picker frame not found");

    // Date buttons in Calendly use aria-label like "Tuesday, May 12 - Times available"
    // for pickable dates and "...No times available" for disabled past/blocked dates.
    const enabledDates = cal2.locator(
      "table button[aria-label*='Times available']:not([disabled])",
    );
    await enabledDates.first().waitFor({ timeout: 25000 });
    const enabledCount = await enabledDates.count();
    console.log(`           ${enabledCount} ENABLED dates`);
    if (enabledCount === 0) throw new Error("No enabled dates available");
    const firstLabel = await enabledDates.first().getAttribute("aria-label");
    console.log(`           clicking: ${firstLabel}`);
    await enabledDates.first().click();

    // Step 5: time slots appear
    console.log("  step 5: waiting for time slots...");
    await page.waitForTimeout(2000);
    const cal3 = await findCalendlyFrame(page, 15000) || cal2;
    const timeSlots = cal3.locator(
      "[data-component='spotpicker-times-list'] button, button[data-container='time-button']",
    );
    await timeSlots.first().waitFor({ timeout: 15000 });
    const slotCount = await timeSlots.count();
    console.log(`           ${slotCount} time slots visible`);
    if (slotCount === 0) throw new Error("No time slots after picking date");

    const sampleSlot = (await timeSlots.first().textContent())?.trim();
    console.log(`           first slot: ${sampleSlot}`);

    // Step 6: click first time slot
    console.log("  step 6: clicking first time slot...");
    await timeSlots.first().click();
    await page.waitForTimeout(2000);

    // Step 7: confirm-time button (Calendly's two-step time confirmation)
    const confirmBtn = cal3.locator(
      "button[data-container='confirm-time-button']",
    );
    if ((await confirmBtn.count()) > 0) {
      console.log("           clicking 'Next' to confirm time...");
      await confirmBtn.first().click();
      await page.waitForTimeout(3000);
    }

    // Step 8: confirm-details form (name/email) appears
    console.log("  step 7: waiting for confirm-details form...");
    const cal4 = await findCalendlyFrame(page, 15000) || cal3;
    const nameInput = cal4.locator(
      "input[name='full_name'], input[id='full_name_input'], input[autocomplete='name']",
    );
    await nameInput.first().waitFor({ timeout: 15000 });
    console.log(`           ✅ confirm-details form is visible — full booking flow works!`);

    if (errors.length) console.log(`  (non-fatal: ${errors.length} pageerror events)`);
    await ctx.close();
    return { label, ok: true };
  } catch (err) {
    console.log(`  ❌ FAILED: ${err.message}`);
    if (errors.length) console.log(`  pageerrors: ${errors.join(" | ")}`);
    const safeLabel = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    try {
      await page.screenshot({
        path: `/tmp/human-flow-fail-${safeLabel}.png`,
        fullPage: false,
      });
      console.log(`  saved /tmp/human-flow-fail-${safeLabel}.png`);
    } catch {}
    await ctx.close();
    return { label, ok: false, err: err.message };
  }
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  results.push(
    await runOnViewport(browser, "Mobile (iPhone 13)", {
      ...devices["iPhone 13"],
    }),
  );
  results.push(
    await runOnViewport(browser, "Desktop 1440", {
      viewport: { width: 1440, height: 900 },
    }),
  );
  await browser.close();

  console.log("\n━━━ SUMMARY ━━━");
  for (const r of results) {
    console.log(`${r.ok ? "✅" : "❌"} ${r.label}${r.err ? " — " + r.err : ""}`);
  }
  process.exit(results.every((r) => r.ok) ? 0 : 1);
})();
