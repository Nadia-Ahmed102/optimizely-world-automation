import { test, expect } from "@playwright/test";
import { OmvpEventsPage } from "../../Pages/omvpEvents";

test.beforeEach(async ({ page }) => {
  const omvpEvents = new OmvpEventsPage(page);
  await omvpEvents.goto();
});

test("OMVP Events page should have expected title", async ({ page }) => {
  await expect(page).toHaveTitle("OMVP Events | Optimizely Developer Community");
});

test("OMVP Events page hero text and description text should be correct", async ({ page }) => {
  const omvpEvents = new OmvpEventsPage(page);

  await expect(omvpEvents.header).toBeVisible();
  await expect(omvpEvents.header).toHaveText("OMVP Events");

  await expect(omvpEvents.description).toBeVisible();
  await expect(omvpEvents.description).toHaveText("What OMVP events do we have?");
});

test("OMVP Events page 'Local Developer Meetups' accordion should expand and show correct text", async ({ page }) => {
  const omvpEvents = new OmvpEventsPage(page);

  await expect(omvpEvents.meetupsAccordion).toBeVisible();
  await expect(omvpEvents.meetupsAccordion).toHaveText("Local Developer Meetups");

  await omvpEvents.meetupsAccordion.click({ force: true });

  await expect(omvpEvents.meetupsExpandedText).toBeVisible();
  await expect(omvpEvents.meetupsExpandedText).toHaveText(
    "Local Meetups will be held in select major cities. These meetups will be hosted/driven by OMVPs and are open to the public. Their purpose is to create an opportunity for local developers to get together in person and learn about Optimizely products on a deep technical level.  Optimizely funds the event and helps the OMVP host with logistics."
  );
});

test("OMVP Events page breadcrumbs should be correct", async ({ page }) => {
  const omvpEvents = new OmvpEventsPage(page);

  await expect(omvpEvents.homeBreadcrumb).toBeVisible();
  await expect(omvpEvents.homeBreadcrumb).toHaveText("Home");
  await expect(omvpEvents.homeBreadcrumb).toHaveAttribute("href", "/");

  await expect(omvpEvents.communityBreadcrumb).toBeVisible();
  await expect(omvpEvents.communityBreadcrumb).toHaveText("Community");
  await expect(omvpEvents.communityBreadcrumb).toHaveAttribute("href", "/community/");

  await expect(omvpEvents.omvpBreadcrumb).toBeVisible();
  await expect(omvpEvents.omvpBreadcrumb).toHaveText("OMVP");
  await expect(omvpEvents.omvpBreadcrumb).toHaveAttribute("href", "/community/omvp/");
});

test("OMVP Events page Application and Nomination CTAs should redirect correctly", async ({ page }) => {
  const omvpEvents = new OmvpEventsPage(page);

  await expect(omvpEvents.applyTechCTA).toBeVisible();
  await expect(omvpEvents.applyTechCTA).toHaveText("Apply for a Technology OMVP now");
  await expect(omvpEvents.applyTechCTA).toHaveAttribute("href", "https://forms.office.com/r/0Xim01z897");

  await expect(omvpEvents.applyStrategyCTA).toBeVisible();
  await expect(omvpEvents.applyStrategyCTA).toHaveText("Apply for a Strategy OMVP now");
  await expect(omvpEvents.applyStrategyCTA).toHaveAttribute("href", "https://forms.office.com/r/ss0S8q7n34");

  await expect(omvpEvents.nominateCTA).toBeVisible();
  await expect(omvpEvents.nominateCTA).toHaveText("Nominate now");
  await expect(omvpEvents.nominateCTA).toHaveAttribute("href", "https://forms.office.com/r/7crUwMLJPh");
});
