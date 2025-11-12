import { test, expect } from "@playwright/test";
import { omvpPage } from "../../Pages/omvpPage";

test.beforeEach(async ({ page }) => {
  const omvp = new omvpPage(page);
  await omvp.navigate();
});

test("OMVP page should have expected title", async ({ page }) => {
  await expect(page).toHaveTitle(/OMVP | Optimizely Developer Community/);
});

// ...update all other references from `new omvpPage()` to `new OmvpLandingPage()`



test("Test accordion text changes on click", async ({ page }) => {
  const omvp = new omvpPage(page);
  const firstAccordion = omvp.firstAccordionFirstText;
  await expect(firstAccordion).toBeVisible();
  await omvp.firstAccordionRightArrow.click();
  const secondAccordion = omvp.firstAccordionSecondText;
  await expect(secondAccordion).toBeVisible();
  await expect(firstAccordion).not.toBeVisible();
});

test("OMVP page hero text should be correct", async ({ page }) => {
  const heroText = page.locator("h1.bold > span:nth-child(1)");
  await expect(heroText).toBeVisible();
  await expect(heroText).toHaveText("Optimizely Most Valuable Professionals");
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
});

test("OMVP FAQ accordion should expand and show correct text", async ({ page }) => {
  // Locate the FAQ question
  const faqQuestion = page.locator("#heading-accordion-277086-1 > div:nth-child(1) > div:nth-child(2) > h5:nth-child(1)");

  // Verify question is visible and has correct text
  await expect(faqQuestion).toBeVisible();
  await expect(faqQuestion).toHaveText("What to expect in a nomination or first-time application process?");

  // Click to expand the accordion
  await faqQuestion.click({ force: true });

  // Verify the expanded answer text
  const faqAnswer = page.locator("#accordion-277086-1 > div:nth-child(1) > p:nth-child(1)");
  await expect(faqAnswer).toBeVisible();
  await expect(faqAnswer).toHaveText(
    "Once an applicant applies, they can expect to be notified when their application has been received. Once the application period closes, the selection process begins. Optimizely chooses OMVPs based upon the application requirements and the OMVP will be notified of acceptance or denial of entry into the program, as well as their rank/tier. The process can take about a month to complete."
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

test("Explore OMVP section links should redirect correctly", async ({ page }) => {
  // Become a member
  const becomeMember = page.locator("div.adjustheight-100:nth-child(1) > div:nth-child(1) > section:nth-child(1) > a:nth-child(1)");
  await expect(becomeMember).toHaveAttribute("href", "/community/omvp/become-a-member/");

  // Benefits
  const benefits = page.locator("div.adjustheight-100:nth-child(2) > div:nth-child(1) > section:nth-child(1) > a:nth-child(1)");
  await expect(benefits).toHaveAttribute("href", "/community/omvp/benefits/");

  // Events
  const events = page.locator("div.col:nth-child(3) > div:nth-child(1) > section:nth-child(1) > a:nth-child(1)");
  await expect(events).toHaveAttribute("href", "/community/omvp/events/");

  // OMVP Members
  const omvpMembers = page.locator("div.col:nth-child(4) > div:nth-child(1) > section:nth-child(1) > a:nth-child(1)");
  await expect(omvpMembers).toHaveAttribute("href", "/community/omvp/members/");

  // Application and Nomination
  const applicationNomination = page.locator("div.col:nth-child(5) > div:nth-child(1) > section:nth-child(1) > a:nth-child(1)");
  await expect(applicationNomination).toHaveAttribute("href", "/community/omvp/application-and-nomination/");
});
