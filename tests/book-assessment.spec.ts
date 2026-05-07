import { test, expect } from "@playwright/test";

/**
 * Tests for /book-assessment in Calendly-only mode.
 *
 * The page renders BookAssessmentCalendlyClient.tsx (hero, CalendlyInline embed,
 * What to Expect steps, social proof, FAQ). BookAssessmentPageClient.tsx is Wave 3
 * scaffolding — NOT mounted. See .squad/decisions/inbox/coordinator-pivot-calendly-only.md.
 *
 * NOTE: Do NOT interact with Calendly's iframe content — it is sandboxed and will
 * time out. Only assert the container div (.cedar-calendly-host) is mounted.
 */

test.describe("Book Assessment — Calendly-only", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/book-assessment/");
  });

  test("Page loads — H1 heading matches expected copy", async ({ page }) => {
    await test.step("H1 heading text matches content/pages/book-assessment/_page.md", async () => {
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: "Let's Find the Right Fit for Your Child",
        }),
      ).toBeAttached();
    });
  });

  test("Calendly embed — container in DOM + fallback links present", async ({
    page,
  }) => {
    await test.step(
      "Calendly host container (.cedar-calendly-host) is mounted",
      async () => {
        // CalendlyInline uses a plain ref'd div with class cedar-calendly-host — deliberately
        // NOT .calendly-inline-widget (which would trigger Calendly's auto-init and race
        // with our explicit initInlineWidget call). See CalendlyInline.tsx.
        const container = page.locator(".cedar-calendly-host");
        await expect(container).toHaveCount(1);
      },
    );

    await test.step(
      '"Calendar not loading?" fallback link points to Calendly',
      async () => {
        const fallback = page.getByRole("link", {
          name: /calendar not loading\? book on calendly/i,
        });
        await expect(fallback).toHaveCount(1);
        await expect(fallback).toHaveAttribute(
          "href",
          /^https:\/\/calendly\.com\/cedartutoring/,
        );
        await expect(fallback).toHaveAttribute("target", "_blank");
      },
    );

    await test.step("Phone fallback CTA links to a tel: URL", async () => {
      const phone = page.getByRole("link", { name: /prefer to call/i });
      await expect(phone).toHaveCount(1);
      await expect(phone).toHaveAttribute("href", /^tel:/);
    });
  });

  test("What to Expect — section and all four steps render", async ({
    page,
  }) => {
    await test.step('"What to expect" eyebrow is present', async () => {
      await expect(page.getByText(/what to expect/i).first()).toBeAttached();
    });

    await test.step("All four step headings are present", async () => {
      await expect(
        page.getByRole("heading", { name: /1\. Pick a time online/i }),
      ).toBeAttached();
      await expect(
        page.getByRole("heading", { name: /2\. Cedar confirms your booking/i }),
      ).toBeAttached();
      await expect(
        page.getByRole("heading", { name: /3\. Free 30-minute assessment/i }),
      ).toBeAttached();
      await expect(
        page.getByRole("heading", { name: /4\. Custom learning plan/i }),
      ).toBeAttached();
    });
  });

  test("Social proof — testimonials section renders", async ({ page }) => {
    await test.step("Testimonials section heading is present", async () => {
      await expect(
        page.getByRole("heading", {
          name: /why families feel confident booking with cedar/i,
        }),
      ).toBeAttached();
    });

    await test.step("Testimonial articles are rendered", async () => {
      // 3 testimonial IDs in content/pages/book-assessment/_page.md
      const testimonialSection = page.locator("section").filter({
        has: page.getByRole("heading", {
          name: /why families feel confident booking with cedar/i,
        }),
      });
      await expect(testimonialSection.getByRole("article")).toHaveCount(3);
    });
  });

  test("FAQ section renders with heading and first item open", async ({
    page,
  }) => {
    await test.step("FAQ section heading is present", async () => {
      await expect(
        page.getByRole("heading", {
          name: /questions parents ask before booking/i,
        }),
      ).toBeAttached();
    });

    await test.step("First FAQ question is visible (defaultOpen={0})", async () => {
      await expect(
        page.getByText(/is the assessment really free/i),
      ).toBeAttached();
    });
  });

  test("No assessment form rendered — Wave 3 regression guard", async ({
    page,
  }) => {
    await test.step("No <form> element exists on /book-assessment", async () => {
      // BookAssessmentPageClient.tsx is Wave 3 scaffolding and is NOT imported
      // on any route. This test catches accidental re-mounting.
      await expect(page.locator("form")).toHaveCount(0);
    });

    await test.step("No assessment form input fields present", async () => {
      await expect(
        page.locator(
          'input[name="parentName"], input[name="parent_name"], input[name="childName"]',
        ),
      ).toHaveCount(0);
    });
  });

  test("Mobile viewport — Calendly container mounts at iPhone width", async ({
    browser,
  }) => {
    // Wave 2 fixed mobile embed rendering (min-height / iframe height issue).
    // This test guards against regressions at iPhone viewport.
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();

    await page.goto("/book-assessment/");

    await test.step("H1 heading is attached at mobile viewport", async () => {
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: "Let's Find the Right Fit for Your Child",
        }),
      ).toBeAttached();
    });

    await test.step(
      "Calendly host container is mounted at mobile viewport",
      async () => {
        await expect(page.locator(".cedar-calendly-host")).toHaveCount(1);
      },
    );

    await context.close();
  });
});
