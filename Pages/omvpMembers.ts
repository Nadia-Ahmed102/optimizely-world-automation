import { Page, Locator, expect } from "@playwright/test";

export class OmvpMembersPage {
  readonly page: Page;
  readonly header: Locator;
  readonly homeBreadcrumb: Locator;
  readonly communityBreadcrumb: Locator;
  readonly omvpBreadcrumb: Locator;
  readonly searchInput: Locator;
  readonly tableRows: Locator;
  readonly secondRow: Locator;
  readonly applyTechCTA: Locator;
  readonly applyStrategyCTA: Locator;
  readonly nominateCTA: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header
    this.header = page.locator("h1.bold");

    // Breadcrumbs
    this.homeBreadcrumb = page.locator('#breadcrumbs > span:nth-child(1) > a:nth-child(1)');
    this.communityBreadcrumb = page.locator('#breadcrumbs > a:nth-child(2)');
    this.omvpBreadcrumb = page.locator('#breadcrumbs > a:nth-child(3)');

    // Search and table
    this.searchInput = page.locator("input.form-control:nth-child(1)");
    this.tableRows = page.locator("table#DataTables_Table_0.data-table.dataTable.no-footer.table tbody tr");
    this.secondRow = page.locator("table#DataTables_Table_0 tbody tr.even");

    // CTAs
    this.applyTechCTA = page.locator('div.adjustheight-75:nth-child(1) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(3) > a:nth-child(1)');
    this.applyStrategyCTA = page.locator('div.adjustheight-75:nth-child(1) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(4) > a:nth-child(1)');
    this.nominateCTA = page.locator('div.adjustheight-75:nth-child(2) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(3) > a');
  }

  async goto() {
    await this.page.goto("https://world.optimizely.com/community/omvp/members/");
  }

  async verifyPageTitle() {
    await expect(this.page).toHaveTitle(/OMVP Members | Optimizely Developer Community/);
  }

  async verifyHeader() {
    await expect(this.header).toBeVisible();
    await expect(this.header).toHaveText("OMVP Members");
  }

  async verifyBreadcrumbs() {
    await expect(this.homeBreadcrumb).toHaveText("Home");
    await expect(this.homeBreadcrumb).toHaveAttribute("href", "/");

    await expect(this.communityBreadcrumb).toHaveText("Community");
    await expect(this.communityBreadcrumb).toHaveAttribute("href", "/community/");

    await expect(this.omvpBreadcrumb).toHaveText("OMVP");
    await expect(this.omvpBreadcrumb).toHaveAttribute("href", "/community/omvp/");
  }

  async searchFor(name: string) {
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(name);
  }

  async verifySearchResults(name: string, expectedCount: number) {
    await expect(this.tableRows).toHaveCount(expectedCount);
    for (const row of await this.tableRows.all()) {
      await expect(row).toContainText(name);
    }
    await expect(this.secondRow).toBeVisible();
    await expect(this.secondRow).toContainText(name);
  }

  async verifyCTAs() {
    await expect(this.applyTechCTA).toHaveText("Apply for a Technology OMVP now");
    await expect(this.applyTechCTA).toHaveAttribute("href", "https://forms.office.com/r/0Xim01z897");

    await expect(this.applyStrategyCTA).toHaveText("Apply for a Strategy OMVP now");
    await expect(this.applyStrategyCTA).toHaveAttribute("href", "https://forms.office.com/r/ss0S8q7n34");

    await expect(this.nominateCTA).toHaveText("Nominate now");
    await expect(this.nominateCTA).toHaveAttribute("href", "https://forms.office.com/r/7crUwMLJPh");
  }
}
