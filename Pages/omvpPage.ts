import { Page, Locator } from "@playwright/test";
import { basePage } from "./BasePage";

export class omvpPage extends basePage {
  readonly page: Page;

  // Accordion
  readonly firstAccordionFirstText: Locator;
  readonly firstAccordionSecondText: Locator;
  readonly firstAccordionRightArrow: Locator;

  // Hero
  readonly heroText: Locator;

  // Breadcrumbs
  readonly homeBreadcrumb: Locator;
  readonly communityBreadcrumb: Locator;

  // FAQ
  readonly faqQuestion: Locator;
  readonly faqAnswer: Locator;

  // Application & Nomination CTAs
  readonly applyTechCTA: Locator;
  readonly applyStrategyCTA: Locator;
  readonly nominateCTA: Locator;

  // Explore OMVP section
  readonly exploreBecomeMember: Locator;
  readonly exploreBenefits: Locator;
  readonly exploreEvents: Locator;
  readonly exploreOMVPMembers: Locator;
  readonly exploreApplicationNomination: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    // Accordion
    this.firstAccordionFirstText = page.locator(
      "#carousel-277085 > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1) > em:nth-child(1)"
    );
    this.firstAccordionSecondText = page.locator(
      "#carousel-277085 > div > div.carousel-item.hideMobile.active > div > div.carousel-content > p:nth-child(1) > em"
    );
    this.firstAccordionRightArrow = page.locator(
      "#carousel-277085 > a:nth-child(4) > span:nth-child(1)"
    );

    // Hero
    this.heroText = page.locator("h1.bold > span:nth-child(1)");

    // Breadcrumbs
    this.homeBreadcrumb = page.locator('#breadcrumbs > span:nth-child(1) > a:nth-child(1)');
    this.communityBreadcrumb = page.locator('#breadcrumbs > a:nth-child(2)');

    // FAQ
    this.faqQuestion = page.locator("#heading-accordion-277086-1 > div:nth-child(1) > div:nth-child(2) > h5:nth-child(1)");
    this.faqAnswer = page.locator("#accordion-277086-1 > div:nth-child(1) > p:nth-child(1)");

    // Application & Nomination CTAs
    this.applyTechCTA = page.locator('div.adjustheight-75:nth-child(1) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(3) > a:nth-child(1)');
    this.applyStrategyCTA = page.locator('div.adjustheight-75:nth-child(1) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(4) > a:nth-child(1)');
    this.nominateCTA = page.locator('div.adjustheight-75:nth-child(2) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(3) > a');

    // Explore OMVP
    this.exploreBecomeMember = page.locator("div.adjustheight-100:nth-child(1) > div:nth-child(1) > section:nth-child(1) > a:nth-child(1)");
    this.exploreBenefits = page.locator("div.adjustheight-100:nth-child(2) > div:nth-child(1) > section:nth-child(1) > a:nth-child(1)");
    this.exploreEvents = page.locator("div.col:nth-child(3) > div:nth-child(1) > section:nth-child(1) > a:nth-child(1)");
    this.exploreOMVPMembers = page.locator("div.col:nth-child(4) > div:nth-child(1) > section:nth-child(1) > a:nth-child(1)");
    this.exploreApplicationNomination = page.locator("div.col:nth-child(5) > div:nth-child(1) > section:nth-child(1) > a:nth-child(1)");
  }
}
