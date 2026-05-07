import { test, expect } from "@playwright/test";

test.describe("Free Trial booking widget", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/free-trial");
  });

  test("Booking section renders with heading, fallback link, and phone CTA", async ({
    page,
  }) => {
    await test.step("Booking section is present and labeled", async () => {
      const section = page.locator("section#book");
      await expect(section).toHaveCount(1);
      await expect(
        section.getByRole("heading", {
          name: /pick a time that works for your family/i,
          level: 2,
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
      await expect(phone).toHaveAttribute("href", /^tel:\d{10,}$/);
    });
  });

  test("Calendly script loads and our container is in the DOM", async ({ page }) => {
    // Sanity check: the container we hand to Calendly is rendered, and the
    // Calendly script itself is present and loaded. The actual iframe render
    // is verified end-to-end against production HTTPS in scripts/verify-booking.cjs
    // (Calendly refuses to embed against http://localhost).
    const container = page.locator("section#book .relative > div").first();
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
    await page
      .waitForFunction(
        () =>
          typeof (window as unknown as { Calendly?: unknown }).Calendly ===
          "object",
        null,
        { timeout: 15_000 },
      );
    expect(errors).toEqual([]);
  });
});
