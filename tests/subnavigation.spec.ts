// tests/subnavigation.spec.ts
import { test, expect } from '@playwright/test';
import { readMenuItemsFromCSV } from '../Functions/readCSV';
import path from 'path';
console.log(readMenuItemsFromCSV);

test('Validate all subnavigation menus are visited', async ({ page }) => {
    test.setTimeout(30000000);
    const csvPath = path.resolve(__dirname, '../testData/subnavigationBarTexts.csv');
    const expectedMenus = readMenuItemsFromCSV(csvPath);

    await page.goto('https://world.optimizely.com/');

    const menuItems = await page.locator('nav ul li > a').all();
    const actualMenus: string[] = [];

    for (const menuItem of menuItems) {
        const text = await menuItem.textContent();
        if (text) {
            const cleanText = text.trim();
            actualMenus.push(cleanText);
            console.log(`Visiting menu: ${cleanText}`);
            await page.waitForTimeout(250);
        }
    }

    const missingMenus = expectedMenus.filter(expected => !actualMenus.includes(expected));

    if (missingMenus.length > 0) {
        console.error('\n Missing navigation items:');
        missingMenus.forEach(item => console.error(`- ${item}`));
        throw new Error(`${missingMenus.length} expected item(s) not found.`);
    } else {
        console.log('\n✅ All expected navigation items were validated.');
    }
});
