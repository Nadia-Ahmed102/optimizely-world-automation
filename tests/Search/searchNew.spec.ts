import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
await page.goto('https://world.optimizely.com/');
await page.getByRole('textbox', { name: 'Refine by search' }).click();
await page.getByRole('searchbox', { name: 'Search' }).fill('testing');
await page.getByRole('searchbox', { name: 'Search' }).press('Tab');
await page.getByRole('button', { name: 'Clear' }).press('Shift+Tab');
//await page.waitForLoadState('domcontentloaded');
await page.waitForLoadState('networkidle');
await page.getByRole('searchbox', { name: 'Search' }).press('Enter');
});