import { Page, Locator } from "@playwright/test";
import { basePage } from "./basePage";

export class omvpPage extends basePage {
  // Accordion
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

  // FAQ locators
  readonly firstFAQ: Locator;
  readonly firstFAQToggle: Locator;

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
    this.firstAccordionLeftArrow = page.locator(
      "body > div:nth-child(9) > div:nth-child(1) > div:nth-child(4) > section:nth-child(1) > a:nth-child(3)");
    this.secondAccordionFirstText = page.locator(
      "div[class='carousel-item hideMobile active'] em");
    this.secondAccordionSecondText = page.locator(
      "section[id='carousel-277091'] div[class='carousel-item hideMobile active'] em");
    this.secondAccordionRightArrow = page.locator(
      "section[id='carousel-277091'] span[class='carousel-control-next-icon']");
    this.secondAccordionLeftArrow = page.locator(
      "section[id='carousel-277091'] span[class='carousel-control-prev-icon']");

    // FAQ locators
    this.firstFAQ = page.locator("#heading-accordion-277086-1 > div > div.symbol > div.plusminus");
    this.firstFAQToggle = page.locator(
      '//*[@id="accordion-277086"]/div[2]'
    );
  }
}
