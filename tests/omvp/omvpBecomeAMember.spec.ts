import { test, expect } from '@playwright/test';
// import { omvpPage } from "../../Pages/omvpPage";
import { OmvpPage } from '../../Pages/omvpBecomeAMember';

test.describe('OMVP Page Tests', () => {

  test('OMVP become a member page should have expected title', async ({ page }) => {
    await page.goto('https://world.optimizely.com/community/omvp/become-a-member/');
    await expect(page).toHaveTitle(/Become a Member | Optimizely Developer Community/);
  });

  test('Hero Text Verification', async ({ page }) => {
    const omvpPage = new OmvpPage(page);
    await omvpPage.navigate();
    await omvpPage.verifyHeader('Become an OMVP');
  });

  test('Requirement Accordion Verification', async ({ page }) => {
    const omvpPage = new OmvpPage(page);
    await omvpPage.navigate();
    await omvpPage.expandQuestionsHelpedAccordion();
    await omvpPage.verifyQuestionsHelpedParagraph(
      'We value the quality of the answers and the help that our community provides to each other. This is one of the basic contributions we expect from our OMVPs.'
    );
  });

  test('Application & Nomination CTAs Verification', async ({ page }) => {
    const omvpPage = new OmvpPage(page);
    await omvpPage.navigate();
    await omvpPage.verifyTechnologyCTA('https://forms.office.com/r/0Xim01z897');
    await omvpPage.verifyStrategyCTA('https://forms.office.com/r/ss0S8q7n34');
    await omvpPage.verifyNominateCTA('https://forms.office.com/r/7crUwMLJPh');
  });

});
