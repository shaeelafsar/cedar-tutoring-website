import { test, expect } from "@playwright/test";

/**
 * Booking widget smoke tests — updated for Calendly-only /book-assessment.
 *
 * /free-trial now redirects to /book-assessment (client-side router.replace).
 * The booking widget previously tested on /free-trial now lives on /book-assessment.
 *
 * Full Calendly-only assertions: tests/book-assessment.spec.ts
 * Redirect behaviour:            tests/free-trial-redirect.spec.ts
 */
test.describe("Booking widget — /book-assessment", () => {
  test.beforeEach(async ({ page }) => {
    // Booking widget is now on /book-assessment (not /free-trial).
    await page.goto("/book-assessment/");
  });

  test("Booking section renders with heading, fallback link, and phone CTA", async ({
    page,
  }) => {
    await test.step("Booking heading is present", async () => {
      await expect(
        page.getByRole("heading", {
          name: /pick a time that works for your family/i,
        }),
      ).toHaveCount(1);
    });

    await test.step("Fallback 'Book on Calendly' link is always visible", async () => {
      const fallback = page.getByRole("link", {
        name: /calendar not loading\? book on calendly/i,
      });
      await expect(fallback).toHaveCount(1);
      await expect(fallback).toHaveAttribute(
        "href",
        /^https:\/\/calendly\.com\/cedartutoring/,
      );
      await expect(fallback).toHaveAttribute("target", "_blank");
    });

    await test.step("Phone fallback CTA links to a real tel: URL", async () => {
      const phone = page.getByRole("link", { name: /prefer to call/i });
      await expect(phone).toHaveCount(1);
      await expect(phone).toHaveAttribute("href", /^tel:/);
    });
  });

  test("Calendly script loads and our container is in the DOM", async ({
    page,
  }) => {
    // CalendlyInline uses .cedar-calendly-host (NOT .calendly-inline-widget —
    // that class triggers Calendly's auto-init and races with our explicit
    // initInlineWidget call). See src/components/shared/CalendlyInline.tsx.
    const container = page.locator(".cedar-calendly-host");
    await expect(container).toHaveCount(1);

    await page.waitForFunction(
      () =>
        typeof (window as unknown as { Calendly?: unknown }).Calendly ===
        "object",
      null,
      { timeout: 15_000 },
    );
  });

  test("Page has no JS errors when widget initializes", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.reload();
    await page.waitForFunction(
      () =>
        typeof (window as unknown as { Calendly?: unknown }).Calendly ===
        "object",
      null,
      { timeout: 15_000 },
    );
    expect(errors).toEqual([]);
  });
});
