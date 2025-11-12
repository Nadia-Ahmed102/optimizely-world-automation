import { Page, Locator } from "@playwright/test";

export class OmvpBadgesPage {
  readonly page: Page;

  // Hero & description
  readonly hero: Locator;
  readonly description: Locator;

  // Breadcrumbs
  readonly homeBreadcrumb: Locator;
  readonly communityBreadcrumb: Locator;
  readonly omvpBreadcrumb: Locator;

  // Credly link
  readonly credlyLink: Locator;

  // Badge images
  readonly silverTech: Locator;
  readonly goldTech: Locator;
  readonly platinumTech: Locator;
  readonly silverStrategy: Locator;
  readonly goldStrategy: Locator;
  readonly platinumStrategy: Locator;

  // CTAs
  readonly applyTechCTA: Locator;
  readonly applyStrategyCTA: Locator;
  readonly nominateCTA: Locator;

  constructor(page: Page) {
    this.page = page;

    // Hero and description
    this.hero = page.locator("h1.bold");
    this.description = page.locator(".hideMobile > div:nth-child(1) > div:nth-child(2) > p:nth-child(2)");

    // Breadcrumbs
    this.homeBreadcrumb = page.locator('#breadcrumbs > span:nth-child(1) > a:nth-child(1)');
    this.communityBreadcrumb = page.locator('#breadcrumbs > a:nth-child(2)');
    this.omvpBreadcrumb = page.locator('#breadcrumbs > a:nth-child(3)');

    // Credly
    this.credlyLink = page.locator(".flexible > div:nth-child(2) > div:nth-child(1) > p:nth-child(2) > a:nth-child(1)");

    // Badge images
    this.silverTech = page.locator(".body-container > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > p:nth-child(1) > span:nth-child(1) > img:nth-child(1)");
    this.goldTech = page.locator(".body-container > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > p:nth-child(1) > span:nth-child(1) > img:nth-child(2)");
    this.platinumTech = page.locator(".body-container > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > p:nth-child(1) > span:nth-child(1) > img:nth-child(3)");
    this.silverStrategy = page.locator(".body-container > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > p:nth-child(1) > span:nth-child(1) > img:nth-child(4)");
    this.goldStrategy = page.locator(".body-container > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > p:nth-child(1) > span:nth-child(1) > img:nth-child(5)");
    this.platinumStrategy = page.locator(".body-container > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > p:nth-child(1) > span:nth-child(1) > img:nth-child(6)");

    // CTAs
    this.applyTechCTA = page.locator('div.adjustheight-75:nth-child(1) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(3) > a:nth-child(1)');
    this.applyStrategyCTA = page.locator('div.adjustheight-75:nth-child(1) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(4) > a:nth-child(1)');
    this.nominateCTA = page.locator('div.adjustheight-75:nth-child(2) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(3) > a');
  }
  async goto() {
    await this.page.goto("https://world.optimizely.com/community/omvp/badges/");
  }

  
}
