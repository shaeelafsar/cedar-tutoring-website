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
      await expect(drawer).toContainText('Where Learning Takes Root');
      await page.screenshot({
        path: screenshotPath('mobile-home-after-redesign.png'),
        fullPage: true,
      });
    });

    await test.step('Verify branded actions and contact links are present', async () => {
      await expect(drawer.getByRole('link', { name: 'Book a Free Assessment' })).toHaveCount(1);
      await expect(drawer.getByRole('link', { name: '(469) 757-2220' })).toHaveCount(1);
      await expect(drawer.getByRole('link', { name: 'info@cedartutoring.com' })).toHaveCount(1);
      await expect(drawer.getByRole('button', { name: 'Expand Programs' })).toHaveCount(1);
      await expect(drawer.getByRole('button', { name: 'Expand Test Prep' })).toHaveCount(1);
    });

    await test.step('Expand Programs and reveal the subject links', async () => {
      await drawer.getByRole('button', { name: 'Expand Programs' }).click();
      await expect(drawer.getByRole('link', { name: 'Math' })).toHaveCount(1);
      await expect(drawer.getByRole('link', { name: 'Reading' })).toHaveCount(1);
      await expect(drawer.getByRole('link', { name: 'Homework Help' })).toHaveCount(1);
    });

    await test.step('Verify the drawer opens without browser errors', async () => {
      expect(consoleMessages.filter((message) => message.startsWith('pageerror:'))).toEqual([]);
    });
  });

  test('Programs child routes keep the current section expanded with active child link state', async ({ page }) => {
    await page.goto('/programs/math', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Open navigation menu' }).click();

    const drawer = page.locator('[data-slot="sheet-content"]');
    const programsToggle = drawer.getByRole('button', { name: 'Collapse Programs' });
    const mathLink = drawer.getByRole('link', { name: 'Math' });

    await test.step('Keep the active parent section expanded', async () => {
      await expect(programsToggle).toHaveCount(1);
      await expect(mathLink).toHaveCount(1);
    });

    await test.step('Expose the active page semantics for the selected child route', async () => {
      await expect(mathLink).toHaveAttribute('aria-current', 'page');
      await expect(drawer.getByRole('link', { name: 'Programs' })).toHaveCount(1);
    });
  });
});
