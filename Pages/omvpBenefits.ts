import { Page, Locator } from "@playwright/test";

export class OmvpBenefitsPage {
  readonly page: Page;
  readonly header: Locator;
  readonly homeBreadcrumb: Locator;
  readonly communityBreadcrumb: Locator;
  readonly omvpBreadcrumb: Locator;
  readonly swagAccordion: Locator;
  readonly swagText: Locator;
  readonly applyTechCTA: Locator;
  readonly applyStrategyCTA: Locator;
  readonly nominateCTA: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header
    this.header = page.locator(".carousel-content");

    // Breadcrumbs
    this.homeBreadcrumb = page.locator("#breadcrumbs > span:nth-child(1) > a:nth-child(1)");
    this.communityBreadcrumb = page.locator("#breadcrumbs > a:nth-child(2)");
    this.omvpBreadcrumb = page.locator("#breadcrumbs > a:nth-child(3)");

    // Accordion
    this.swagAccordion = page.locator("#heading-accordion-276574-1 > div:nth-child(1) > div:nth-child(2)");
    this.swagText = page.locator("#accordion-276574-1 > div:nth-child(1) > p:nth-child(1)");

    // CTAs
    this.applyTechCTA = page.locator(
      "div.adjustheight-75:nth-child(1) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(3) > a:nth-child(1)"
    );

    this.applyStrategyCTA = page.locator(
      "div.adjustheight-75:nth-child(1) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(4) > a:nth-child(1)"
    );

    this.nominateCTA = page.locator(
      "div.adjustheight-75:nth-child(2) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(3) > a"
    );
  }

  async goto() {
    await this.page.goto("https://world.optimizely.com/community/omvp/benefits/");
  }
}
