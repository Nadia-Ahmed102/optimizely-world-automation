import { test, expect } from "@playwright/test";
import { basePage } from "../../Pages/basePage";

test("test", async ({ page }) => {
  await page.goto("https://world.optimizely.com/");

  //TODO:attempt to implement event listener from basePage
  //const basePageInstance = new basePage(page);
  //await basePageInstance.listenForResponseErrors();

  //here is a local (to this class) event listener for response errors
  // Listen for network requests - in this case
  page.on("request", (request) => {
    if (request.url().includes("challenges.cloudflare.com")) {
      //I'd like to log a message about the captcha and then fail the test immediately without continuing to loop thru any other requests
      console.log("Detected request to:", request.url());
      //throw new Error("Fail: Encountered the cloudflare captcha");
      process.exit(1);
    }
  });

  // Wait for the span with text "AI Button" to be visible
  const aiToggle = page.locator('span:text("AI On")');
  test.setTimeout(3000000);
  await expect(aiToggle).toBeVisible();

  //Click the span to turn AI "Off"
  await aiToggle.click();

  console.log("✅ AI is Off successfully");

  const searchInput = page.locator('input[placeholder="Search World"]');
  await searchInput.click();
  await searchInput.fill("Optimizely");
  await page.keyboard.press("Enter");
  test.setTimeout(3000000);

  /*
    if (await page.title().then(title => title.includes('Just a moment..    .'))) {
    // Handle the modal
      throw new Error('Fail: Encountered the cloudflare captcha');

    } else {
    // Continue with actions assuming no modal
        await page.waitForLoadState('domcontentloaded');
        await page.waitForLoadState('networkidle');

    }
*/
});
