import {test, expect} from '@playwright/test';
import {carouselLocator} from '../../support/locators';

test.describe('Carousel Block Tests', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('https://world.optimizely.com/'); 
  });

  test('Top Carousel block is visible', async ({page}) => {
    const carouselBlock = await page.locator(carouselLocator.carouselItmes).nth(0);
    await expect(carouselBlock).toBeVisible();
  });

  test('Carousel block has correct number of items', async ({page}) => {
    await page.waitForLoadState('networkidle');
    const carouselItems = await page.locator(carouselLocator.carouselItmes);
    const itemCount = await carouselItems.count();
    console.log(`Number of carousel items: ${itemCount}`);
    expect(itemCount).toBeGreaterThan(1); 
  });

  test('Verify all carousel links are valid', async ({page}) => {
    await page.waitForLoadState('networkidle');
    const carouselItems = await page.locator(carouselLocator.carouselButton);
    const itemCount = await carouselItems.count();
    console.log(`Number of carousel items: ${itemCount}`);

    for (let i = 0; i < itemCount -1 ; i++) {
      const link = await carouselItems.nth(i).getAttribute('href');
      await expect(link).toBeTruthy(); 
      try{ 
          if (typeof link === 'string') {             
          const response = await page.goto(link);
          await expect(response?.status()).toBe(200); 
          await page.goBack(); }
      }
        catch (error) {
          // Handle the error
          console.error("An error occurred:", `Link for item ${i} is not a string: ${link}`);}
    }
  });
  
});


