import { test, expect } from '@playwright/test';

test('loop through all top-level nav items and validate links', async ({ page }) => {
  test.setTimeout(300_000);

  await page.goto('https://world.optimizely.com/');

  // Locate all top-level menu <li> items under navbar
  const topLevelItems = page.locator('ul.navbar-nav.mr-auto > li.nav-item.dropdown');

  const topLevelCount = await topLevelItems.count();

  for (let i = 0; i < topLevelCount; i++) {
    const topItem = topLevelItems.nth(i);
    const topLink = topItem.locator('a').first();
    const topText = (await topLink.innerText()).trim();

    // Skip "Register" and "Log in"
    if (/register|log in/i.test(topText)) continue;

    console.log(`🔹 Top level: ${topText}`);

    await topItem.hover();

    const secondLevelLinks = topItem.locator('ul.dropdown-menu.second > li.nav-item.dropdown > a');
    const secondCount = await secondLevelLinks.count();

    for (let j = 0; j < secondCount; j++) {
      await topItem.hover(); // re-hover to keep menu open
      const secondLink = secondLevelLinks.nth(j);
      const secondText = (await secondLink.innerText()).trim();
      console.log(`  2nd level: ${secondText}`);

      await secondLink.hover();

      const thirdLevelLinks = secondLink.locator('xpath=following-sibling::ul[contains(@class,"dropdown-menu third")]//a');
      const thirdCount = await thirdLevelLinks.count();

      if (thirdCount > 0) {
        for (let k = 0; k < thirdCount; k++) {
          await topItem.hover();
          await secondLink.hover();
          const thirdLink = thirdLevelLinks.nth(k);
          const thirdText = (await thirdLink.innerText()).trim();
          console.log(`    --> 3rd level: ${thirdText}`);

          await thirdLink.click();
          const url = page.url();
          console.log(`    🌐 Landed on: ${url}`);
          expect(url).toContain('optimizely.com');

          await page.goto('https://world.optimizely.com/');
        }
      } else {
        await secondLink.click();
        const url = page.url();
        console.log(`    🌐 Landed on: ${url}`);
        expect(url).toContain('optimizely.com');

        await page.goto('https://world.optimizely.com/');
      }
    }
  }

  console.log('✅ Finished all top-level menu validations.');
});
