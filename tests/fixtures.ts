import { test as base, expect, Page } from '@playwright/test';
import { ProductPage } from "../Pages/ProductPage";
import { ProductMigrationPage } from '../Pages/ProductMigrationPage';


// Extend the base test to include ProductPage in the test context
type TestFixtures = {
  productPage: ProductPage;
  productMigrationPage: ProductMigrationPage;
};

export const test = base.extend<TestFixtures>({
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);

  },
  productMigrationPage: async ({ page }, use) => {
    const productMigrationPage = new ProductMigrationPage(page);
    await use(productMigrationPage);
  },

});


export { expect };
