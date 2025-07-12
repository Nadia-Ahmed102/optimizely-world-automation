import { test, expect } from './fixtures';
import { ProductPage } from "./Pages/ProductPage";

let productPage: ProductPage;

test.beforeEach(async ({ page }) => {
  productPage = new ProductPage(page);
  await productPage.navigateToOptimizelyWorldHomepage();
});

test('Check if the user can navigate to the product page', async () => {
  await productPage.clickOnProductNavMenu();

  // Basic smoke assertion
  await expect(productPage.page).toHaveURL(/\/products\/?$/);
});

test('Verify carousel heading text on Product Page', async () => {
  await productPage.clickOnProductNavMenu();

  const headingText = await productPage.getCarouselHeadingText(); // You must define this method in ProductPage class
  expect(headingText?.trim()).toBe('Unlock Digital Potential');
});