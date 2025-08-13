import { test, expect } from "@playwright/test";

test.describe("Optimizely Product Migration - UI and Interaction Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://world.optimizely.com/products/product-migration/");
    await page.waitForLoadState("networkidle");
  });

  test("should display search functionality", async ({ page }) => {
    // Test search widget trigger
    const searchTrigger = page.locator("#searchWidgetTrigger");
    await expect(searchTrigger).toBeVisible();

    // Test interaction with search field
    await searchTrigger.click();
    await searchTrigger.fill("test search");
    await expect(searchTrigger).toHaveValue("test search");
  });

  test("should handle responsive navigation", async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    const navToggle = page.locator(
      'button.navbar-toggler[aria-label="Toggle navigation"]'
    );
    await expect(navToggle).toBeVisible();

    // Click to open mobile menu
    await navToggle.click();

    // Wait for menu animation/transition
    await page.waitForTimeout(500);
  });

  test("should have interactive dropdown elements", async ({ page }) => {
    // Test dropdown caret buttons (though they may be hidden initially)
    const dropdownCarets = page.locator('span.fa-angle-down[role="button"]');
    const count = await dropdownCarets.count();

    if (count > 0) {
      // Test first visible dropdown caret
      const firstCaret = dropdownCarets.first();
      if (await firstCaret.isVisible()) {
        await firstCaret.click();
      }
    }
  });

  test("should display product migration content", async ({ page }) => {
    // Check for main content sections
    await expect(page.locator("body")).toContainText("product migration", {
      ignoreCase: true,
    });

    // Check for "Learn more" links
    const learnMoreLinks = page.locator("a").filter({ hasText: "Learn more" });
    const count = await learnMoreLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should have working contact/feedback functionality", async ({
    page,
  }) => {
    // Test feedback email link
    const feedbackLink = page.locator(
      'a.jsBtnFeedback[href="mailto:epw@optimizely.com"]'
    );
    await expect(feedbackLink).toBeVisible();
    await expect(feedbackLink).toHaveText("click here");
  });

  test("should display proper page structure", async ({ page }) => {
    // Check for main structural elements
    await expect(page.locator("nav, header")).toBeVisible();
    //await expect(page.locator("main, .container, .content")).toBeVisible();
    const containers = page.locator("main, .container, .content").all();
    for (const container of await containers) {
      await expect(container).toBeVisible();
    }
    //await expect(page.locator("footer")).toBeVisible();
    const footers = page.locator("footer").all();
    for (const footer of await footers) {
      await expect(footer).toBeVisible();
    }
  });

  test("should handle hover interactions", async ({ page }) => {
    // Test hover on navigation items
    const productsNav = page
      .locator("a")
      .filter({ hasText: "Products" })
      .first();
    if (await productsNav.isVisible()) {
      await productsNav.hover();
      await page.waitForTimeout(300); // Wait for hover effects
    }

    // Test hover on Learn more buttons
    const learnMoreBtn = page
      .locator("a")
      .filter({ hasText: "Learn more" })
      .first();
    if (await learnMoreBtn.isVisible()) {
      await learnMoreBtn.hover();
      await page.waitForTimeout(300);
    }
  });

  test("should support keyboard navigation", async ({ page }) => {
    // Start keyboard navigation
    await page.keyboard.press("Tab");

    // Check if focus moves to interactive elements
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();

    // Continue tabbing through several elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("Tab");
      const currentFocus = page.locator(":focus");
      await expect(currentFocus).toBeVisible();
    }
  });

  test("should handle form interactions", async ({ page }) => {
    // Test search form if visible
    const searchForm = page.locator("form.navbar-search");
    const searchInput = page.locator("#inlineFormInputGroup");

    if (await searchInput.isVisible()) {
      await searchInput.fill("test query");
      await expect(searchInput).toHaveValue("test query");

      // Test form submission
      const submitButton = page.locator("#epi-search");
      if (await submitButton.isVisible()) {
        await submitButton.click();
      }
    }
  });

  test("should handle back to top functionality", async ({ page }) => {
    // Scroll down to make back-to-top visible
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Look for back to top link
    const backToTop = page.locator('a.backToTop[href*="#top"]');
    if (await backToTop.isVisible()) {
      await backToTop.click();

      // Verify we scrolled back to top
      const scrollPosition = await page.evaluate(() => window.pageYOffset);
      expect(scrollPosition).toBeLessThan(100);
    }
  });
});
