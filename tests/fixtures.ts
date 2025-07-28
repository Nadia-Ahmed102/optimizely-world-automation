import { test as base, expect, Page } from '@playwright/test';
import { ProductPage } from "../Pages/ProductPage";
import { ProductMigrationPage } from '../Pages/ProductMigrationPage';
import { LoginPage } from '../Pages/LogIn';


// Extend the base test to include ProductPage in the test context
type TestFixtures = {
  productPage: ProductPage;
  productMigrationPage: ProductMigrationPage;
  loginPage: LoginPage; // Assuming you meant to use ProductMigrationPage here
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

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

});


export { expect };
