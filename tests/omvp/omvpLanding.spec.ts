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
  const omvp = new omvpPage(page);
  await expect(omvp.firstFAQ).toBeVisible();
  await expect(omvp.firstFAQ).not.toHaveClass(/show/);
  await omvp.firstFAQToggle.click();
  await expect(omvp.firstFAQ).toHaveClass(/show/);
  await expect(omvp.firstFAQ).toContainText(
    "Once an applicant applies, they can expect to be notified when their application has been received. Once the application period closes, the selection process begins. Optimizely chooses OMVPs based upon the application requirements and the OMVP will be notified of acceptance or denial of entry into the program, as well as their rank/tier. The process can take about a month to complete."
  );
});
