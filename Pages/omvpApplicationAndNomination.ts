import { expect, Page } from "@playwright/test";

export class omvpApplicationAndNomination {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://world.optimizely.com/community/omvp/application-and-nomination/");
  }

  // Locators
  get homeBreadcrumb() {
    return this.page.locator('#breadcrumbs > span:nth-child(1) > a:nth-child(1)');
  }

  get communityBreadcrumb() {
    return this.page.locator('#breadcrumbs > a:nth-child(2)');
  }

  get omvpBreadcrumb() {
    return this.page.locator('#breadcrumbs > a:nth-child(3)');
  }

  get heroText() {
    return this.page.locator("h1.bold > span:nth-child(1)");
  }

  get applyTechCTA() {
    return this.page.locator(
      'div.adjustheight-75:nth-child(1) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(3) > a:nth-child(1)'
    );
  }

  get applyStrategyCTA() {
    return this.page.locator(
      'div.adjustheight-75:nth-child(1) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(4) > a:nth-child(1)'
    );
  }

  get nominateCTA() {
    return this.page.locator(
      'div.adjustheight-75:nth-child(2) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(3) > a'
    );
  }

  get faqQuestion() {
    return this.page.locator("#heading-accordion-285302-1 > div:nth-child(1) > div:nth-child(2)");
  }

  get faqAnswer() {
    return this.page.locator("#accordion-285302-1 > div:nth-child(1) > p:nth-child(1)");
  }
}
