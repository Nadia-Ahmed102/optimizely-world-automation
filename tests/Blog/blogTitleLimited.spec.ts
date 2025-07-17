import { test, expect } from '@playwright/test';

test('Collect blog titles from page 11 to 20', async ({ page }) => {
  const startPage = 11;
  const endPage = 20;
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
