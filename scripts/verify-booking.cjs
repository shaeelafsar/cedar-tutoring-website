/* eslint-disable */
/**
 * Production end-to-end verification of the /free-trial booking widget.
 *
 * Calendly will not embed against http://localhost (non-HTTPS), so the only
 * meaningful test of "is the calendar actually rendering and bookable?" is
 * against the deployed HTTPS site. This script:
 *
 *   1. Loads the live /free-trial page
 *   2. Asserts the Calendly iframe mounts inside section#book
 *   3. Enters the iframe, finds the calendar grid, picks the first
 *      available date
 *   4. Asserts time-slot buttons appear after the date is picked, proving
 *      Calendly's full booking flow is wired up — not just a static iframe
 *
 * Run after each deploy: `node scripts/verify-booking.cjs`
 * Exits 0 on success, non-zero with diagnostics on failure.
 */

const { chromium, devices } = require("playwright");

const URL =
  process.env.BOOKING_URL ||
  "https://shaeelafsar.github.io/cedar-tutoring-website/free-trial/";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ ...devices["Desktop Chrome"] });
  const page = await context.newPage();

  const errors = [];
  page.on("pageerror", (err) => errors.push(`PAGEERROR: ${err.message}`));
  page.on("requestfailed", (req) => {
    if (req.url().includes("calendly")) {
      errors.push(
        `REQFAIL: ${req.url().slice(0, 120)} ${req.failure()?.errorText || ""}`,
      );
    }
  });

  try {
    console.log(`→ Loading ${URL}`);
    await page.goto(URL, { waitUntil: "load", timeout: 30_000 });

    console.log("→ Waiting for Calendly iframe in section#book...");
    const iframeLocator = page.locator(
      "section#book iframe[src*='calendly.com']",
    );
    await iframeLocator.waitFor({ state: "attached", timeout: 30_000 });
    const src = await iframeLocator.getAttribute("src");
    console.log(`✅ iframe attached: ${src.slice(0, 120)}...`);

    const frame = await iframeLocator.contentFrame();
    if (!frame) throw new Error("Could not access iframe content");

    console.log("→ Waiting for date picker buttons inside calendar...");
    const dateButtons = frame.locator(
      "table button[aria-label]:not([disabled])",
    );
    await dateButtons.first().waitFor({ timeout: 25_000 });
    const totalDates = await dateButtons.count();
    console.log(`✅ Found ${totalDates} pickable dates`);

    if (totalDates === 0) throw new Error("No pickable dates found");

    const firstDateLabel = await dateButtons.first().getAttribute("aria-label");
    console.log(`→ Picking date: ${firstDateLabel}`);
    await dateButtons.first().click();

    console.log("→ Waiting for time-slot buttons to appear...");
    // Calendly's time slots are typically buttons with text like "9:00am"
    // or have data-component="spotpicker-times-list" wrapper.
    const timeSlots = frame.locator(
      "[data-component='spotpicker-times-list'] button, button[data-container='time-button']",
    );
    await timeSlots.first().waitFor({ timeout: 15_000 });
    const slotCount = await timeSlots.count();
    console.log(`✅ ${slotCount} time slots available after date pick`);

    const sample = [];
    for (let i = 0; i < Math.min(3, slotCount); i++) {
      const text = (await timeSlots.nth(i).textContent())?.trim();
      if (text) sample.push(text);
    }
    if (sample.length) console.log(`   sample: ${sample.join(", ")}`);

    if (errors.length) {
      console.log("\n⚠️  Non-fatal errors during run:");
      errors.forEach((e) => console.log("   " + e));
    }

    console.log("\n🎉 SUCCESS — calendar mounts, date is pickable, time slots show.");
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.log("\n❌ FAILED:", err.message);
    if (errors.length) {
      console.log("Captured errors:");
      errors.forEach((e) => console.log("  " + e));
    }
    try {
      const widget = await page.evaluate(() => {
        const root = document.querySelector("section#book");
        if (!root) return "no section#book";
        const iframes = root.querySelectorAll("iframe");
        return {
          iframeCount: iframes.length,
          iframeSrcs: Array.from(iframes).map((f) => f.src.slice(0, 120)),
          containerHeight:
            root.querySelector("[style]")?.getBoundingClientRect().height,
          calendlyOnWindow: typeof window.Calendly,
        };
      });
      console.log("Diagnostics:", JSON.stringify(widget, null, 2));
    } catch {}
    await browser.close();
    process.exit(1);
  }
})();
