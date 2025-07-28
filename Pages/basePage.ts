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

  async hoverOverelement(elementToHover: Locator): Promise<void> {
        await elementToHover.waitFor({ state: 'visible' });
        await elementToHover.hover();

    }
    
    async clickButton(buttonToClick: Locator): Promise<void> {
        await buttonToClick.waitFor({ state: 'visible' });
        await buttonToClick.click();

    }

    async checkUncheckedCheckbox(checkbox: Locator): Promise<void> {
        await checkbox.waitFor({ state: 'visible' });
        await checkbox.check();
    }

    async provideInputInField(field: Locator, inputValue: string): Promise<void> {
        await field.waitFor({ state: 'visible' });
        await field.fill(inputValue);
    }
}