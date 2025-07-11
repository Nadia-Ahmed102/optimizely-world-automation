import { test as base, expect, Page } from '@playwright/test';
import { ProductPage } from "./Pages/ProductPage";

// Extend the base test to include ProductPage in the test context
type TestFixtures = {
  productPage: ProductPage;
};

export const test = base.extend<TestFixtures>({
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
});

export { expect };
