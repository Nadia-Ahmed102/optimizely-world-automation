import { test } from "@playwright/test";
import { OmvpMembersPage } from "../../Pages/omvpMembers";

test.describe("OMVP Members Page Tests", () => {

  test.beforeEach(async ({ page }) => {
    const omvpMembers = new OmvpMembersPage(page);
    await omvpMembers.goto();
  });

  test("OMVP Members page should have expected title", async ({ page }) => {
    const omvpMembers = new OmvpMembersPage(page);
    await omvpMembers.verifyPageTitle();
  });

  test("OMVP Members page hero text should be correct", async ({ page }) => {
    const omvpMembers = new OmvpMembersPage(page);
    await omvpMembers.verifyHeader();
  });

  test("OMVP Members page breadcrumbs should be correct", async ({ page }) => {
    const omvpMembers = new OmvpMembersPage(page);
    await omvpMembers.verifyBreadcrumbs();
  });

  test("Search for 'Chris' should show two results", async ({ page }) => {
    const omvpMembers = new OmvpMembersPage(page);
    await omvpMembers.searchFor("Chris");
    await omvpMembers.verifySearchResults("Chris", 2);
  });

  test("OMVP Members page Application and Nomination CTAs should redirect correctly", async ({ page }) => {
    const omvpMembers = new OmvpMembersPage(page);
    await omvpMembers.verifyCTAs();
  });

});
