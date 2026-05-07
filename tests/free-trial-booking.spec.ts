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

  test("Calendly script processes the inline widget div", async ({ page }) => {
    // We verify Calendly's widget.js loaded and processed our container
    // (sets data-processed="true"). The actual iframe render depends on
    // Calendly's embed policy (HTTPS, allowed domains) and is out of our
    // control here — production HTTPS deploy is where the iframe renders.
    const widget = page.locator("section#book .calendly-inline-widget");
    await expect(widget).toHaveCount(1);
    await expect(widget).toHaveAttribute(
      "data-url",
      /^https:\/\/calendly\.com\/cedartutoring/,
    );
    await expect(widget).toHaveAttribute("data-processed", "true", {
      timeout: 15_000,
    });

    const calendlyReady = await page.evaluate(
      () => typeof (window as unknown as { Calendly?: unknown }).Calendly === "object",
    );
    expect(calendlyReady).toBe(true);
  });

  test("Page has no JS errors when widget initializes", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.reload();
    await page
      .locator("section#book .calendly-inline-widget[data-processed='true']")
      .waitFor({ state: "attached", timeout: 15_000 });
    expect(errors).toEqual([]);
  });
});
