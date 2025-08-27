import { cmsOverviewPageVariables } from '../../support/locators';
import { test, expect } from '../fixtures';
import { CmsOverviewPage } from "../../Pages/cmsOverview";
import { CsvReader } from '../../Utils/CsvReader';

let cmsOverviewVar = cmsOverviewPageVariables;
let testData: Map<string, string>;

test.beforeEach(async ({ cmsOverviewPage }) => {

    // Navigate to Home page
    cmsOverviewPage = new CmsOverviewPage(cmsOverviewPage.page);
    await cmsOverviewPage.navigateToHome();

    // Hover over the Products menu
    await cmsOverviewPage.hoverOverelement(cmsOverviewPage.homepageProductsMenu);

    // Click on the CMS sub-menu
    await cmsOverviewPage.clickButton(cmsOverviewPage.homepageProductCmsSubMenu);
});

test('Verify if there is any broken URLs on the CMS Overview page', async ({ cmsOverviewPage }) => {

    test.setTimeout(180000); // Setting a longer timeout for this specific test

    // Check for broken URLs on the CMS Overview page
    await cmsOverviewPage.validateURLsOnCurrentPage('CmsOverview');
});

test('Verify if the CMS Overview page has correct UI contents', async ({ cmsOverviewPage }) => {

    // Read the test data directly in the test file
    const dataMap = CsvReader.readKeyValueCsv('cmsOverviewUiContents.csv');

    for (const [key, value] of dataMap) {
        switch (key) {
            case 'promo_subtitle':
                await expect(cmsOverviewPage.promoSubtitle).toHaveText(value);
                break;
            case 'promo_img':
                await expect(cmsOverviewPage.promoImg).toHaveAttribute('data-src', value);
                break;
            case 'color_block_title':
                await expect(cmsOverviewPage.colorBlockTitle).toHaveText(value);
                break;
            case 'color_item_text':
                await expect(cmsOverviewPage.colorItemText).toHaveText(value);
                break;
            case 'blog_listing_title':
                await expect(cmsOverviewPage.bloglistingTitle).toHaveText(value);
                break;
            case 'blog_title':
                await expect(cmsOverviewPage.blogTitle).toHaveText(value);
                break;
            case 'carousel_title':
                await expect(cmsOverviewPage.carouselTitle).toHaveText(value);
                break;
            case 'carousel_img':
                await expect(cmsOverviewPage.carouselImg).toHaveAttribute('data-src', value);
                break;
            case 'social_media_column_title':
                await expect(cmsOverviewPage.socialMediaColumnTitle).toHaveText(value);
                break;
            case 'social_media_linkedin_column_title':
                await expect(cmsOverviewPage.socialMediaLinkedinColumnTitle).toHaveText(value);
                break;
            
            // Could not locate Forumpost Block elements
            // case 'forumpost_block_subtitle':
            //     await expect(cmsOverviewPage.forumpostBlockSubtitle).toHaveText(value);
            //     break;
            // case 'forumpost_title':
            //     await expect(cmsOverviewPage.forumpostTitle).toHaveText(value);
            //     break;
            
            case 'column_block_title':
                await expect(cmsOverviewPage.columnBlockTitle).toHaveText(value);
                break;
            case 'column_item_title':
                await expect(cmsOverviewPage.columnItemTitle).toHaveText(value);
                break;
            case 'column_item_img':
                await expect(cmsOverviewPage.columnItemImg).toHaveAttribute('data-src', value);
                break;
            default:
                console.log(`Warning: No locator defined for key "${key}". Skipping verification.`);
                break;
        }
    }

});