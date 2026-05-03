import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:3000',
  },
  projects: [
    {
      name: 'mobile-chrome',
      use: {
        ...devices['iPhone 13'],
      },
    },
  ],
});
