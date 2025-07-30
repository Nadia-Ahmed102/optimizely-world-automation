import { test, expect } from '@playwright/test';

test('should filter content with relevant search', async ({ page }) => {
  // Step 1: Go to the page
  await page.goto('https://world.optimizely.com/', { waitUntil: 'domcontentloaded' });


  const TurnOffAI = await page.locator('.search-toggle');
  await TurnOffAI.click();
  expect(TurnOffAI).toHaveText('AI Off');

  // Step 2: Type in search input
  await page.fill('#inlineFormInputGroup', 'CMS');

  // Step 3: Trigger the search input
  await page.click('#epi-search');

//Blocker Starts from here
//Getting through Cloudflare Captcha but unable to automate the checkbox click
const frame = page.frameLocator('iframe[src*="challenges.cloudflare.com"]');

  // Wait for checkbox to be visible
  const checkbox = frame.locator('input[type="checkbox"]');
  await page.waitForTimeout(10000);
  await page.screenshot({ path: 'captcha-check.png' });
  await checkbox.waitFor({ state: 'visible' });
  await checkbox.check({ force: true });

   

  // Wait for navigation or filtering to complete
  await page.waitForLoadState('domcontentloaded');


   

  // Step 4: Assert URL contains query parameter 
  const url = page.url();
  expect(url).toContain('searchQuery=CMS');
  expect(url).toContain('sectionFilter=All+Content');

  // Step 5: Assert UI shows filtered category
  const filterTag = await page.locator("div[class='searchSidebar bg-epi-gray-box'] div a[class='active']").textContent();
  expect(filterTag).toContain('All Content');

 
});
