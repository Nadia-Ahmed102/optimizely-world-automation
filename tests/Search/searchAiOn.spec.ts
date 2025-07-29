import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://world.optimizely.com/');

    const defaultSearchModeLabel = await page.locator('#search-toggle-container > span > span.ai');
    expect(defaultSearchModeLabel).toHaveText('AI On');
    console.log('✅ AI is On successfully');

    await page.getByRole('textbox', { name: 'Refine by search' }).click();
    await page.getByRole('searchbox', { name: 'Search' }).fill('Optimizely');
    await page.getByRole('searchbox', { name: 'Search' }).press('Tab');
    await page.getByRole('button', { name: 'Clear' }).press('Shift+Tab');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');
    await page.getByRole('searchbox', { name: 'Search' }).press('Enter');
    //test.setTimeout(3000000);
    await page.waitForTimeout(20000);
    await page.waitForLoadState('networkidle');
    await page.getByRole('searchbox', { name: 'Search' }).press('Enter');//first search shows: Problem loading results so try 2nd time
    //await page.waitForTimeout(20000);
    test.setTimeout(3000000);


    // 3. Wait for search results to load
    await page.waitForLoadState('networkidle'); // optional but helpful
    await page.waitForTimeout(20000); // may need delay for rendering

    

    //const searchTitles = page.locator('.results-list  ');
    const results = page.locator('.header');
    const titles = await results.allTextContents();

    console.log('Search Result Titles:'); // to show first few results
    titles.forEach((title: any, index: 4) => {

        console.log(`${index + 1}: ${title}`);
    });
    
  

});
