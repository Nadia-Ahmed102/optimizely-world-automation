import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://world.optimizely.com/');

    // Wait for the span with text "AI Button" to be visible
    const aiToggle = page.locator('span:text("AI On")');
    test.setTimeout(3000000);
    await expect(aiToggle).toBeVisible();

    //Click the span to turn AI "Off"
    await aiToggle.click();

    console.log('✅ AI is Off successfully');

    const searchInput = page.locator('input[placeholder="Search World"]');
    await searchInput.click();
    await searchInput.fill('Optimizely');
    await page.keyboard.press('Enter');
    test.setTimeout(3000000);

    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');
    



});