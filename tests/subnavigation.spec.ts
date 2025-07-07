import { test, expect } from '@playwright/test';

import { defineConfig } from '@playwright/test';

export default defineConfig({
    timeout: 300000, // 30 seconds for each test
});

test('Navigate through subnavigation menus on Optimizely World', async ({ page }) => {
    test.setTimeout(30000000); // ⏱️ 30 seconds for this test

    await page.goto('https://world.optimizely.com/');
    await page.waitForSelector('nav');

    const menuItems = await page.locator('nav ul li > a').all();

    for (const menuItem of menuItems) {
        const text = await menuItem.textContent();
        console.log(`Visiting menu: ${text?.trim()}`);

        await menuItem.hover();
        await page.waitForTimeout(1000); // wait for submenu

        const submenuLinks = await menuItem.locator('xpath=..').locator('ul a');
        const count = await submenuLinks.count();

        
        
    }
});

