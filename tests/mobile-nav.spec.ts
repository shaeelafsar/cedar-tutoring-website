import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const screenshotDir = path.join(process.cwd(), 'tests', 'screenshots');

function screenshotPath(fileName: string) {
  fs.mkdirSync(screenshotDir, { recursive: true });
  return path.join(screenshotDir, fileName);
}

test.describe('Mobile navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://localhost:3000');
  });

  test('Homepage - hamburger menu opens the mobile sheet', async ({ page }) => {
    const consoleMessages: string[] = [];
    page.on('console', (message) => {
      consoleMessages.push(`${message.type()}: ${message.text()}`);
    });
    page.on('pageerror', (error) => {
      consoleMessages.push(`pageerror: ${error.message}`);
    });

    const menuButton = page.getByRole('button', {
      name: 'Open navigation menu',
    });
    const mobileNav = page.getByRole('navigation', { name: 'Mobile navigation' });

    await test.step('Capture the closed mobile header state', async () => {
      await expect(menuButton).toHaveCount(1);
      await expect(menuButton).toBeVisible();
      await page.screenshot({
        path: screenshotPath('mobile-home-before.png'),
        fullPage: true,
      });
    });

    await test.step('Open the mobile navigation sheet', async () => {
      await menuButton.click();
      await expect(mobileNav).toBeVisible();
      await expect(page.locator('[data-slot="sheet-content"]')).toBeVisible();
      await page.screenshot({
        path: screenshotPath('mobile-home-after.png'),
        fullPage: true,
      });
    });

    await test.step('Verify there are no browser errors while opening the menu', async () => {
      expect(consoleMessages.filter((message) => message.startsWith('pageerror:'))).toEqual([]);
    });
  });

  test('Implemented marketing pages render on mobile', async ({ page }) => {
    const pages = [
      {
        url: 'http://localhost:3000/',
        headingFragment: 'Build skills, confidence, and results',
        screenshot: 'homepage-mobile.png',
      },
      {
        url: 'http://localhost:3000/programs',
        headingFragment: 'Academic programs built around',
        screenshot: 'programs-mobile.png',
      },
      {
        url: 'http://localhost:3000/programs/math',
        headingFragment: 'Math tutoring that meets students',
        screenshot: 'programs-math-mobile.png',
      },
    ] as const;

    for (const currentPage of pages) {
      await test.step(`Check ${currentPage.url}`, async () => {
        await page.goto(currentPage.url, { waitUntil: 'networkidle' });
        await expect(page.locator('h1')).toContainText(currentPage.headingFragment);
        await page.screenshot({
          path: screenshotPath(currentPage.screenshot),
          fullPage: true,
        });
      });
    }
  });
});
