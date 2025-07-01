import { test, expect } from '@playwright/test';

test('all blog items have visible titles', async ({ page }) => {
  await page.goto('/blogs/'); // adjust URL if needed
  const blogTitles = page.locator('.blog-list-title');

  const count = await blogTitles.count();
  expect(count).toBeGreaterThan(0);

  await expect(blogTitles.first()).toBeVisible();
});

test('get and print all blog titles', async ({ page }) => {
  await page.goto('/blogs/'); // adjust URL if needed
  const blogTitles = page.locator('.blog-list-title');

  const titles = await blogTitles.allTextContents();

  console.log('Blog Titles:');
  titles.forEach((title, index) => {
    console.log(`${index + 1}: ${title}`);
  });

  expect(titles.length).toBeGreaterThan(0);
});