// ProductPage.ts
import { Page, Locator } from '@playwright/test';
import { basePage } from './basePage';

export class ProductPage extends basePage {
  readonly page: Page;
  readonly productNavMenu: Locator;
  readonly carouselHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.productNavMenu = page.getByRole('link', { name: 'Products' });
    this.carouselHeading = page.locator('.carousel-content h1.bold');
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
}
