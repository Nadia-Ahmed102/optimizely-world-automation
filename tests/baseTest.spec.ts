import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/'); // thanks to baseURL, this goes to https://world.optimizely.com/
  await expect(page).toHaveTitle(/Optimizely Developer Community/);
});
