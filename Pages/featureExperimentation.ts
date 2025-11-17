import { Page, Locator, expect } from '@playwright/test';

export class FeatureExperimentationPage {
  readonly page: Page;

  // Hero Section
  readonly heroTitle: Locator;
  readonly headerText: Locator;
  readonly description: Locator;
  readonly heroImage: Locator;

  // Connect with Optimizely Section
  readonly connectSectionHeading: Locator;
  readonly readNowCTA: Locator;
  readonly joinNowCTA: Locator;
  readonly exploreNowCTA: Locator;
  readonly learnNowCTA: Locator;

  // Latest Community Articles Section
  readonly latestArticlesHeader: Locator;
  readonly latestArticlesDescription: Locator;
  readonly seeAllArticlesCTA: Locator;

  // Roadmap Section
  readonly roadmapSection: Locator;
  readonly roadmapTitle: Locator;
  readonly roadmapDescription: Locator;
  readonly roadmapCTA: Locator;

  // Delve Deeper Section
  readonly delveSection: Locator;
  readonly delveSectionTitle: Locator;
  readonly devDocsCTA: Locator;
  readonly userGuideCTA: Locator;
  readonly technicalCTA: Locator;

  constructor(page: Page) {
    this.page = page;

    // Hero Section
    this.heroTitle = page.locator('.pageTitle');
    this.headerText = page.locator('.pageHeader > strong:nth-child(1)');
    this.description = page.locator('.right > div:nth-child(2) > div:nth-child(1) > p:nth-child(3)');
    this.heroImage = page.locator('.right > div:nth-child(1) > div:nth-child(1) > img:nth-child(1)');

    // Connect Section
    this.connectSectionHeading = page.locator('.colourBlockContainer > div:nth-child(1) > h2:nth-child(1)');
    this.readNowCTA = page.locator('div.colourBlock:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(3) > a:nth-child(1)');
    this.joinNowCTA = page.locator('div.colourBlock:nth-child(2) > div:nth-child(1) > div:nth-child(1) > p:nth-child(3) > a:nth-child(1)');
    this.exploreNowCTA = page.locator('.light');
    this.learnNowCTA = page.locator('div.colourBlock:nth-child(4) > div:nth-child(1) > div:nth-child(1) > p:nth-child(3) > a:nth-child(1)');

    // Latest Community Articles
    this.latestArticlesHeader = page.locator('div.colourBlock:nth-child(4) > div:nth-child(1) > div:nth-child(1) > p:nth-child(3) > a:nth-child(1)');
    this.latestArticlesDescription = page.locator('.blogListing > div:nth-child(1) > p:nth-child(2)');
    this.seeAllArticlesCTA = page.locator('div.ctaContainer:nth-child(3) > a:nth-child(1)');

    // Roadmap
    this.roadmapSection = page.locator('.carousel-content').first();
    this.roadmapTitle = this.roadmapSection.locator('h2 span').first();
    this.roadmapDescription = this.roadmapSection.locator('p:has-text("Check out all the latest-and-greatest") span').first();
    this.roadmapCTA = this.roadmapSection.locator('a:has-text("See what\'s on our roadmap")').first();

    // Delve Deeper
    this.delveSection = page.locator('.body-container > div:nth-child(1) > div:nth-child(8)');
    this.delveSectionTitle = this.delveSection.locator('section h2').first();
    this.devDocsCTA = this.delveSection.locator('a[href="https://docs.developers.optimizely.com/feature-experimentation/docs/introduction"]');
    this.userGuideCTA = this.delveSection.locator('a[href="https://support.optimizely.com/hc/en-us/categories/4410287901197"]');
    this.technicalCTA = this.delveSection.locator('a[href="/products/feature-experimentation/features/"]');
  }

  async navigate() {
    await this.page.goto('https://world.optimizely.com/products/feature-experimentation/overview/');
  }
}
