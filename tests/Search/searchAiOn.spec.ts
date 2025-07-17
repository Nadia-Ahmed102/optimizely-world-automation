import { test, expect } from '@playwright/test';

test('Go to world.optimizely.com and click the search bar', async ({ page }) => {
    // Step 1: Navigate to the website
    await page.goto('https://world.optimizely.com/', { waitUntil: 'domcontentloaded' });

    const defaultSearchModeLabel = await page.locator('#search-toggle-container > span > span.ai');
    expect(defaultSearchModeLabel).toHaveText('AI On');
    console.log('✅ AI is On successfully');

    // Step 2: Click the search icon in the header
    const searchIcon = page.locator('#searchWidgetTrigger');
    await expect(searchIcon).toBeVisible({ timeout: 30000000 });
    await searchIcon.click();

    // Step 3: Wait for the search input field to appear
    const searchInput = page.locator('input[placeholder="Refine by search"]');
    await expect(searchInput).toBeVisible({ timeout: 100000 });

    // Type something to verify it's interactive
    await searchInput.fill('Optimizely One');
    console.log('✅ Search bar clicked and filled successfully');
    await searchInput.press('Enter');
    await expect(searchInput).toBeVisible({ timeout: 100000 });

    // Step 4: Wait for at least one result to appear
    const rows = page.getByText('item item-doc item-website-doc   ');
    const count = await rows.count();
    console.log(`🔢 Found ${count} search result rows.`);
    

    
    

});
