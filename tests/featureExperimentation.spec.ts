import { test, expect } from '@playwright/test';
import { FeatureExperimentationPage } from '../Pages/featureExperimentation';

test.beforeEach(async ({ page }) => {
  const featurePage = new FeatureExperimentationPage(page);
  await featurePage.navigate();
  test.info().annotations.push({ type: 'featurePage', description: 'Feature Experimentation Page POM loaded' });
});

test('The Feature Experimentation page should load and have correct title', async ({ page }) => {
  await page.goto('https://world.optimizely.com/products/feature-experimentation/overview/');
  await expect(page).toHaveTitle(/Optimizely Web Experimentation | Optimizely Developer Community/);
});

test('The Hero section should display correct title, description, and image', async ({ page }) => {
  const featurePage = new FeatureExperimentationPage(page);
  await expect(featurePage.heroTitle).toHaveText(/FEATURE EXPERIMENTATION/);
  await expect(featurePage.headerText).toContainText('Deliver new experiences with more');
  await expect(featurePage.description).toContainText(
    'Innovate your whole product lifecycle with higher quality releases, safer tests, and faster feature validations.'
  );

  const srcset = await featurePage.heroImage.getAttribute('srcset');
  const src = await featurePage.heroImage.getAttribute('src');
  expect(
    srcset?.includes('/globalassets/products/fullstack.png 769w') ||
    srcset?.includes('/globalassets/products/fullstack.png 4000w') ||
    src === '/globalassets/products/fullstack.png'
  ).toBeTruthy();
});

test('The Connect with Optimizely users section should have correct heading and CTA links', async ({ page }) => {
  const featurePage = new FeatureExperimentationPage(page);

  await expect(featurePage.connectSectionHeading).toHaveText('Connect with Optimizely users around the world');

  expect(await featurePage.readNowCTA.getAttribute('href')).toBe(
    '/Search/?searchQuery=experimentation&currentPage=1&sortByDate=True&sectionFilter=Blogs&authorFilter=&forumFilter='
  );
  expect(await featurePage.joinNowCTA.getAttribute('href')).toBe(
    'https://join.slack.com/t/optimizely-community/shared_invite/zt-2nkth5i5c-oFVarlrwAUyyQofKWDjsqw'
  );
  expect(await featurePage.exploreNowCTA.getAttribute('href')).toBe('/forum/');
  expect(await featurePage.learnNowCTA.getAttribute('href')).toBe('https://academy.optimizely.com/');
});

test('The Latest Community Articles section should show correct description and CTA', async ({ page }) => {
  const featurePage = new FeatureExperimentationPage(page);

  await expect(featurePage.latestArticlesHeader).toBeVisible();
  await expect(featurePage.latestArticlesDescription).toHaveText('Take a look at the latest blogs from our community.');
  expect(await featurePage.seeAllArticlesCTA.getAttribute('href')).toBe('/blogs/');
});

test('Roadmap section: title, description and CTA', async ({ page }) => {
  const featurePage = new FeatureExperimentationPage(page);

  await featurePage.roadmapSection.waitFor({ state: 'visible', timeout: 10000 });

  const title = (await featurePage.roadmapTitle.textContent())?.replace(/\s+/g, ' ').trim();
  expect(title).toBe('Introducing the roadmap for Optimizely Feature Experimentation.');

  const desc = (await featurePage.roadmapDescription.textContent())?.replace(/\s+/g, ' ').trim();
  expect(desc).toContain(
    'Check out all the latest-and-greatest coming (and recently released) to Optimizely Feature Experimentation.'
  );

  const href = await featurePage.roadmapCTA.getAttribute('href');
  expect(href).toContain('https://www.optimizely.com/product-updates/feature-experimentation/');
});

test('Delve deeper into Optimizely Feature Experimentation section should have correct title and CTA links', async ({ page }) => {
  const featurePage = new FeatureExperimentationPage(page);

  await expect(featurePage.delveSection).toBeVisible();
  await expect(featurePage.delveSectionTitle).toHaveText('Delve deeper into Optimizely Feature Experimentation');
  await expect(featurePage.devDocsCTA).toBeVisible();
  await expect(featurePage.userGuideCTA).toBeVisible();
  await expect(featurePage.technicalCTA).toBeVisible();
});
