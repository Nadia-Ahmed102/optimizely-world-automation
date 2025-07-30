import { loginPageVariables } from '../../support/locators';
import { test, expect } from '../fixtures';
import { LoginPage } from "../../Pages/LogIn";

let loginVar = loginPageVariables;


test.beforeEach(async ({ loginPage }) => {

  // Navigate to the home page
  loginPage = new LoginPage(loginPage.page);
  await loginPage.navigateToHome();

  // Hover over the login button
  await loginPage.hoverOverelement(loginPage.loginButton);
});

test('Verify if the user can navigate to the Opti ID login page', async ({ loginPage }) => {

  // Click on the Opti ID login button
  await loginPage.clickButton(loginPage.optiIDLoginButton);

  // Verify Opti ID login page title
  await expect(loginPage.page).toHaveTitle(loginVar.optiIDLoginPageTitle);
});

test('Verify if the user can log in with Opti ID', async ({ loginPage }) => {

  // Click on the Opti ID login button
  await loginPage.clickButton(loginPage.optiIDLoginButton);

  // Verify Opti ID login page title
  await expect(loginPage.page).toHaveTitle(loginVar.optiIDLoginPageTitle);

  // Provide input in the email field
  await loginPage.provideInputInField(loginPage.optiIDEmailField, loginVar.optiIDEmailValue);

  // Check the "Keep me signed in" checkbox
  await loginPage.clickButton(loginPage.optiIDKeepSignedInCheckbox);

  // Click on the "Next" button
  await loginPage.clickButton(loginPage.optiIDNextButton);

  // Verify auth page URL
  await expect(loginPage.page).toHaveURL(/app\/okta_org2org\//);

});

test('Verify user can not log in with Opti ID using wrong credentials', async ({ loginPage }) => {

  // Click on the Opti ID login button
  await loginPage.clickButton(loginPage.optiIDLoginButton);

  // Verify Opti ID login page title
  await expect(loginPage.page).toHaveTitle(loginVar.optiIDLoginPageTitle);

  // Provide input in the email field with wrong credentials
  await loginPage.provideInputInField(loginPage.optiIDEmailField, loginVar.optiIDWrongEmailValue);

  // Click on the "Verify" button
  await loginPage.clickButton(loginPage.optiIDNextButton);

  // Provide input in the password field with wrong credentials
  await loginPage.provideInputInField(loginPage.optiIDPasswordField, loginVar.optiIDPasswordValue);

  // Click on the "Verify" button
  await loginPage.clickButton(loginPage.optiIDVerifyButton);

  // Verify that the error message is displayed
  await expect(loginPage.optiIDErrorMessage).toBeVisible();

  // Verify "Reset password" functionality
  // Veifying it in here as it may change in the future
  await loginPage.clickButton(loginPage.optiIDResetPasswordButton);
  await expect(loginPage.optiIDResetPasswordMessage).toBeVisible();

});
