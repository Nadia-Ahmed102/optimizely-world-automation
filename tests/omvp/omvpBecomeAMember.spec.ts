import { test, expect } from '@playwright/test';
import { OmvpPage } from '../../Pages/omvpBecomeAMember';

test.describe('OMVP Page Tests', () => {

  // Test 1: Page Title
  test('OMVP become a member page should have expected title', async ({ page }) => {
    await page.goto('https://world.optimizely.com/community/omvp/become-a-member/');
    await expect(page).toHaveTitle(/Become a Member | Optimizely Developer Community/);
  });

  // Test 2: Header Verification
  test('Header Verification', async ({ page }) => {
    const omvpPage = new OmvpPage(page);
    await omvpPage.navigate();
    await omvpPage.verifyHeader('Become an OMVP');
  });

  // Test 3: Requirement Accordion Verification
  test('Requirement Accordion Verification', async ({ page }) => {
    const omvpPage = new OmvpPage(page);
    await omvpPage.navigate();
    await omvpPage.expandQuestionsHelpedAccordion();
    await omvpPage.verifyQuestionsHelpedParagraph(
      'We value the quality of the answers and the help that our community provides to each other. This is one of the basic contributions we expect from our OMVPs.'
    );
  });

  // Test 4: Application & Nomination CTAs Verification
  test('Application & Nomination CTAs Verification', async ({ page }) => {
    const omvpPage = new OmvpPage(page);
    await omvpPage.navigate();
    await omvpPage.verifyTechnologyCTA('https://forms.office.com/r/0Xim01z897');
    await omvpPage.verifyStrategyCTA('https://forms.office.com/r/ss0S8q7n34');
    await omvpPage.verifyNominateCTA('https://forms.office.com/r/7crUwMLJPh');
  });

});
