import { test, expect } from "./fixtures";
import { ProductWebExpPage } from "../Pages/ProductWebExpPage";
import { CsvReader } from "../Utils/CsvReader"; // Adjust the path as needed

let productWebExpPage: ProductWebExpPage;

test.beforeEach(async ({ page }) => {
  // Initialize the page object and nav to home
  productWebExpPage = new ProductWebExpPage(page);
  await productWebExpPage.navigateToHome();
});

test("Check if the user can navigate to the product > web-experimentation > overview page", async () => {
  await productWebExpPage.navigateToWebExpOverviewPage();
  // Basic smoke assertion
  await expect(productWebExpPage.page).toHaveURL(/\/overview\/?$/);
  await expect(productWebExpPage.promoBlockPageTitle).toBeVisible();
  await expect(productWebExpPage.promoBlockPageTitle).toHaveText(
    "WEB EXPERIMENTATION"
  );
});

test("Check if the user can navigate to the product > web-experimentation > features page", async () => {
  await productWebExpPage.navigateToWebExpFeaturesPage();
  // Basic smoke assertion
  await expect(productWebExpPage.page).toHaveURL(/\/features\/?$/);
  await expect(productWebExpPage.carouselH1Title).toBeVisible();
  await expect(productWebExpPage.carouselH1Title).toHaveText(
    "Web Experimentation"
  );
});

test("Check expando behavior on Web Exp Features Page - Getting Started Section", async () => {
  await productWebExpPage.navigateToWebExpFeaturesPage();
  // Check if the expandos are expanded by default
  await expect(productWebExpPage.expando1Parent).toHaveAttribute(
    "aria-expanded",
    "true"
  );
  await expect(productWebExpPage.expando2Parent).toHaveAttribute(
    "aria-expanded",
    "true"
  );
  //Check if expando headings are visible (should always be visible)
  await expect(productWebExpPage.expando1H4).toBeVisible();
  await expect(productWebExpPage.expando2H4).toBeVisible();
  //Check if expando list items are visible (should be visible when expanded)
  await expect(productWebExpPage.expando1AccordionContent).toBeVisible();
  await expect(productWebExpPage.expando2AccordionContent).toBeVisible();

  // Click to collapse the expandos
  await productWebExpPage.expando1.click();
  await productWebExpPage.expando2.click();

  // Check if the expandos are now collapsed
  await expect(productWebExpPage.expando1Parent).toHaveAttribute(
    "aria-expanded",
    "false"
  );
  await expect(productWebExpPage.expando2Parent).toHaveAttribute(
    "aria-expanded",
    "false"
  );
  //Check if expando headings are visible (should always be visible)
  await expect(productWebExpPage.expando1H4).toBeVisible();
  await expect(productWebExpPage.expando2H4).toBeVisible();
  //Check that expando list items are NOT visible
  await expect(productWebExpPage.expando1AccordionContent).not.toBeVisible();
  await expect(productWebExpPage.expando2AccordionContent).not.toBeVisible();
});

test("Check that Learn more about Optimizely's Web Experimentation tab container defaults to Documentation and the other 2 tabs work", async () => {
  await productWebExpPage.navigateToWebExpFeaturesPage();
  /* use these as locators for the tab parents:
  #tabContainer-5250605914521479002 > ul > li:nth-child(1)
  #tabContainer-5250605914521479002 > ul > li:nth-child(2)
  #tabContainer-5250605914521479002 > ul > li:nth-child(3)
  */
  await expect(productWebExpPage.tabContainerItems.first()).toBeVisible();
  await expect(productWebExpPage.tabContainerItems.first()).toHaveClass(
    /tabNavItem ui-tabs-tab ui-corner-top ui-state-default ui-tab ui-tabs-active ui-state-active/
  );
  //TODO: add the rest of the test logic to ensure that clicking thru the tab items changes the content below and that the tab labels change their classes to show which is active
});

test("Check that tab container has slider/arrow controls that scrolls the tab content", async () => {
  await productWebExpPage.navigateToWebExpFeaturesPage();
});
