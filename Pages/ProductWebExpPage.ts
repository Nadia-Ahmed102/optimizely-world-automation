// ProductWebExpPage.ts
import { Page, Locator } from "@playwright/test";
import { basePage } from "./basePage";

export class ProductWebExpPage extends basePage {
  readonly page: Page;
  readonly promoBlockPageTitle: Locator;
  readonly carouselH1Title: Locator;
  readonly expando1: Locator;
  readonly expando2: Locator;
  readonly expando1Plusminus: Locator;
  readonly expando2Plusminus: Locator;
  readonly expando1H4: Locator;
  readonly expando2H4: Locator;
  readonly expando1Parent: Locator;
  readonly expando2Parent: Locator;
  readonly expando1AccordionContent: Locator;
  readonly expando2AccordionContent: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.promoBlockPageTitle = page.locator("p.pageTitle");
    this.carouselH1Title = page.locator("div.carousel-content > h1");
    this.expando1 = page.locator("#heading-accordion-278437-1 > div");
    this.expando2 = page.locator("#heading-accordion-278437-2 > div");
    this.expando1Plusminus = page.locator(
      "#heading-accordion-278437-1 > div > div.symbol > div.plusminus"
    );
    this.expando2Plusminus = page.locator(
      "#heading-accordion-278437-2 > div > div.symbol > div.plusminus"
    );
    this.expando1H4 = page.locator(
      "#heading-accordion-278437-1 > div > div.title > h4"
    );
    this.expando2H4 = page.locator(
      "#heading-accordion-278437-2 > div > div.title > h4"
    );
    this.expando1Parent = page.locator("#accordion-278437 > div:nth-child(2)");
    this.expando2Parent = page.locator("#accordion-278437 > div:nth-child(3)");
    this.expando1AccordionContent = page.locator(
      "#accordion-278437-1 > div > ul"
    );
    this.expando2AccordionContent = page.locator(
      "#accordion-278437-2 > div > ul"
    );
  }

  async navigateToWebExpOverviewPage() {
    //await this.page.goto("/products/web-experimentation/overview");
    await this.page.getByRole("link", { name: "Products" }).hover();
    await this.page.getByRole("link", { name: "Web Experimentation" }).hover();
    await this.page.getByRole("link", { name: "Overview" }).first().click();
  }

  async navigateToWebExpFeaturesPage() {
    //await this.page.goto("/products/web-experimentation/features");
    await this.page.getByRole("link", { name: "Products" }).hover();
    await this.page.getByRole("link", { name: "Web Experimentation" }).hover();
    await this.page.getByRole("link", { name: "Features" }).first().click();
  }
}
