import { test, expect } from '@playwright/test';

const BASE_URL = 'http://127.0.0.1:3000';

test.describe('PRD Readiness Review - Parent Perspective', () => {
  test('Homepage - First Impression & Trust Signals', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    
    // Check hero section
    const h1 = page.getByRole('heading', { level: 1 });
    const h1Count = await h1.count();
    console.log(`✓ H1 count: ${h1Count}`);
    
    // Check primary CTA visibility
    const primaryCTA = page.getByRole('link', { name: /Why Cedar|Free Trial/i });
    const ctaCount = await primaryCTA.count();
    console.log(`✓ Primary CTA count: ${ctaCount}`);
    
    // Check social proof (ratings)
    const ratingText = await page.locator('text=/5.0|Google rating/').count();
    console.log(`✓ Rating display count: ${ratingText}`);
    
    // Check navigation completeness
    const navLinks = page.getByRole('navigation').first().getByRole('link');
    const navCount = await navLinks.count();
    console.log(`✓ Navigation links: ${navCount}`);
  });

  test('Navigation Clarity', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const nav = page.getByRole('navigation').first();
    const items = await nav.getByRole('link').allTextContents();
    console.log(`✓ Navigation items: ${items.join(' → ')}`);
  });

  test('Services/Programs Findability', async ({ page }) => {
    await page.goto(`${BASE_URL}/programs`, { waitUntil: 'networkidle' });
    const programHeading = page.getByRole('heading');
    const headingCount = await programHeading.count();
    console.log(`✓ Program page has ${headingCount} headings`);
    
    // Check if services are clearly listed
    const programLinks = page.getByRole('link', { name: /Math|Science|Reading|Writing|Arabic/i });
    const programCount = await programLinks.count();
    console.log(`✓ Found ${programCount} program links`);
  });

  test('Trust-Building Content - About Page', async ({ page }) => {
    await page.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle' });
    
    // Check for founder/team info
    const teamSection = page.locator('text=/Meet the team|team|founder/i');
    const teamCount = await teamSection.count();
    console.log(`✓ Team/founder references: ${teamCount}`);
  });

  test('Reviews/Testimonials Page', async ({ page }) => {
    await page.goto(`${BASE_URL}/reviews`, { waitUntil: 'networkidle' });
    const testimonials = page.locator('text=/Google|rating/i');
    const testCount = await testimonials.count();
    console.log(`✓ Testimonial references: ${testCount}`);
  });

  test('Conversion Path - Free Trial CTA', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const freeTrial = page.getByRole('link', { name: /Free Trial/i });
    const ftCount = await freeTrial.count();
    if (ftCount > 0) {
      await freeTrial.first().click();
      await page.waitForLoadState('networkidle');
      const url = page.url();
      console.log(`✓ Free Trial CTA navigates to: ${url}`);
    }
  });

  test('Contact Information Visibility', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const phone = await page.locator('text=/708|890|contact/i').count();
    const email = await page.locator('text=/@|Info/').count();
    console.log(`✓ Phone visible: ${phone > 0}`);
    console.log(`✓ Email visible: ${email > 0}`);
  });

  test('Pricing Page Clarity', async ({ page }) => {
    await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle' });
    const priceHeading = page.getByRole('heading', { level: 1 });
    const heading = await priceHeading.first().textContent().catch(() => 'N/A');
    console.log(`✓ Pricing page heading: ${heading}`);
    
    // Check for pricing options
    const pricingTiers = page.locator('text=/$40|hourly|Plans/i');
    const tierCount = await pricingTiers.count();
    console.log(`✓ Pricing tier mentions: ${tierCount}`);
  });

  test('Mobile Responsiveness Check', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    
    // Check if menu collapses
    const hamMenu = page.getByRole('button', { name: /menu|toggle|hamburger/i });
    const hamCount = await hamMenu.count();
    console.log(`✓ Mobile hamburger menu present: ${hamCount > 0}`);
  });

  test('Form Presence - Book Assessment', async ({ page }) => {
    await page.goto(`${BASE_URL}/book-assessment`, { waitUntil: 'networkidle' });
    const form = page.locator('form').first();
    const formVisible = await form.isVisible().catch(() => false);
    console.log(`✓ Book Assessment form visible: ${formVisible}`);
  });
});
