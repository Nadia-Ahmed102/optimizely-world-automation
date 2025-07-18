// ProductPage.ts
import { Page, Locator } from '@playwright/test';
import { basePage } from './basePage';

export class ProductPage extends basePage {
  readonly page: Page;
  readonly productNavMenu: Locator;
  readonly carouselHeading: Locator;
readonly accordionHeadings: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.productNavMenu = page.getByRole('link', { name: 'Products' });
    this.carouselHeading = page.locator('.carousel-content h1.bold');
    this.accordionHeadings = page.locator(
      'section.accordion div.accordionItem h5.bold'
    );
  }

  async navigateToOptimizelyWorldHomepage() {
    await this.navigateToHome(); // Inherited from basePage
  }

  async clickOnProductNavMenu(): Promise<void> {
    await this.productNavMenu.waitFor({ state: 'visible' });
    await this.productNavMenu.click();
  }

  async getCarouselHeadingText(): Promise<string> {
    await this.carouselHeading.waitFor({ state: 'visible' });
    return (await this.carouselHeading.textContent()) || '';
  }
  async getCarouselHeadings(): Promise<string[]> {
    const headings: string[] = [];

    for (let i = 2; i <= 7; i++) {
      const selector = `body > div.body-container > div:nth-child(1) > div:nth-child(${i}) > div > section > div.contentContainer > div > h2`;
      const locator = this.page.locator(selector);

      await locator.waitFor({ state: 'visible' });
      const text = await locator.textContent();
      headings.push(text?.trim() || '');
    }

    return headings;
  }

async getAccordionTitles(): Promise<string[]> {
  const count = await this.accordionHeadings.count();
  const titles: string[] = [];
  console.log("Count", count);

  for (let i = 0; i < count; i++) {
    const heading = this.accordionHeadings.nth(i);

    // Scroll to element if it's not in view
    await heading.scrollIntoViewIfNeeded();

    const title = await heading.textContent();
    titles.push(title?.trim() ?? '');
  }

  return titles;
}
}
