import { test, expect } from './fixtures';
import { ProductMigrationPage } from "../Pages/ProductMigrationPage";
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
  const actualHeadings = await productMigrationPage.getCarouselHeadingText();
  const expectedHeadings = CsvReader.readColumnFromCsv('ProductMigrationPageItems.csv');

    for (const heading of actualHeadings) {
      expect(expectedHeadings).toContain(heading);
     }
  });

  test('Verify content and behavior of accordion items', async () => {
    await productMigrationPage.navToProductMigrationPage();

    // Verify accordion item 1
    await expect(productMigrationPage.accordionItem1).toBeVisible();
    const item1Text = await productMigrationPage.accordionItem1.textContent();
    expect(item1Text).toContain('Will it require a new contract?');

    // Verify accordion item 2
    await expect(productMigrationPage.accordionItem2).toBeVisible();
    const item2Text = await productMigrationPage.accordionItem2.textContent();
    expect(item2Text).toContain('Will I incur additional cost?');

    // Verify accordion item 3
    await expect(productMigrationPage.accordionItem3).toBeVisible();
    const item3Text = await productMigrationPage.accordionItem3.textContent();
    expect(item3Text).toContain('Will I be able to retain my old data?');

    // Verify accordion item 4
    await expect(productMigrationPage.accordionItem4).toBeVisible();
    const item4Text = await productMigrationPage.accordionItem4.textContent();
    expect(item4Text).toContain('What is the overall process?');
  });
