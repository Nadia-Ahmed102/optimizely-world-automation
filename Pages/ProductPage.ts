// ProductPage.ts
import { Page, Locator } from '@playwright/test';
import { basePage } from './basePage';

export class ProductPage extends basePage {
  readonly page: Page;
  readonly productNavMenu: Locator;
  readonly carouselHeading: Locator;
  readonly accordionHeadings: Locator;
  readonly count;

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
    console.log(heading);

    // Scroll to element if it's not in view
    await heading.scrollIntoViewIfNeeded();

    const title = await heading.textContent();
    titles.push(title?.trim() ?? '');
  }

  return titles;
}

async getAccordionItems() {
    return this.page.locator('.accordionItem');
  }

  async expandAccordionAndValidate(index: number) {
    const accordion = (await this.getAccordionItems()).nth(index);
    const title = await accordion.locator('.accordionTitle h5').innerText();

    console.log(`Clicking on accordion: ${title}`);
    await accordion.click();
    await this.page.waitForTimeout(500); // wait for animation

    const isExpanded = await accordion.getAttribute('aria-expanded') === 'true';
    console.log(`Is expanded: ${isExpanded}`);

    const content = await accordion.locator('.accordionContent').innerText();
    console.log(`Content: ${content.substring(0, 100)}...`); // log preview

    await accordion.click();
    await this.page.waitForTimeout(500);

    const isCollapsed = await accordion.getAttribute('aria-expanded') === 'false';
    console.log(`Is collapsed after clicking again: ${isCollapsed}`);

    return {
      title,
      content,
      isExpanded,
      isCollapsed
    };
  }

}
