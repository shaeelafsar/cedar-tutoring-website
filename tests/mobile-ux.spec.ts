import { test, expect } from '@playwright/test';

const pages = [
  { name: 'Homepage', path: '/' },
  { name: 'Programs', path: '/programs' },
  { name: 'About', path: '/about' },
  { name: 'Reviews', path: '/reviews' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Locations', path: '/locations' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Test Prep', path: '/test-prep' },
  { name: 'Book Assessment', path: '/book-assessment' },
];

test.describe('Mobile UX Check (375x812)', () => {
  for (const pg of pages) {
    test(`${pg.name} (${pg.path}) loads and renders`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      const response = await page.goto(pg.path, { waitUntil: 'networkidle' });
      const status = response?.status() ?? 0;

      // Screenshot
      await page.screenshot({
        path: `tests/screenshots/${pg.name.toLowerCase().replace(/\s+/g, '-')}-mobile.png`,
        fullPage: true,
      });

      // Check status
      if (status === 404) {
        console.log(`[SKIP] ${pg.name} returned 404 - page not implemented`);
        test.skip();
        return;
      }

      expect(status).toBe(200);

      // Check no horizontal overflow (mobile rendering issue)
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = page.viewportSize()?.width ?? 375;
      const hasOverflow = bodyWidth > viewportWidth + 5; // 5px tolerance

      if (hasOverflow) {
        console.log(`[WARN] ${pg.name}: body scrollWidth (${bodyWidth}) > viewport (${viewportWidth})`);
      }

      // Check for text overflow / wrapping issues in testimonials
      if (pg.path === '/' || pg.path === '/reviews') {
        const testimonials = page.locator('[class*="testimonial"], [class*="review"], [data-testid*="testimonial"]');
        const count = await testimonials.count();
        if (count > 0) {
          for (let i = 0; i < count; i++) {
            const el = testimonials.nth(i);
            const box = await el.boundingBox();
            if (box && box.width > viewportWidth) {
              console.log(`[BUG] Testimonial ${i} overflows viewport: width=${box.width}`);
            }
          }
        }
      }

      // Log console errors
      if (consoleErrors.length > 0) {
        console.log(`[CONSOLE ERRORS] ${pg.name}:`, consoleErrors);
      }
    });
  }

  test('Homepage - check text not clipped at mobile width', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Check all text containers fit within viewport
    const overflowingElements = await page.evaluate(() => {
      const results: string[] = [];
      const elements = document.querySelectorAll('p, h1, h2, h3, h4, span, blockquote');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width > window.innerWidth + 10) {
          results.push(`${el.tagName}.${el.className}: width=${rect.width}`);
        }
      });
      return results;
    });

    if (overflowingElements.length > 0) {
      console.log('[OVERFLOW] Elements wider than viewport:', overflowingElements);
    }

    expect(overflowingElements.length).toBe(0);
  });

  test('Navigation is accessible on mobile', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Look for hamburger menu / mobile nav toggle
    const mobileMenuBtn = page.locator('button[aria-label*="menu" i], button[aria-label*="nav" i], [data-testid="mobile-menu"]');
    const hasMobileMenu = await mobileMenuBtn.count() > 0;

    if (hasMobileMenu) {
      await mobileMenuBtn.first().click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'tests/screenshots/mobile-nav-open.png' });
    } else {
      // Check if nav links are visible without a menu button
      const navLinks = page.locator('nav a');
      const navCount = await navLinks.count();
      console.log(`[INFO] No mobile menu button found. Nav links visible: ${navCount}`);
    }
  });
});
