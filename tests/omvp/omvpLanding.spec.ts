import { test, expect } from "@playwright/test";
import { omvpPage } from "../../Pages/omvpPage";

test.beforeEach(async ({ page }) => {
  const omvp = new omvpPage(page);
  // Navigate to the OMVP page before each test
  await page.goto("https://world.optimizely.com/community/omvp/");
});

test("OMVP page should have expected title", async ({ page }) => {
  await expect(page).toHaveTitle(/OMVP | Optimizely Developer Community/);
});

test("Test accordion text changes on click", async ({ page }) => {
  const omvp = new omvpPage(page);
  const firstAccordion = omvp.firstAccordionFirstText;
  await expect(firstAccordion).toBeVisible();
  await omvp.firstAccordionRightArrow.click();
  const secondAccordion = omvp.firstAccordionSecondText;
  await expect(secondAccordion).toBeVisible();
  await expect(firstAccordion).not.toBeVisible();
});

test("Click first faq", async ({ page }) => {
  //TODO: move this locator to pom class, add some assertions about the visibility of the faq text
  await page
    .locator("#heading-accordion-277086-1 > div > div.symbol > div.plusminus")
    .click();
});
