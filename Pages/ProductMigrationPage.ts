// ProductMigrationPage.ts
import { Page, Locator } from '@playwright/test';
import { basePage } from './basePage';

export class ProductMigrationPage extends basePage {
  readonly page: Page;
  readonly carouselHeading: Locator;
  readonly accordionItem1: Locator; //Will it require a new contract?
  readonly accordionItem2: Locator; //Will I incur additional cost?
  readonly accordionItem3: Locator; //Will I be able to retain my old data?
  readonly accordionItem4: Locator; //What is the overall process?
  readonly accordionItem5: Locator; //Will it require a new contract?      
  readonly accordionItem6: Locator; //Will I incur additional cost?
  readonly accordionItem7: Locator; //Will I be able to retain my old data?
  readonly accordionItem8: Locator; //What is the overall process?



  constructor(page: Page) {
    super(page);
    this.page = page;
    this.carouselHeading = page.locator('.carousel-content h1.bold');
    this.accordionItem1 = page.locator('#heading-accordion-264160-1 > div > div.title');
    this.accordionItem2 = page.locator('#heading-accordion-264160-2 > div > div.title');
    this.accordionItem3 = page.locator('#heading-accordion-264160-3 > div > div.title');
    this.accordionItem4 = page.locator('#heading-accordion-264160-4 > div > div.title');
    this.accordionItem5 = page.locator('#heading-accordion-264166-1 > div > div.title');
    this.accordionItem6 = page.locator('#heading-accordion-264166-2 > div > div.title');
    this.accordionItem7 = page.locator('#heading-accordion-264166-3 > div > div.title');
    this.accordionItem8 = page.locator('#heading-accordion-264166-4 > div > div.title');
  }

  async navigateToOptimizelyWorldHomepage() {
    await this.navigateToHome(); // Inherited from basePage
  }

  async getCarouselHeadingText(): Promise<string> {
    await this.carouselHeading.waitFor({ state: 'visible' });
    return (await this.carouselHeading.textContent()) || '';
  }
  async navToProductMigrationPage(): Promise<void> {
    // backup - await this.page.goto('/products/migration');
    await this.page.getByRole('link', { name: 'Products' }).hover();
    await this.page.getByRole('link', { name: 'Product migration' }).waitFor({ state: 'visible' });
    await this.page.getByRole('link', { name: 'Product migration' }).click();
  }
}