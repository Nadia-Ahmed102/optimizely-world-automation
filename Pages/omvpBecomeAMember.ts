import { Page, Locator, expect } from '@playwright/test';

export class OmvpPage {
  readonly page: Page;

  // Header
  readonly header: Locator;

  // Requirement Accordion
  readonly questionsHelpedAccordion: Locator;
  readonly questionsHelpedSecondParagraph: Locator;

  // Application & Nomination CTAs
  readonly technologyCTA: Locator;
  readonly strategyCTA: Locator;
  readonly nominateCTA: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header
    this.header = page.locator('//html/body/div[4]/div[1]/div[1]/section/div/div/div/div[2]/h1/span');

    // Requirement Accordion
    this.questionsHelpedAccordion = page.getByRole('heading', { name: 'Questions Helped' });
    this.questionsHelpedSecondParagraph = page.locator(
      '#accordion-276133-1 > div:nth-child(1) > p:nth-child(2)'
    );

    // Application & Nomination CTAs
    this.technologyCTA = page.locator(
      'div.adjustheight-75:nth-child(1) a:has-text("Apply for a Technology OMVP now")'
    );
    this.strategyCTA = page.locator(
      'div.adjustheight-75:nth-child(1) a:has-text("Apply for a Strategy OMVP now")'
    );
    this.nominateCTA = page.locator(
      'div.adjustheight-75:nth-child(2) a:has-text("Nominate now")'
    );
  }

  // Navigate to OMVP page
  async navigate() {
    await this.page.goto('https://world.optimizely.com/community/omvp/become-a-member/');
  }

  // Header verification
  async verifyHeader(expectedText: string) {
    await expect(this.header).toBeVisible();
    await expect(this.header).toHaveText(expectedText);
  }

  // Requirement Accordion
  async expandQuestionsHelpedAccordion() {
    await this.questionsHelpedAccordion.click({ force: true });
  }

  async verifyQuestionsHelpedParagraph(expectedText: string) {
    await expect(this.questionsHelpedSecondParagraph).toBeVisible();
    await expect(this.questionsHelpedSecondParagraph).toHaveText(expectedText);
  }

  // Application & Nomination CTAs
  async verifyTechnologyCTA(expectedHref: string) {
    await expect(this.technologyCTA).toBeVisible();
    await expect(this.technologyCTA).toHaveAttribute('href', expectedHref);
  }

  async verifyStrategyCTA(expectedHref: string) {
    await expect(this.strategyCTA).toBeVisible();
    await expect(this.strategyCTA).toHaveAttribute('href', expectedHref);
  }

  async verifyNominateCTA(expectedHref: string) {
    await expect(this.nominateCTA).toBeVisible();
    await expect(this.nominateCTA).toHaveAttribute('href', expectedHref);
  }
}
