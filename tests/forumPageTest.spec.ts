import { test, expect } from '@playwright/test';

test('Extract and print forum table from Optimizely World', async ({ page }) => {
    // 1. Go to the Optimizely Forum page
    await page.goto('https://world.optimizely.com/forum/');

    // 2. Wait for the forum table to be visible
    const forumTable = page.locator('table.forum-table');
    await expect(forumTable).toBeVisible();
    test.setTimeout(3000000);

    // 3. Get all rows from the table body
    const rows = await forumTable.locator('tr').elementHandles();

    console.log('📋 Forum Table Contents:\n');

    for (const row of rows) {
        const cells = await row.$$('th, td');
        const cellTexts = await Promise.all(cells.map(cell => cell.innerText()));

        console.log(cellTexts.join(' | ')); // Print row as pipe-separated
    }
});
