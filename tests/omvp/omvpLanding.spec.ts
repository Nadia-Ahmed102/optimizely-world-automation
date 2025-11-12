import { test, expect } from "@playwright/test";
import { omvpPage } from "../../Pages/omvpPage";

test.beforeEach(async ({ page }) => {
  const omvp = new omvpPage(page);
  await page.goto("https://world.optimizely.com/community/omvp/");
});

test("OMVP page should have expected title", async ({ page }) => {
  await expect(page).toHaveTitle(/OMVP | Optimizely Developer Community/);
});

test("Test accordion text changes on click", async ({ page }) => {
  const omvp = new omvpPage(page);
  await expect(omvp.firstAccordionFirstText).toBeVisible();
  await omvp.firstAccordionRightArrow.click();
  await expect(omvp.firstAccordionSecondText).toBeVisible();
  await expect(omvp.firstAccordionFirstText).not.toBeVisible();
});

test("OMVP page hero text should be correct", async ({ page }) => {
  const omvp = new omvpPage(page);
  await expect(omvp.heroText).toBeVisible();
  await expect(omvp.heroText).toHaveText("Optimizely Most Valuable Professionals");
});

test("OMVP Benefits page breadcrumbs should be correct", async ({ page }) => {
  const omvp = new omvpPage(page);
  await expect(omvp.homeBreadcrumb).toBeVisible();
  await expect(omvp.homeBreadcrumb).toHaveText("Home");
  await expect(omvp.homeBreadcrumb).toHaveAttribute("href", "/");

  await expect(omvp.communityBreadcrumb).toBeVisible();
  await expect(omvp.communityBreadcrumb).toHaveText("Community");
  await expect(omvp.communityBreadcrumb).toHaveAttribute("href", "/community/");
});

test("OMVP FAQ accordion should expand and show correct text", async ({ page }) => {
  const omvp = new omvpPage(page);
  await expect(omvp.faqQuestion).toBeVisible();
  await expect(omvp.faqQuestion).toHaveText("What to expect in a nomination or first-time application process?");
  await omvp.faqQuestion.click({ force: true });
  await expect(omvp.faqAnswer).toBeVisible();
  await expect(omvp.faqAnswer).toHaveText(
    "Once an applicant applies, they can expect to be notified when their application has been received. Once the application period closes, the selection process begins. Optimizely chooses OMVPs based upon the application requirements and the OMVP will be notified of acceptance or denial of entry into the program, as well as their rank/tier. The process can take about a month to complete."
  );
});

test("OMVP Benefits page Application and Nomination CTAs should redirect correctly", async ({ page }) => {
  const omvp = new omvpPage(page);
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

test("Explore OMVP section links should redirect correctly", async ({ page }) => {
  const omvp = new omvpPage(page);
  await expect(omvp.exploreBecomeMember).toHaveAttribute("href", "/community/omvp/become-a-member/");
  await expect(omvp.exploreBenefits).toHaveAttribute("href", "/community/omvp/benefits/");
  await expect(omvp.exploreEvents).toHaveAttribute("href", "/community/omvp/events/");
  await expect(omvp.exploreOMVPMembers).toHaveAttribute("href", "/community/omvp/members/");
  await expect(omvp.exploreApplicationNomination).toHaveAttribute("href", "/community/omvp/application-and-nomination/");
});
