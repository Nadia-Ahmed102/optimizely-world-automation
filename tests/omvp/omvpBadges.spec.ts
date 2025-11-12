import { test, expect } from "@playwright/test";
// import { omvpPage } from "../../Pages/omvpPage";
import { OmvpBadgesPage } from "../../Pages/omvpBadges";

test.beforeEach(async ({ page }) => {
  const omvpBadges = new OmvpBadgesPage(page);
  await omvpBadges.goto();
});

test("OMVP Badges page should have expected title", async ({ page }) => {
  await expect(page).toHaveTitle(/Optimizely Most Valuable Professionals Badges | Optimizely Develo/);
});

test("OMVP Badges page hero and description should be correct", async ({ page }) => {
  const omvpBadges = new OmvpBadgesPage(page);

  await expect(omvpBadges.hero).toBeVisible();
  await expect(omvpBadges.hero).toHaveText("Optimizely Digital Badging");

  await expect(omvpBadges.description).toBeVisible();
  await expect(omvpBadges.description).toHaveText("Show off your community recognition");
});

test("OMVP Badges page breadcrumbs should be correct", async ({ page }) => {
  const omvpBadges = new OmvpBadgesPage(page);

  await expect(omvpBadges.homeBreadcrumb).toBeVisible();
  await expect(omvpBadges.homeBreadcrumb).toHaveText("Home");
  await expect(omvpBadges.homeBreadcrumb).toHaveAttribute("href", "/");

  await expect(omvpBadges.communityBreadcrumb).toBeVisible();
  await expect(omvpBadges.communityBreadcrumb).toHaveText("Community");
  await expect(omvpBadges.communityBreadcrumb).toHaveAttribute("href", "/community/");

  await expect(omvpBadges.omvpBreadcrumb).toBeVisible();
  await expect(omvpBadges.omvpBreadcrumb).toHaveText("OMVP");
  await expect(omvpBadges.omvpBreadcrumb).toHaveAttribute("href", "/community/omvp/");
});

test("OMVP Badges page Credly link should be visible and have correct href", async ({ page }) => {
  const omvpBadges = new OmvpBadgesPage(page);

  await expect(omvpBadges.credlyLink).toBeVisible();
  await expect(omvpBadges.credlyLink).toHaveText("Credly");
  await expect(omvpBadges.credlyLink).toHaveAttribute("href", "http://info.credly.com/");
});

test("OMVP Badges page badge images should be visible with correct src", async ({ page }) => {
  const omvpBadges = new OmvpBadgesPage(page);

  await expect(omvpBadges.silverTech).toBeVisible();
  await expect(omvpBadges.silverTech).toHaveAttribute("src", "/contentassets/aa40151bec434569a1aa0f460568881d/mvp-technology-silver.png");

  await expect(omvpBadges.goldTech).toBeVisible();
  await expect(omvpBadges.goldTech).toHaveAttribute("src", "/contentassets/aa40151bec434569a1aa0f460568881d/mvp-technology-gold.png");

  await expect(omvpBadges.platinumTech).toBeVisible();
  await expect(omvpBadges.platinumTech).toHaveAttribute("src", "/contentassets/aa40151bec434569a1aa0f460568881d/mvp-technology-platinum.png");

  await expect(omvpBadges.silverStrategy).toBeVisible();
  await expect(omvpBadges.silverStrategy).toHaveAttribute("src", "/contentassets/aa40151bec434569a1aa0f460568881d/mvp-strategy-silver.png");

  await expect(omvpBadges.goldStrategy).toBeVisible();
  await expect(omvpBadges.goldStrategy).toHaveAttribute("src", "/contentassets/aa40151bec434569a1aa0f460568881d/mvp-strategy-gold.png");

  await expect(omvpBadges.platinumStrategy).toBeVisible();
  await expect(omvpBadges.platinumStrategy).toHaveAttribute("src", "/contentassets/aa40151bec434569a1aa0f460568881d/mvp-strategy-platinum.png");
});

test("OMVP Badges page Application and Nomination CTAs should redirect correctly", async ({ page }) => {
  const omvpBadges = new OmvpBadgesPage(page);

  await expect(omvpBadges.applyTechCTA).toBeVisible();
  await expect(omvpBadges.applyTechCTA).toHaveText("Apply for a Technology OMVP now");
  await expect(omvpBadges.applyTechCTA).toHaveAttribute("href", "https://forms.office.com/r/0Xim01z897");

  await expect(omvpBadges.applyStrategyCTA).toBeVisible();
  await expect(omvpBadges.applyStrategyCTA).toHaveText("Apply for a Strategy OMVP now");
  await expect(omvpBadges.applyStrategyCTA).toHaveAttribute("href", "https://forms.office.com/r/ss0S8q7n34");

  await expect(omvpBadges.nominateCTA).toBeVisible();
  await expect(omvpBadges.nominateCTA).toHaveText("Nominate now");
  await expect(omvpBadges.nominateCTA).toHaveAttribute("href", "https://forms.office.com/r/7crUwMLJPh");
});
