// SmePage.ts
import { Page, Locator } from "@playwright/test";
import { basePage } from "./BasePage";

export class SmePage extends basePage {
  readonly page: Page;
  readonly mainHeading: Locator;
  readonly programHeading: Locator;
  readonly ourProgramHeading: Locator;
  readonly smeMembersHeading: Locator;
  readonly categoriesHeading: Locator;
  readonly qualificationsHeading: Locator;
  readonly benefitsHeading: Locator;
  readonly searchInput: Locator;
  readonly navigationLinks: Locator;
  readonly memberImages: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.mainHeading = page.locator("h2.bold", {
      hasText: "Optimizely Subject Matter Expert (SME) program",
    });
    this.programHeading = page.locator("h2.bold", {
      hasText: "Optimizely Subject Matter Expert (SME) program",
    });
    this.ourProgramHeading = page.locator("h2.bold", {
      hasText: "Our Program",
    });
    this.smeMembersHeading = page.locator("h2.bold", {
      hasText: "SME Members",
    });
    this.categoriesHeading = page.locator("h5.bold", { hasText: "Categories" });
    this.qualificationsHeading = page.locator("h5.bold", {
      hasText: "Qualifications",
    });
    this.benefitsHeading = page.locator("h5.bold", { hasText: "Benefits" });
    this.searchInput = page.locator("input#inlineFormInputGroup"); //TODO fix this
    this.navigationLinks = page.locator("nav a, .nav a, .navbar a, .menu a");
    this.memberImages = page.locator(
      'img[alt], img[alt="Alex"], img[alt="Amol"], img[alt="Andreas"]'
    );
  }

  async getMainHeadingText(): Promise<string> {
    await this.mainHeading.first().waitFor({ state: "visible" });
    return (await this.mainHeading.first().textContent())?.trim() || "";
  }

  async getAllHeadings(): Promise<string[]> {
    const headings = await this.page
      .locator(":is(h1, h2, h3, h4, h5, h6)")
      .allTextContents();
    return headings
      .map((heading) => heading.trim())
      .filter((heading) => heading.length > 0);
  }

  async getSearchPlaceholder(): Promise<string> {
    await this.searchInput.waitFor({ state: "visible" });
    return (await this.searchInput.getAttribute("placeholder")) || "";
  }

  async getNavLinksText(): Promise<string[]> {
    const links = await this.navigationLinks.allTextContents();
    return links.map((link) => link.trim()).filter((link) => link.length > 0);
  }

  async getMemberImageAlts(): Promise<string[]> {
    const alts = await this.memberImages.evaluateAll((imgs) =>
      imgs.map((img) => (img as HTMLImageElement).alt || "")
    );
    return alts.filter((alt) => alt.length > 0);
  }
}
