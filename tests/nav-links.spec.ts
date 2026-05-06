import { test, expect } from '@playwright/test';

/**
 * Crawls every internal link rendered in the site header (desktop + mobile drawer)
 * and footer, then asserts each URL responds with a 2xx status. This guards
 * against silently broken nav routes — e.g., a header link pointing at a path
 * with no `page.tsx`.
 *
 * The page list is derived at runtime from what the live homepage actually
 * renders, so it stays in sync with `content/site/metadata.md` automatically.
 */
test.describe('Navigation link health', () => {
  test('Every internal header + footer link returns a 2xx response', async ({
    page,
    request,
    baseURL,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Open the mobile drawer so its links appear in the DOM too. Some viewports
    // hide it; we open it conditionally.
    const menuButton = page.getByRole('button', { name: 'Open navigation menu' });
    if (await menuButton.count()) {
      await menuButton.click();
      await expect(
        page.getByRole('navigation', { name: 'Mobile navigation' })
      ).toHaveCount(1);
    }

    const hrefs = await page.$$eval('header a[href], footer a[href]', (anchors) =>
      Array.from(
        new Set(
          anchors
            .map((a) => a.getAttribute('href') ?? '')
            .filter((href): href is string => Boolean(href))
        )
      )
    );

    const internalRoutes = hrefs
      .filter((href) => href.startsWith('/'))
      .filter((href) => !href.startsWith('//'))
      // Skip in-page anchor jumps.
      .filter((href) => !href.startsWith('/#'));

    expect(internalRoutes.length).toBeGreaterThan(0);

    const failures: Array<{ href: string; status: number }> = [];

    for (const href of internalRoutes) {
      const url = new URL(href, baseURL ?? 'http://localhost:3000').toString();
      const response = await request.get(url, { maxRedirects: 5 });
      const status = response.status();
      if (status < 200 || status >= 300) {
        failures.push({ href, status });
      }
    }

    expect(
      failures,
      `Broken internal nav links:\n${failures
        .map((f) => `  ${f.href} -> ${f.status}`)
        .join('\n')}`
    ).toEqual([]);
  });
});
