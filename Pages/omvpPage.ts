import { Page, Locator } from "@playwright/test";
import { basePage } from "./basePage";

export class omvpPage extends basePage {
  readonly page: Page;
  readonly firstAccordionFirstText: Locator;
  readonly firstAccordionSecondText: Locator;
  readonly firstAccordionRightArrow: Locator;
  readonly firstAccordionLeftArrow: Locator;
  readonly secondAccordionFirstText: Locator;
  readonly secondAccordionSecondText: Locator;
  readonly secondAccordionRightArrow: Locator;
  readonly secondAccordionLeftArrow: Locator;
  static firstAccordionFirstText: any;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.firstAccordionFirstText = page.locator(
      "#carousel-277085 > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1) > em:nth-child(1)"
    );
    this.firstAccordionSecondText = page.locator(
      "#carousel-277085 > div > div.carousel-item.hideMobile.active > div > div.carousel-content > p:nth-child(1) > em"
    );
    this.firstAccordionRightArrow = page.locator(
      "#carousel-277085 > a:nth-child(4) > span:nth-child(1)"
    );
    this.firstAccordionLeftArrow = page.locator("TODO:");
    this.secondAccordionFirstText = page.locator("TODO:");
    this.secondAccordionSecondText = page.locator("TODO:");
    this.secondAccordionRightArrow = page.locator("TODO:");
    this.secondAccordionLeftArrow = page.locator("TODO:");
  }
}
