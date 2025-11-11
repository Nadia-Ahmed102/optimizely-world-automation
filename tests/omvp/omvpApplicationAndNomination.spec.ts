import { test, expect } from "@playwright/test";
import { omvpApplicationAndNomination } from "../../Pages/omvpApplicationAndNomination";

test.beforeEach(async ({ page }) => {
  const omvp = new omvpApplicationAndNomination(page);
  await omvp.goto();
});

test("OMVP Application & Nominations page should have expected title", async ({ page }) => {
  await expect(page).toHaveTitle(/Application and Nomination | Optimizely Developer Community/);
});

test("OMVP Benefits page breadcrumbs should be correct", async ({ page }) => {
  const omvp = new omvpApplicationAndNomination(page);

  await expect(omvp.homeBreadcrumb).toBeVisible();
  await expect(omvp.homeBreadcrumb).toHaveText("Home");
  await expect(omvp.homeBreadcrumb).toHaveAttribute("href", "/");

  await expect(omvp.communityBreadcrumb).toBeVisible();
  await expect(omvp.communityBreadcrumb).toHaveText("Community");
  await expect(omvp.communityBreadcrumb).toHaveAttribute("href", "/community/");

  await expect(omvp.omvpBreadcrumb).toBeVisible();
  await expect(omvp.omvpBreadcrumb).toHaveText("OMVP");
  await expect(omvp.omvpBreadcrumb).toHaveAttribute("href", "/community/omvp/");
});

test("OMVP Application & Nomination page hero text should be correct", async ({ page }) => {
  const omvp = new omvpApplicationAndNomination(page);

  await expect(omvp.heroText).toBeVisible();
  await expect(omvp.heroText).toHaveText(
    "Optimizely Most Valuable Professionals\nApplication and Nomination"
  );
});

test("OMVP Benefits page Application and Nomination CTAs should redirect correctly", async ({ page }) => {
  const omvp = new omvpApplicationAndNomination(page);

  await expect(omvp.applyTechCTA).toBeVisible();
  await expect(omvp.applyTechCTA).toHaveText("Apply for a Technology OMVP now");
  await expect(omvp.applyTechCTA).toHaveAttribute("href", "https://forms.office.com/r/0Xim01z897");

  await expect(omvp.applyStrategyCTA).toBeVisible();
  await expect(omvp.applyStrategyCTA).toHaveText("Apply for a Strategy OMVP now");
  await expect(omvp.applyStrategyCTA).toHaveAttribute("href", "https://forms.office.com/r/ss0S8q7n34");

  await expect(omvp.nominateCTA).toBeVisible();
  await expect(omvp.nominateCTA).toHaveText("Nominate now");
  await expect(omvp.nominateCTA).toHaveAttribute("href", "https://forms.office.com/r/7crUwMLJPh");
});

test("OMVP Application & Nomination page FAQ accordion should expand and show correct text", async ({ page }) => {
  const omvp = new omvpApplicationAndNomination(page);

  await expect(omvp.faqQuestion).toBeVisible();
  await expect(omvp.faqQuestion).toHaveText("When will I know if I've been accepted?");

  await omvp.faqQuestion.click({ force: true });

  await expect(omvp.faqAnswer).toBeVisible();
  await expect(omvp.faqAnswer).toHaveText(
    "You can expect to receive correspondence of your acceptance or denial within 4 to 6 weeks of the deadline."
  );
});
