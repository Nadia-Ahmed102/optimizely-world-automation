import { test, expect } from '@playwright/test';

test('get and print all blog titles from all pages', async ({ page }) => {
    test.setTimeout(300_000);
    await page.goto('https://world.optimizely.com/articles/'); // full URL

    let allTitles: string[] = [];
    let pageNum = 1;

    while (true) {
        console.log(`📄 Page ${pageNum}`);

        // Wait for blog titles to load
        await page.waitForSelector('.blog-list-title');

        // Get titles from current page
        const titles = await page.locator('.blog-list-title').allTextContents();
        titles.forEach((title, index) => {
            console.log(`${allTitles.length + index + 1}: ${title}`);
        });
        allTitles.push(...titles);

        // Try to find the "Next" button
        const nextBtn = page.locator('a.nextButton');

        if (await nextBtn.isVisible()) {
            await nextBtn.click();
            //await page.waitForLoadState('load');
            pageNum++;
        } else {
            break; // No next page, end loop
        }
    }

    console.log(`✅ Total blog titles found: ${allTitles.length}`);
    expect(allTitles.length).toBeGreaterThan(0);
});
