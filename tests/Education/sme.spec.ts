import { test, expect } from "@playwright/test";
import { SmePage } from "../../Pages/SmePage";

test.describe("Optimizely SME Program Page", () => {
  let smePage: SmePage;

  test.beforeEach(async ({ page }) => {
    smePage = new SmePage(page);
    await page.goto("https://world.optimizely.com/education/sme/");
  });

  test("should load the SME program page successfully", async ({ page }) => {
    await expect(page).toHaveTitle(/Optimizely Subject Matter Expert/);
    await expect(page).toHaveURL("https://world.optimizely.com/education/sme/");
  });

  test("should display main headings", async () => {
    const headings = await smePage.getAllHeadings();
    expect(headings).toEqual(
      expect.arrayContaining([
        "Optimizely Subject Matter Expert (SME) program",
        "Our Program",
        "SME Members",
        "Categories",
        "Qualifications",
        "Benefits",
      ])
    );
  });

  test("should have a search form", async () => {
    await expect(smePage.searchInput).toBeVisible();
    const placeholder = await smePage.getSearchPlaceholder();
    expect(placeholder).toBe("Search World");
  });

  test("should have navigation links", async () => {
    const navLinks = await smePage.getNavLinksText();
    expect(navLinks).toEqual(
      expect.arrayContaining([
        "Products",
        "Content Marketing Platform",
        "Content Management System",
        "Web Experimentation",
        "Feature Experimentation",
      ])
    );
  });

  test("should have SME member images", async () => {
    const alts = await smePage.getMemberImageAlts();
    expect(alts.length).toBeGreaterThan(0);
  });
});
