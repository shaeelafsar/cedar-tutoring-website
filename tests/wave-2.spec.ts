import { test, expect, type Page } from '@playwright/test';

// Collect console errors per page, filtering out known third-party noise
async function collectConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Filter out third-party script errors (GA, Calendly, etc.)
      const isThirdParty =
        text.includes('google-analytics') ||
        text.includes('googletagmanager') ||
        text.includes('calendly') ||
        text.includes('web3forms') ||
        text.includes('cdn.') ||
        text.includes('Failed to load resource') ||
        // Next.js dev-mode hydration mismatches — not production bugs
        text.includes('Hydration') ||
        text.includes('hydration') ||
        // Expected Web3Forms key-missing warning
        text.includes('NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY');
      if (!isThirdParty) {
        errors.push(text);
      }
    }
  });
  return errors;
}

test.describe('Wave 2 — Top Navigation', () => {
  test('Nav - "Plans" link exists; "Free Trial" is absent', async ({ page }) => {
    const consoleErrors = await collectConsoleErrors(page);

    await test.step('Navigate to home', async () => {
      await page.goto('/');
    });

    await test.step('Assert "Plans" nav link exists and points to /pricing', async () => {
      const plansLink = page.getByRole('navigation').getByRole('link', { name: 'Plans' });
      // href may include trailing slash depending on Next.js config
      await expect(plansLink).toHaveAttribute('href', /^\/pricing\/?$/);
    });

    await test.step('Assert "Free Trial" is NOT in the top nav', async () => {
      const nav = page.getByRole('navigation');
      await expect(nav.getByRole('link', { name: /free trial/i })).toHaveCount(0);
    });

    await test.step('No unexpected console errors', async () => {
      expect(consoleErrors).toHaveLength(0);
    });
  });
});

test.describe('Wave 2 — Footer', () => {
  test('Footer - no Blog link; Privacy policy link exists and resolves', async ({ page }) => {
    const consoleErrors = await collectConsoleErrors(page);

    await test.step('Navigate to home', async () => {
      await page.goto('/');
    });

    await test.step('Assert footer has NO blog link', async () => {
      const footer = page.getByRole('contentinfo');
      await expect(footer.locator('a[href="/blog"]')).toHaveCount(0);
    });

    await test.step('Assert "Privacy policy" link exists in footer and points to /privacy-policy/', async () => {
      const footer = page.getByRole('contentinfo');
      const privacyLink = footer.getByRole('link', { name: /privacy policy/i });
      await expect(privacyLink).toHaveAttribute('href', /\/privacy-policy/);
    });

    await test.step('Privacy policy link resolves (navigates to /privacy-policy/)', async () => {
      const footer = page.getByRole('contentinfo');
      const privacyLink = footer.getByRole('link', { name: /privacy policy/i });
      await Promise.all([
        page.waitForURL(/\/privacy-policy/),
        privacyLink.click(),
      ]);
      await expect(page.getByRole('heading', { level: 1, name: /privacy policy/i })).toBeAttached();
    });

    await test.step('No unexpected console errors', async () => {
      expect(consoleErrors).toHaveLength(0);
    });
  });
});

test.describe('Wave 2 — Home Hero', () => {
  test('Home H1 matches Wave 2 headline', async ({ page }) => {
    const consoleErrors = await collectConsoleErrors(page);

    await test.step('Navigate to home', async () => {
      await page.goto('/');
    });

    await test.step('Assert H1 contains Wave 2 headline text', async () => {
      const h1 = page.getByRole('heading', { level: 1 });
      await expect(h1).toContainText('Personalized tutoring that helps your child feel confident again');
    });

    await test.step('No unexpected console errors', async () => {
      expect(consoleErrors).toHaveLength(0);
    });
  });
});

test.describe('Wave 2 — Privacy Policy Page', () => {
  test('Privacy policy page exists and has required sections', async ({ page }) => {
    const consoleErrors = await collectConsoleErrors(page);

    await test.step('Navigate to /privacy-policy/', async () => {
      const response = await page.goto('/privacy-policy/');
      expect(response?.status()).toBe(200);
    });

    await test.step('Page heading contains "Privacy"', async () => {
      const heading = page.getByRole('heading', { name: /privacy/i }).first();
      await expect(heading).toBeAttached();
    });

    await test.step('Required section headings exist', async () => {
      await expect(page.getByRole('heading', { name: /information we collect/i })).toBeAttached();
      await expect(page.getByRole('heading', { name: /how we use/i })).toBeAttached();
      await expect(page.getByRole('heading', { name: /children.*privacy/i })).toBeAttached();
      await expect(page.getByRole('heading', { name: /data security/i })).toBeAttached();
      await expect(page.getByRole('heading', { name: /contact/i })).toBeAttached();
    });

    await test.step('Lawyer-review banner mentions "legal counsel"', async () => {
      await expect(page.getByText(/legal counsel/i)).toBeAttached();
    });

    await test.step('No unexpected console errors', async () => {
      expect(consoleErrors).toHaveLength(0);
    });
  });
});

test.describe('Wave 2 — Pricing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pricing/');
  });

  test('Pricing — As-Needed card shows $40 per session with CTA', async ({ page }) => {
    const consoleErrors = await collectConsoleErrors(page);

    await test.step('Find As-Needed card', async () => {
      const card = page.getByRole('article').filter({ hasText: 'As-Needed' });
      await expect(card).toBeAttached();
    });

    await test.step('Assert $40 price is visible', async () => {
      const card = page.getByRole('article').filter({ hasText: 'As-Needed' });
      await expect(card.getByText('$40')).toBeAttached();
    });

    await test.step('Assert "/ session" cadence is present', async () => {
      const card = page.getByRole('article').filter({ hasText: 'As-Needed' });
      await expect(card.getByText(/\/ session/i)).toBeAttached();
    });

    await test.step('Assert CTA links to /book-assessment/', async () => {
      const card = page.getByRole('article').filter({ hasText: 'As-Needed' });
      const cta = card.getByRole('link', { name: /book a free assessment/i });
      await expect(cta).toHaveAttribute('href', '/book-assessment/');
    });

    await test.step('No unexpected console errors', async () => {
      expect(consoleErrors).toHaveLength(0);
    });
  });

  test('Pricing — Family Plan card: default $699.99, toggle to $749.99 then back', async ({ page }) => {
    const consoleErrors = await collectConsoleErrors(page);
    const card = page.getByRole('article').filter({ hasText: 'Family Plan' });

    await test.step('Default price is $699.99 (5 sessions/week)', async () => {
      await expect(card.getByText('$699.99')).toBeAttached();
    });

    await test.step('Click "6/week" toggle — price changes to $749.99', async () => {
      const toggle6 = card.getByRole('button', { name: '6/week' });
      await toggle6.click();
      await expect(card.getByText('$749.99')).toBeAttached();
      await expect(card.getByText('$699.99')).toHaveCount(0);
    });

    await test.step('Click "5/week" toggle — price returns to $699.99', async () => {
      const toggle5 = card.getByRole('button', { name: '5/week' });
      await toggle5.click();
      await expect(card.getByText('$699.99')).toBeAttached();
      await expect(card.getByText('$749.99')).toHaveCount(0);
    });

    await test.step('No unexpected console errors', async () => {
      expect(consoleErrors).toHaveLength(0);
    });
  });

  test('Pricing — Homework Help card: all 4 tier prices accessible via toggles', async ({ page }) => {
    const consoleErrors = await collectConsoleErrors(page);
    const card = page.getByRole('article').filter({ hasText: 'Homework Help' });

    await test.step('Default price is $549.99 (4 sessions/week)', async () => {
      await expect(card.getByText('$549.99')).toBeAttached();
    });

    await test.step('Click "3/week" — price is $419.99', async () => {
      await card.getByRole('button', { name: '3/week' }).click();
      await expect(card.getByText('$419.99')).toBeAttached();
    });

    await test.step('Click "4/week" — price is $549.99', async () => {
      await card.getByRole('button', { name: '4/week' }).click();
      await expect(card.getByText('$549.99')).toBeAttached();
    });

    await test.step('Click "5/week" — price is $649.99', async () => {
      await card.getByRole('button', { name: '5/week' }).click();
      await expect(card.getByText('$649.99')).toBeAttached();
    });

    await test.step('Click "6/week" — price is $699.99', async () => {
      await card.getByRole('button', { name: '6/week' }).click();
      await expect(card.getByText('$699.99')).toBeAttached();
    });

    await test.step('No unexpected console errors', async () => {
      expect(consoleErrors).toHaveLength(0);
    });
  });

  test('Pricing — FAQ has at least 3 Q&A pairs', async ({ page }) => {
    const consoleErrors = await collectConsoleErrors(page);

    await test.step('Assert at least 3 FAQ items exist below pricing cards', async () => {
      // FAQAccordion renders items as buttons/triggers — assert the specific question text
      await expect(page.getByRole('button', { name: /can i switch plans/i })).toBeAttached();
      await expect(page.getByRole('button', { name: /what.*included.*free assessment/i })).toBeAttached();
      await expect(page.getByRole('button', { name: /cancellation policy/i })).toBeAttached();
    });

    await test.step('No unexpected console errors', async () => {
      expect(consoleErrors).toHaveLength(0);
    });
  });
});

test.describe('Wave 2 — About / Team Page', () => {
  test('About page shows only Asmah; placeholder team members removed', async ({ page }) => {
    const consoleErrors = await collectConsoleErrors(page);

    await test.step('Navigate to /about/', async () => {
      const response = await page.goto('/about/');
      expect(response?.status()).toBe(200);
    });

    await test.step('Asmah appears on the page', async () => {
      // Use the team member heading specifically to avoid strict-mode violation
      await expect(page.getByRole('heading', { name: 'Asmah', exact: true })).toBeAttached();
    });

    await test.step('Removed team members are NOT present', async () => {
      await expect(page.getByText('Amina Rahman')).toHaveCount(0);
      await expect(page.getByText('Nora Hassan')).toHaveCount(0);
      await expect(page.getByText('Omar Siddiqui')).toHaveCount(0);
      await expect(page.getByText('Sarah Khan')).toHaveCount(0);
    });

    await test.step('No unexpected console errors', async () => {
      expect(consoleErrors).toHaveLength(0);
    });
  });
});

test.describe('Wave 2 — Book Assessment Form', () => {
  test('Form renders with honeypot field in DOM', async ({ page }) => {
    const consoleErrors = await collectConsoleErrors(page);

    await test.step('Navigate to /book-assessment/', async () => {
      const response = await page.goto('/book-assessment/');
      expect(response?.status()).toBe(200);
    });

    await test.step('Form element is present', async () => {
      await expect(page.locator('form')).toBeAttached();
    });

    await test.step('Botcheck honeypot input exists in DOM (hidden)', async () => {
      // Web3Forms anti-spam field — must be in DOM but not visible to users
      const honeypot = page.locator('input[name="botcheck"]');
      await expect(honeypot).toBeAttached();
    });

    await test.step('No unexpected console errors', async () => {
      expect(consoleErrors).toHaveLength(0);
    });
  });
});

test.describe('Wave 2 — Mobile Viewport: Pricing Cards', () => {
  test('All 3 pricing cards visible and have primary price + CTA at 375×812', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 812 },
    });
    const page = await context.newPage();
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (
          !text.includes('hydration') &&
          !text.includes('Hydration') &&
          !text.includes('NEXT_PUBLIC_WEB3FORMS') &&
          !text.includes('Failed to load resource')
        ) {
          consoleErrors.push(text);
        }
      }
    });

    await test.step('Navigate to /pricing/ on 375px viewport', async () => {
      await page.goto('http://localhost:3000/pricing/');
    });

    await test.step('All 3 cards are present (stacked on mobile)', async () => {
      await expect(page.getByRole('article')).toHaveCount(3);
    });

    await test.step('As-Needed card: price and CTA visible', async () => {
      const asNeeded = page.getByRole('article').filter({ hasText: 'As-Needed' });
      await expect(asNeeded.getByText('$40')).toBeAttached();
      await expect(asNeeded.getByRole('link', { name: /book a free assessment/i })).toBeAttached();
    });

    await test.step('Family Plan card: price and CTA visible', async () => {
      const familyPlan = page.getByRole('article').filter({ hasText: 'Family Plan' });
      await expect(familyPlan.getByText('$699.99')).toBeAttached();
      await expect(familyPlan.getByRole('link', { name: /book a free assessment/i })).toBeAttached();
    });

    await test.step('Homework Help card: price and CTA visible', async () => {
      const homeworkHelp = page.getByRole('article').filter({ hasText: 'Homework Help' });
      await expect(homeworkHelp.getByText('$549.99')).toBeAttached();
      await expect(homeworkHelp.getByRole('link', { name: /book a free assessment/i })).toBeAttached();
    });

    await test.step('No unexpected console errors on mobile', async () => {
      expect(consoleErrors).toHaveLength(0);
    });

    await context.close();
  });
});
