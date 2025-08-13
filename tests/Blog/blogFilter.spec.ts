import { test, expect } from '@playwright/test';

test('Print first blogger name or blog title for each filter', async ({ page }) => {
  await page.goto('https://world.optimizely.com/blogs/');

  const filters = await page.locator('ul.nav.nav-pills li a');
  const filterCount = await filters.count();

  for (let i = 0; i < filterCount; i++) {
    const filter = filters.nth(i);
    const filterName = (await filter.textContent())?.trim();
    console.log(`\nFilter: ${filterName}`);

    // Click the filter
    await filter.click();

    // Wait for either blogger list or blog list to appear
    const bloggerLocator = page.locator('#bloggers .font-weight-bold a').first();
    const blogLocator = page.locator('.blog-list-title a').first();

    // Wait for either to be visible (timeout 10s)
    try {
      await Promise.race([
        bloggerLocator.waitFor({ state: 'visible', timeout: 10000 }),
        blogLocator.waitFor({ state: 'visible', timeout: 10000 })
      ]);
    } catch {
      console.log('No content loaded for this filter.');
      continue;
    }

    // Check for blogger first
    if (await bloggerLocator.count() > 0) {
      const name = (await bloggerLocator.textContent())?.trim();
      console.log(`First blogger: ${name}`);
    } else if (await blogLocator.count() > 0) {
      const title = (await blogLocator.textContent())?.trim();
      console.log(`First blog title: ${title}`);
    }
  }

  console.log('\nAll filters processed.');
});
