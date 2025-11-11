import { test, expect } from "@playwright/test";
import { OmvpBenefitsPage } from "../../Pages/omvpBenefits";

test.beforeEach(async ({ page }) => {
  const omvpBenefits = new OmvpBenefitsPage(page);
  await omvpBenefits.goto();
});

test("OMVP benefits page should have expected title", async ({ page }) => {
  await expect(page).toHaveTitle("Benefits | Optimizely Developer Community");
});

test("OMVP Benefits page breadcrumbs should be correct", async ({ page }) => {
  const omvpBenefits = new OmvpBenefitsPage(page);

  await expect(omvpBenefits.homeBreadcrumb).toBeVisible();
  await expect(omvpBenefits.homeBreadcrumb).toHaveText("Home");
  await expect(omvpBenefits.homeBreadcrumb).toHaveAttribute("href", "/");

  await expect(omvpBenefits.communityBreadcrumb).toBeVisible();
  await expect(omvpBenefits.communityBreadcrumb).toHaveText("Community");
  await expect(omvpBenefits.communityBreadcrumb).toHaveAttribute("href", "/community/");

  await expect(omvpBenefits.omvpBreadcrumb).toBeVisible();
  await expect(omvpBenefits.omvpBreadcrumb).toHaveText("OMVP");
  await expect(omvpBenefits.omvpBreadcrumb).toHaveAttribute("href", "/community/omvp/");
});

test("OMVP Benefits page hero text should contain expected texts", async ({ page }) => {
  const omvpBenefits = new OmvpBenefitsPage(page);

  await expect(omvpBenefits.header).toBeVisible();
  await expect(omvpBenefits.header).toContainText("OMVP Benefits");
  await expect(omvpBenefits.header).toContainText("Perks and Privileges of being an OMVP");
});

test("OMVP Benefits page 'Swag' accordion should expand and show correct text", async ({ page }) => {
  const omvpBenefits = new OmvpBenefitsPage(page);

  await omvpBenefits.swagAccordion.click({ force: true });

  await expect(omvpBenefits.swagText).toBeVisible();
  await expect(omvpBenefits.swagText).toHaveText(
    "The distinguished Optimizely swag as well as the OMVP trophy are some examples of the swag that OMVPs love."
  );
});

test("OMVP Benefits page Application and Nomination CTAs should redirect correctly", async ({ page }) => {
  const omvpBenefits = new OmvpBenefitsPage(page);

  await expect(omvpBenefits.applyTechCTA).toBeVisible();
  await expect(omvpBenefits.applyTechCTA).toHaveText("Apply for a Technology OMVP now");
  await expect(omvpBenefits.applyTechCTA).toHaveAttribute("href", "https://forms.office.com/r/0Xim01z897");

  await expect(omvpBenefits.applyStrategyCTA).toBeVisible();
  await expect(omvpBenefits.applyStrategyCTA).toHaveText("Apply for a Strategy OMVP now");
  await expect(omvpBenefits.applyStrategyCTA).toHaveAttribute("href", "https://forms.office.com/r/ss0S8q7n34");

  await expect(omvpBenefits.nominateCTA).toBeVisible();
  await expect(omvpBenefits.nominateCTA).toHaveText("Nominate now");
  await expect(omvpBenefits.nominateCTA).toHaveAttribute("href", "https://forms.office.com/r/7crUwMLJPh");
});
