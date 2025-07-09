import { test, expect } from '@playwright/test';

test('AI search enabled by default', async ({ page }) => {
  await page.goto('https://world.optimizely.com/');
  const defaultSearchModeLabel = await page.locator('#search-toggle-container > span > span.ai');
  expect(defaultSearchModeLabel).toHaveText('AI On');
  //comment - delete this later
});
