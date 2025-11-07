import { test, expect } from "@playwright/test";
import { omvpPage } from "../../Pages/omvpPage";

test.beforeEach(async ({ page }) => {
  // Navigate to the OMVP Benefits page before each test
  await page.goto("https://world.optimizely.com/community/omvp/benefits/");
});

test("OMVP benefits page should have expected title", async ({ page }) => {
  await expect(page).toHaveTitle("Benefits | Optimizely Developer Community");
});

test("OMVP Benefits page breadcrumbs should be correct", async ({ page }) => {
  // Home breadcrumb
  const homeBreadcrumb = page.locator('#breadcrumbs > span:nth-child(1) > a:nth-child(1)');
  await expect(homeBreadcrumb).toBeVisible();
  await expect(homeBreadcrumb).toHaveText('Home');
  await expect(homeBreadcrumb).toHaveAttribute('href', '/');

  // Community breadcrumb
  const communityBreadcrumb = page.locator('#breadcrumbs > a:nth-child(2)');
  await expect(communityBreadcrumb).toBeVisible();
  await expect(communityBreadcrumb).toHaveText('Community');
  await expect(communityBreadcrumb).toHaveAttribute('href', '/community/');

  // OMVP breadcrumb
  const omvpBreadcrumb = page.locator('#breadcrumbs > a:nth-child(3)');
  await expect(omvpBreadcrumb).toBeVisible();
  await expect(omvpBreadcrumb).toHaveText('OMVP');
  await expect(omvpBreadcrumb).toHaveAttribute('href', '/community/omvp/');
});

test("OMVP Benefits page header should contain expected texts", async ({ page }) => {
  const header = page.locator('.carousel-content');

  // Verify the header is visible
  await expect(header).toBeVisible();

  // Verify it contains "OMVP Benefits"
  await expect(header).toContainText('OMVP Benefits');

  // Verify it contains "Perks and Privileges of being an OMVP"
  await expect(header).toContainText('Perks and Privileges of being an OMVP');
});

test("OMVP Benefits page 'Swag' accordion should expand and show correct text", async ({ page }) => {
  // Locate the "Swag" accordion header
  const swagAccordion = page.locator('#heading-accordion-276574-1 > div:nth-child(1) > div:nth-child(2)');

  // Click to expand the accordion
  await swagAccordion.click({ force: true });

  // Verify the expanded text
  const swagText = page.locator('#accordion-276574-1 > div:nth-child(1) > p:nth-child(1)');
  await expect(swagText).toBeVisible();
  await expect(swagText).toHaveText(
    "The distinguished Optimizely swag as well as the OMVP trophy are some examples of the swag that OMVPs love."
  );
});

test("OMVP Benefits page Application and Nomination CTAs should redirect correctly", async ({ page }) => {
  // Application CTAs
  const applyTechCTA = page.locator('div.adjustheight-75:nth-child(1) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(3) > a:nth-child(1)');
  await expect(applyTechCTA).toBeVisible();
  await expect(applyTechCTA).toHaveText('Apply for a Technology OMVP now');
  await expect(applyTechCTA).toHaveAttribute('href', 'https://forms.office.com/r/0Xim01z897');

  const applyStrategyCTA = page.locator('div.adjustheight-75:nth-child(1) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(4) > a:nth-child(1)');
  await expect(applyStrategyCTA).toBeVisible();
  await expect(applyStrategyCTA).toHaveText('Apply for a Strategy OMVP now');
  await expect(applyStrategyCTA).toHaveAttribute('href', 'https://forms.office.com/r/ss0S8q7n34');

  // Nomination CTA
  const nominateCTA = page.locator('div.adjustheight-75:nth-child(2) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(3) > a');
  await expect(nominateCTA).toBeVisible();
  await expect(nominateCTA).toHaveText('Nominate now');
  await expect(nominateCTA).toHaveAttribute('href', 'https://forms.office.com/r/7crUwMLJPh');
});