import { test, expect } from '@playwright/test';

test('main navigation is visible', async ({ page }) => {
  await page.goto('https://world.optimizely.com/');
  const navMenus = page.locator('.navbar-nav');
const count = await navMenus.count();

for (let i = 0; i < count; i++) {
  await expect(navMenus.nth(i)).toBeVisible();
}
});

test('click Products nav item', async ({ page }) => {
  await page.goto('https://world.optimizely.com/');

  const productsLink = page.getByRole('link', { name: 'Products' });
  await expect(productsLink).toBeVisible();
  await productsLink.click();

  // Verify navigation
  await expect(page).toHaveURL(/.*products.*/);
  await expect(page).toHaveTitle(/Products | Optimizely Developer Community/i); // Expected title
});


test('multi-level Products menu navigates correctly', async ({ page }) => {
  await page.goto('https://world.optimizely.com/');

  // Hover over "Products"
  const productsLink = page.locator('a[href="/products/"]');
  await productsLink.hover();

  // Hover over "Content Marketing" (more specific text match)
  const contentMarketingLink = page.getByRole('link', { name: /Content Marketing/i });
  await contentMarketingLink.hover();

  // Click on "Overview"
  const overviewLink = page.getByRole('link', { name: /Overview/i });
  await overviewLink.click();

  // Assert URL and title
  await expect(page).toHaveURL(/.*products\/contentmarketing\/overview.*/);
  await expect(page).toHaveTitle(/Optimizely Content Marketing Platform (CMP) | Optimizely Develope/i); // Expected title
});

