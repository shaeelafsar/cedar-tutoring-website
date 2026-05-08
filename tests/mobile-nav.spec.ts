import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';

const screenshotDir = path.join(process.cwd(), 'tests', 'screenshots');

function screenshotPath(fileName: string) {
  fs.mkdirSync(screenshotDir, { recursive: true });
  return path.join(screenshotDir, fileName);
}

test.describe('Mobile navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
  });

  test('Homepage - drawer shows branded navigation and quick contact actions', async ({ page }) => {
    const consoleMessages: string[] = [];

    page.on('console', (message) => {
      consoleMessages.push(`${message.type()}: ${message.text()}`);
    });
    page.on('pageerror', (error) => {
      consoleMessages.push(`pageerror: ${error.message}`);
    });

    await page.goto('/', { waitUntil: 'networkidle' });

    const menuButton = page.getByRole('button', { name: 'Open navigation menu' });
    const drawer = page.locator('[data-slot="sheet-content"]');

    await test.step('Open the drawer from the mobile header', async () => {
      await expect(menuButton).toHaveCount(1);
      await menuButton.click();
      await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(1);
      await expect(drawer).toContainText('Strengthening Academic Abilities Efficiently and Effectively');
      await page.screenshot({
        path: screenshotPath('mobile-home-after-redesign.png'),
        fullPage: true,
      });
    });

    await test.step('Verify all top-level nav links are present', async () => {
      const nav = drawer.getByRole('navigation', { name: 'Mobile navigation' });
      await expect(nav.getByRole('link', { name: 'Home' })).toHaveCount(1);
      await expect(nav.getByRole('link', { name: 'Academic Programs' })).toHaveCount(1);
      await expect(nav.getByRole('link', { name: 'Test Prep' })).toHaveCount(1);
      await expect(nav.getByRole('link', { name: 'Summer Programs' })).toHaveCount(1);
      await expect(nav.getByRole('link', { name: 'Why Us' })).toHaveCount(1);
      await expect(nav.getByRole('link', { name: 'Plans' })).toHaveCount(1);
      await expect(nav.getByRole('link', { name: 'Contact Us' })).toHaveCount(1);
    });

    await test.step('Verify branded actions and contact links are present', async () => {
      await expect(drawer.getByRole('link', { name: 'Book a Free Assessment' })).toHaveCount(1);
      await expect(drawer.getByRole('link', { name: '+1 708 890-4400' })).toHaveCount(1);
      await expect(drawer.getByRole('link', { name: 'Info@cedartutoring.com' })).toHaveCount(1);
    });

    await test.step('Verify the drawer opens without browser errors', async () => {
      expect(consoleMessages.filter((message) => message.startsWith('pageerror:'))).toEqual([]);
    });
  });

  test('Programs child routes show the parent nav link in the drawer', async ({ page }) => {
    await page.goto('/programs/math', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Open navigation menu' }).click();

    const drawer = page.locator('[data-slot="sheet-content"]');

    await test.step('Parent nav link is accessible from a programs child route', async () => {
      await expect(drawer.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(1);
      await expect(drawer.getByRole('link', { name: 'Academic Programs' })).toHaveCount(1);
    });
  });
});
