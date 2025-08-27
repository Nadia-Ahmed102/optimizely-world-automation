import { Page, Locator, APIRequestContext, expect } from "@playwright/test";
import * as fs from 'fs';

export class basePage {
  readonly basePage: Page;

  constructor(page: Page) {
    this.basePage = page;
  }

  /**
   * Navigates the page to the base URL defined in the Playwright configuration.
   */
  async navigateToHome() {
    await this.basePage.goto('/'); // This will use the baseURL + '/'
  }

  /**
   * Hovers over a specified element on the page.
   * @param elementToHover The Locator of the element to hover over.
   */
  async hoverOverelement(elementToHover: Locator): Promise<void> {
    await elementToHover.waitFor({ state: 'visible' });
    await elementToHover.hover();

  }

  /**
   * Clicks a specified button or clickable element on the page.
   * @param buttonToClick The Locator of the button to click.
   */
  async clickButton(buttonToClick: Locator): Promise<void> {
    await buttonToClick.waitFor({ state: 'visible' });
    await buttonToClick.click();

  }

  /**
   * Checks an unchecked checkbox.
   * @param checkbox The Locator of the checkbox to check.
   */
  async checkUncheckedCheckbox(checkbox: Locator): Promise<void> {
    await checkbox.waitFor({ state: 'visible' });
    await checkbox.check();
  }

  /**
   * Fills a text input field with the specified value.
   * @param field The Locator of the input field.
   * @param inputValue The string value to input into the field.
   */
  async provideInputInField(field: Locator, inputValue: string): Promise<void> {
    await field.waitFor({ state: 'visible' });
    await field.fill(inputValue);
  }

  /**
   * Checks all unique, navigable Urls on the current page for broken URLs.
   * An URL is considered broken if its HTTP response status is not a 2xx success code.
   * @param csvFileName A string representing the name of the test suite, used for the CSV filename.
   * @returns A promise that resolves to an array of objects, where each object
   * contains the URL, status code, and an error message if a network error occurred.
   */
  async validateURLsOnCurrentPage(csvFileName: string): Promise<{ url: string; status: number | string; error?: string }[]> {
    const brokenUrls: { url: string; status: number | string; error?: string }[] = [];
    const visitedUrls = new Set<string>();
    const apiContext: APIRequestContext = this.basePage.request;

    try {
      console.log(`Checking links on current page: ${this.basePage.url()}`);

      const links = await this.basePage.locator('a[href]').all();

      for (const link of links) {
        const href = await link.getAttribute('href');

        if (!href || href.startsWith('javascript:') || href.startsWith('#') || href.startsWith('mailto:')) {
          continue;
        }

        const absoluteUrl = new URL(href, this.basePage.url()).href;

        if (visitedUrls.has(absoluteUrl)) {
          continue;
        }
        visitedUrls.add(absoluteUrl);

        try {
          const response = await apiContext.get(absoluteUrl, { timeout: 60000 });

          if (!response.ok()) {
            // Push an object with URL and status
            brokenUrls.push({ url: absoluteUrl, status: response.status() });
            console.warn(`Broken link found: ${absoluteUrl} (Status: ${response.status()})`);
          }

        } catch (error: any) {
          // Push an object with URL, 'Network Error' status, and the error message
          brokenUrls.push({ url: absoluteUrl, status: 'Network Error', error: error.message });
          console.error(`Error checking link ${absoluteUrl}: ${error.message}`);
        }
      }
    } catch (initialError: any) {
      console.error(`Error during link extraction or initial setup: ${initialError.message}`);
      throw initialError;
    }

    if (brokenUrls.length > 0) {
      // Updated CSV content to include URL, Status, and Error Message
      const csvContent = 'Broken URL,Status,Error Message\n' + brokenUrls.map(item =>
        `"${item.url}","${item.status}","${item.error || ''}"`
      ).join('\n');
      const filename = `${csvFileName}_brokenURLs.csv`;

      try {
        // Check if the file exists and delete it before writing
        if (fs.existsSync(filename)) {
          fs.unlinkSync(filename); // Remove the file if it exists
        }
        // Write the CSV content to a file
        fs.writeFileSync(filename, csvContent);
        console.log(`Please find the list of broken URLs in ${filename}.`);

      } catch (error) {
        console.error(`Failed to write broken URLs to CSV: ${error}`);
      }

    } else {
      console.log(`All ${visitedUrls.size} URLs on the current page are OK.`);
    }

    return brokenUrls;
  }

  async listenForConsoleEvents(): Promise<void> {
    this.basePage.on('console', (msg) => {
      console.log(`Console message: ${msg.type()} - ${msg.text()}`);
    });
  }
  async listenForPageErrors(): Promise<void> {
    this.basePage.on('pageerror', (error) => {
      console.error(`Page error: ${error.message}`);
    });
  }
  async listenForResponseErrors(): Promise<void> {
    this.basePage.on('response', (response) => {
      if (!response.ok()) {
        console.error(`Response error: ${response.status()} - ${response.url()}`);
      }
    });
  }

  /**
   * Verifies the CSS attribute of an element before and after a hover action.
   * @param elementToHover The Locator of the element to hover over.
   * @param attribute The name of the CSS attribute to verify (e.g., 'background-color').
   * @param value The expected CSS value before the hover action.
   * @param onHoverValue The expected CSS value after the hover action.
   */
  async verifyOnHoverChanges(elementToHover: Locator, attribute: string, value: string, onHoverValue: string): Promise<void> {
    await elementToHover.waitFor({ state: 'visible' });
    await expect(elementToHover).toHaveCSS(attribute, value);
    await elementToHover.hover();
    await expect(elementToHover).toHaveCSS(attribute, onHoverValue);
  }

}