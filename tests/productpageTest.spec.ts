import { test, expect } from './fixtures';
import { ProductPage } from "../Pages/ProductPage";
import { CsvReader } from "./utils/CsvReader";

let productPage: ProductPage;

test.beforeEach(async ({ page }) => {
  productPage = new ProductPage(page);
  await productPage.navigateToOptimizelyWorldHomepage();
});

test('Verify if the user can navigate to the product page', async () => {
  await productPage.clickOnProductNavMenu();

  // Basic smoke assertion
  await expect(productPage.page).toHaveURL(/\/products\/?$/);
});

test('Verify carousel heading text on Product Page', async () => {
  await productPage.clickOnProductNavMenu();

  const headingText = await productPage.getCarouselHeadingText(); // You must define this method in ProductPage class
  expect(headingText?.trim()).toBe('Unlock Digital Potential');
});

test('Verify all carousel headings match CSV data', async () => {
  await productPage.clickOnProductNavMenu();

  const actualHeadings = await productPage.getCarouselHeadings();
  const expectedHeadings = CsvReader.readColumnFromCsv('ProductPageItems.csv');

  for (const heading of actualHeadings) {
    expect(expectedHeadings).toContain(heading);
  }
});
test('Verify accordion titles match expected values from CSV', async () => {

  const actualTitles = await productPage.getAccordionTitles();
  const expectedTitles = CsvReader.readColumnFromCsv('AccordionHeadingItems.csv');

  for (const title of actualTitles) {
    expect(expectedTitles).toContain(title);
  }
});