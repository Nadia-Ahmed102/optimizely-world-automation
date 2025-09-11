import { test as base, expect, Page } from "@playwright/test";
import { ProductPage } from "../Pages/ProductPage";
import { ProductMigrationPage } from "../Pages/ProductMigrationPage";
import { CmsOverviewPage } from "../Pages/CmsOverviewPage";
import { LoginPage } from "../Pages/LoginPage";

// Extend the base test to include ProductPage in the test context
type TestFixtures = {
  productPage: ProductPage;
  productMigrationPage: ProductMigrationPage; // Assuming you meant to use ProductMigrationPage here
  loginPage: LoginPage;
  cmsOverviewPage: CmsOverviewPage;
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

  cmsOverviewPage: async ({ page }, use) => {
    const cmsOverviewPage = new CmsOverviewPage(page);
    await use(cmsOverviewPage);
  },
});

export { expect };
