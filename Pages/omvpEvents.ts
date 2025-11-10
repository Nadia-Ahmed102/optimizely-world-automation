import { Page, Locator } from "@playwright/test";

export class OmvpEventsPage {
  readonly page: Page;

  // Locators
  readonly header: Locator;
  readonly description: Locator;
  readonly homeBreadcrumb: Locator;
  readonly communityBreadcrumb: Locator;
  readonly omvpBreadcrumb: Locator;
  readonly meetupsAccordion: Locator;
  readonly meetupsExpandedText: Locator;
  readonly applyTechCTA: Locator;
  readonly applyStrategyCTA: Locator;
  readonly nominateCTA: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header & description
    this.header = page.locator("h1.bold");
    this.description = page.locator(".dropshadowlight > p:nth-child(2)");

    // Breadcrumbs
    this.homeBreadcrumb = page.locator("#breadcrumbs > span:nth-child(1) > a:nth-child(1)");
    this.communityBreadcrumb = page.locator("#breadcrumbs > a:nth-child(2)");
    this.omvpBreadcrumb = page.locator("#breadcrumbs > a:nth-child(3)");

    // Local Developer Meetups accordion
    this.meetupsAccordion = page.locator("#heading-accordion-276587-1 > div:nth-child(1) > div:nth-child(2) > h5:nth-child(1)");
    this.meetupsExpandedText = page.locator("#accordion-276587-1 > div:nth-child(1) > p:nth-child(1)");

    // Application & Nomination CTAs
    this.applyTechCTA = page.locator('div.adjustheight-75:nth-child(1) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(3) > a:nth-child(1)');
    this.applyStrategyCTA = page.locator('div.adjustheight-75:nth-child(1) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(4) > a:nth-child(1)');
    this.nominateCTA = page.locator('div.adjustheight-75:nth-child(2) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(3) > a');
  }

  async goto() {
    await this.page.goto("https://world.optimizely.com/community/omvp/events/");
  }
}
