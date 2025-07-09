import { test, expect } from '@playwright/test';

test('Blog pagination and non-empty title validation (limited pages)', async ({ page }) => {
  const maxPagesToCheck = 10; // 🔢 Adjust this number as needed
  let currentPage = 1;

  await page.goto('https://world.optimizely.com/blogs/');

  while (currentPage <= maxPagesToCheck) {
    console.log(`🔍 Checking Page ${currentPage}`);

    const blogTitles = page.locator('.blog-list-title');
    const titles = await blogTitles.allTextContents();

   // ✅ Ensure no blog title is empty
titles.forEach((title, index) => {
  console.log(`  ${index + 1}: ${title}`);
  expect(title.length).toBeGreaterThan(0);
});

    // 👉 Try to go to next page if it exists
    const nextBtn = page.locator('a.nextButton');
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForLoadState('domcontentloaded');
      currentPage++;
    } else {
      console.log('✅ No more pages found. Exiting.');
      break;
    }
  }

  console.log(`✅ Done checking ${Math.min(currentPage, maxPagesToCheck)} pages.`);
});
