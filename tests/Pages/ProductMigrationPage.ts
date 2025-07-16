// ProductMigrationPage.ts
import { Page, Locator } from '@playwright/test';
import { basePage } from './basePage';

export class ProductMigrationPage extends basePage {
  readonly page: Page;
  readonly carouselHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.carouselHeading = page.locator('.carousel-content h1.bold');
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