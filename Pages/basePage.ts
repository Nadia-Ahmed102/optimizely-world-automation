import { Page,Locator } from "@playwright/test";
export class basePage
{
    readonly basePage: Page;

  constructor(page: Page) {
    this.basePage = page;
  }

  async navigateToHome() {
    // This will use the baseURL + '/'
    await this.basePage.goto('/');
  }
}