import { test, expect } from './fixtures';
import { ProductMigrationPage } from "./Pages/ProductMigrationPage";
import { CsvReader } from './utils/CsvReader'; // Adjust the path as needed

let productMigrationPage: ProductMigrationPage;

test.beforeEach(async ({ page }) => {
  productMigrationPage = new ProductMigrationPage(page);
  await productMigrationPage.navigateToOptimizelyWorldHomepage();
});

test('Check if the user can navigate to the product > migration page', async () => {
  await productMigrationPage.navToProductMigrationPage();

  // Basic smoke assertion
  await expect(productMigrationPage.page).toHaveURL(/\/product-migration\/?$/);
});

test('Verify carousel heading text on Product Page', async () => {
  await productMigrationPage.navToProductMigrationPage();

  const headingText = await productMigrationPage.getCarouselHeadingText(); // You must define this method in ProductPage class
  expect(headingText?.trim()).toBe('Product Migration');
});

test('Verify all carousel headings match CSV data', async () => {
  await productMigrationPage.navToProductMigrationPage();

  const actualHeadings = ['a','b'];//await productMigrationPage.getCarouselHeadingText();
  const expectedHeadings = CsvReader.readColumnFromCsv('ProductMigrationPageItems.csv');

    for (const heading of actualHeadings) {
      expect(expectedHeadings).toContain(heading);
     }
  });
