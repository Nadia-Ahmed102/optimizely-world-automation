import { test, expect } from '@playwright/test';

test('homepage should load and have correct title', async ({ page }) => {
  await page.goto('https://world.optimizely.com/');
  await expect(page).toHaveTitle(/Optimizely Developer Community/);
});
