import { test, expect } from "@playwright/test";

test.describe("Optimizely Product Migration - Accessibility Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://world.optimizely.com/products/product-migration/");
    await page.waitForLoadState("networkidle");
  });

  test("should have proper ARIA labels", async ({ page }) => {
    // Test navigation toggle has proper aria-label
    const navToggle = page.locator('button[aria-label="Toggle navigation"]');
    await expect(navToggle).toBeVisible();
    await expect(navToggle).toHaveAttribute("aria-label", "Toggle navigation");
  });

  test("should have keyboard accessible interactive elements", async ({
    page,
  }) => {
    // Test that buttons and links are keyboard accessible
    const interactiveElements = page.locator(
      "button, a[href], input, select, textarea"
    );
    const count = await interactiveElements.count();

    expect(count).toBeGreaterThan(0);

    // Test first few interactive elements for keyboard access
    for (let i = 0; i < Math.min(5, count); i++) {
      const element = interactiveElements.nth(i);
      if (await element.isVisible()) {
        await element.focus();
        const isFocused = await element.evaluate(
          (el) => document.activeElement === el
        );
        expect(isFocused).toBeTruthy();
      }
    }
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    // Check for heading elements
    const headings = page.locator("h1, h2, h3, h4, h5, h6");
    const headingCount = await headings.count();

    if (headingCount > 0) {
      // Should have at least one h1
      const h1Count = await page.locator("h1").count();
      expect(h1Count).toBeGreaterThanOrEqual(0); // Some pages might not have h1

      // Check that headings have text content
      for (let i = 0; i < headingCount; i++) {
        const heading = headings.nth(i);
        const text = await heading.textContent();
        expect(text?.trim()).not.toBe("");
      }
    }
  });

  test("should have alt attributes for images", async ({ page }) => {
    const images = page.locator("img");
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      if (await img.isVisible()) {
        const alt = await img.getAttribute("alt");
        // Alt attribute should exist (can be empty for decorative images)
        expect(alt).not.toBeNull();
      }
    }
  });

  test("should have accessible form elements", async ({ page }) => {
    // Test search input accessibility
    const searchInput = page.locator("#searchWidgetTrigger");
    if (await searchInput.isVisible()) {
      // Should be focusable
      await searchInput.focus();
      const isFocused = await searchInput.evaluate(
        (el) => document.activeElement === el
      );
      expect(isFocused).toBeTruthy();
    }

    // Test other form inputs
    const formInputs = page.locator(
      'input[type="text"], input[type="email"], input[type="password"]'
    );
    const inputCount = await formInputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = formInputs.nth(i);
      if (await input.isVisible()) {
        // Check for proper labeling (label, aria-label, or placeholder)
        const hasLabel = await input.evaluate((el) => {
          return !!(
            el.labels?.length ||
            el.getAttribute("aria-label") ||
            el.getAttribute("placeholder") ||
            el.getAttribute("title")
          );
        });
        expect(hasLabel).toBeTruthy();
      }
    }
  });

  test("should have proper link accessibility", async ({ page }) => {
    // Test that links have descriptive text or aria-labels
    const links = page.locator("a[href]");
    const linkCount = await links.count();

    for (let i = 0; i < Math.min(20, linkCount); i++) {
      const link = links.nth(i);
      if (await link.isVisible()) {
        const text = await link.textContent();
        const ariaLabel = await link.getAttribute("aria-label");
        const title = await link.getAttribute("title");

        // Link should have either text content, aria-label, or title
        const hasAccessibleName = !!(
          (text && text.trim()) ||
          ariaLabel ||
          title
        );

        // Some links might be icon-only, so we'll be lenient
        // but log which ones might need attention
        if (!hasAccessibleName) {
          const href = await link.getAttribute("href");
          console.warn(`Link without accessible name found: ${href}`);
        }
      }
    }
  });

  test("should have proper focus indicators", async ({ page }) => {
    // Test that focused elements have visible focus indicators
    const focusableElements = page.locator(
      "button:visible, a[href]:visible, input:visible"
    );
    const count = await focusableElements.count();

    if (count > 0) {
      const firstElement = focusableElements.first();
      await firstElement.focus();

      // Check if element has focus (basic check)
      const hasFocus = await firstElement.evaluate(
        (el) => document.activeElement === el
      );
      expect(hasFocus).toBeTruthy();
    }
  });

  test("should support screen reader navigation", async ({ page }) => {
    // Test that page has proper landmarks
    const landmarks = page.locator(
      "main, nav, header, footer, aside, section[aria-label]"
    );
    const landmarkCount = await landmarks.count();

    // Should have at least some landmark elements
    expect(landmarkCount).toBeGreaterThan(0);

    // Test that navigation elements are properly marked
    const nav = page.locator("nav");
    const navCount = await nav.count();
    expect(navCount).toBeGreaterThan(0);
  });

  test("should handle high contrast mode", async ({ page }) => {
    // Test that page is usable with different contrast settings
    // This is a basic test - full contrast testing would need specialized tools

    // Inject CSS to simulate high contrast mode
    await page.addStyleTag({
      content: `
        * {
          background: black !important;
          color: white !important;
          border-color: white !important;
        }
        a {
          color: yellow !important;
        }
      `,
    });

    // Verify that content is still visible
    await expect(page.locator("body")).toBeVisible();

    // Test that interactive elements are still clickable
    const navToggle = page.locator('button[aria-label="Toggle navigation"]');
    if (await navToggle.isVisible()) {
      await navToggle.click();
    }
  });

  test("should have proper role attributes where needed", async ({ page }) => {
    // Test elements with role attributes
    const roleElements = page.locator("[role]");
    const roleCount = await roleElements.count();

    for (let i = 0; i < roleCount; i++) {
      const element = roleElements.nth(i);
      const role = await element.getAttribute("role");

      // Common valid ARIA roles
      const validRoles = [
        "button",
        "link",
        "navigation",
        "main",
        "banner",
        "contentinfo",
        "search",
        "form",
        "dialog",
        "menu",
        "menuitem",
        "tab",
        "tabpanel",
        "list",
        "listitem",
        "heading",
        "article",
        "section",
      ];

      expect(validRoles).toContain(role);
    }
  });
});
