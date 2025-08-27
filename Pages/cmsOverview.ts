import { cmsOverviewPageVariables } from '../support/locators';
import { basePage } from './basePage';
import { Page, Locator } from '@playwright/test';

export class CmsOverviewPage extends basePage{
    readonly page: Page;
    readonly homepageProductsMenu: Locator;
    readonly homepageProductCmsSubMenu: Locator;
    readonly promoSubtitle: Locator;
    readonly promoImg: Locator;
    readonly colorBlockTitle: Locator;
    readonly colorItemText: Locator;
    readonly bloglistingTitle: Locator;
    readonly blogTitle: Locator;
    readonly carouselTitle: Locator;
    readonly carouselImg: Locator;
    readonly socialMediaColumnTitle: Locator;
    readonly socialMediaLinkedinColumnTitle: Locator;
    readonly forumpostBlockSubtitle: Locator;
    readonly forumpostTitle: Locator;
    readonly columnBlockTitle: Locator;
    readonly columnItemTitle: Locator;
    readonly columnItemImg: Locator;


    constructor(page: Page){
        super(page);
        this.page = page;
        this.homepageProductsMenu = page.locator(cmsOverviewPageVariables.homepageProductsMenu);
        this.homepageProductCmsSubMenu = page.locator(cmsOverviewPageVariables.homepageProductCmsSubMenu);
        this.promoSubtitle = page.locator(cmsOverviewPageVariables.promoSubtitle).nth(0);
        this.promoImg = page.locator(cmsOverviewPageVariables.promoImg).nth(0);
        this.colorBlockTitle = page.locator(cmsOverviewPageVariables.colorBlockTitle);
        this.colorItemText = page.locator(cmsOverviewPageVariables.colorItemText);
        this.bloglistingTitle = page.locator(cmsOverviewPageVariables.bloglistingTitle);
        this.blogTitle = page.locator(cmsOverviewPageVariables.blogTitle).nth(3);
        this.carouselTitle = page.locator(cmsOverviewPageVariables.carouselTitle);
        this.carouselImg = page.locator(cmsOverviewPageVariables.carouselImg);
        this.socialMediaColumnTitle = page.locator(cmsOverviewPageVariables.socialMediaColumnTitle).nth(0);
        this.socialMediaLinkedinColumnTitle = page.locator(cmsOverviewPageVariables.socialMediaLinkedinColumnTitle).nth(0);
        this.forumpostBlockSubtitle = page.locator(cmsOverviewPageVariables.forumpostBlockSubtitle);
        this.forumpostTitle = page.locator(cmsOverviewPageVariables.forumpostTitle);
        this.columnBlockTitle = page.locator(cmsOverviewPageVariables.columnBlockTitle).nth(1);
        this.columnItemTitle = page.locator(cmsOverviewPageVariables.columnItemTitle).nth(5);
        this.columnItemImg = page.locator(cmsOverviewPageVariables.columnItemImg).nth(5);

    }
}