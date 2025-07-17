import { test, expect } from '@playwright/test';

test('Collect blog titles from Limited page num', async ({ page }) => {
  const startPage = 21;
  const endPage = 22;
  const allTitles: string[] = [];

  for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
    const url = `https://world.optimizely.com/blogs/?type=blog&pageNum=${pageNum}`;
    console.log(`🔍 Visiting Page ${pageNum}: ${url}`);
    await page.goto(url);
    await page.waitForLoadState('domcontentloaded');

    const titles = await page.locator('.blog-list-title').allTextContents();
    titles.forEach((title, i) => {
      console.log(`  ${i + 1}: ${title}`);
      expect(title.length).toBeGreaterThan(0);
    });

    allTitles.push(...titles);
  }

  console.log(`\n✅ Finished collecting from page ${startPage} to ${endPage}`);
  console.log('\n📋 All Collected Blog Titles:');
  allTitles.forEach((title, i) => console.log(`${i + 1}. ${title}`));
});
