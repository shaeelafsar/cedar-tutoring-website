import { test, expect } from "@playwright/test";

/**
 * Tests for the /free-trial → /book-assessment redirect.
 *
 * /free-trial is now a client-side redirect page (router.replace('/book-assessment')).
 * It will remain until Azure SWA enables a true HTTP 301 (Wave 3 / Azure migration).
 * See src/app/(marketing)/free-trial/page.tsx.
 */

test.describe("Free Trial redirect", () => {
  test("/free-trial redirects to /book-assessment", async ({ page }) => {
    await test.step("Navigate to /free-trial", async () => {
      await page.goto("/free-trial");
    });

    await test.step(
      "URL becomes /book-assessment after client-side redirect",
      async () => {
        // router.replace('/book-assessment') fires in useEffect on mount.
        // Regex tolerates basePath prefix on GitHub Pages deployments
        // (e.g. /cedar-tutoring-website/book-assessment).
        await expect(page).toHaveURL(/\/book-assessment/);
      },
    );

    await test.step("Destination page H1 heading is visible", async () => {
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: "Let's Find the Right Fit for Your Child",
        }),
      ).toBeAttached();
    });
  });
});
