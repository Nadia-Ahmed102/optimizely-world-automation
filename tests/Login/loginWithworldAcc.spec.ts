import { loginPageVariables } from "../../support/locators";
import { test, expect } from "../fixtures";
import { LoginPage } from "../../Pages/LoginPage";

let loginVar = loginPageVariables;

test.beforeEach(async ({ loginPage }) => {
  // Navigate to the home page
  loginPage = new LoginPage(loginPage.page);
  await loginPage.navigateToHome();

  // Hover over the login button
  await loginPage.hoverOverelement(loginPage.loginButton);
});

test("Verify if the user can navigate to the World Account login page", async ({
  loginPage,
}) => {
  // Click on the World Account login button
  await loginPage.clickButton(loginPage.worldAccLoginButton);

  // Verify World Account login page title
  await expect(loginPage.page).toHaveTitle(loginVar.worldAccLoginPageTitle);
});

test("Verify user can log in with World Account", async ({ loginPage }) => {
  // Click on the World Account login button
  await loginPage.clickButton(loginPage.worldAccLoginButton);

  // Verify World Account login page title
  await expect(loginPage.page).toHaveTitle(loginVar.worldAccLoginPageTitle);

  // Provide input in the username field
  await loginPage.provideInputInField(
    loginPage.worldAccUsernameField,
    loginVar.worldAccEmailValue
  );

  // Provide input in the password field
  await loginPage.provideInputInField(
    loginPage.worldAccPasswordField,
    loginVar.worldAccPasswordValue
  );

  // Check the "Remember me" checkbox
  await loginPage.clickButton(loginPage.worldAccRememberMeCheckbox);

  // Click on the "Sign In" button
  await loginPage.clickButton(loginPage.worldAccSignInButton);

  // Verify user is logged in by checking the user avatar
  await loginPage.clickButton(loginPage.userAvatar);
  await expect(loginPage.worldAccUsername).toBeVisible();
});

test('Verify user can not log in with World Account and "Forgot password?" behavior', async ({
  loginPage,
}) => {
  // Click on the World Account login button
  await loginPage.clickButton(loginPage.worldAccLoginButton);

  // Verify World Account login page title
  await expect(loginPage.page).toHaveTitle(loginVar.worldAccLoginPageTitle);

  // Provide input in the username field
  await loginPage.provideInputInField(
    loginPage.worldAccUsernameField,
    loginVar.worldAccWrongUsernameValue
  );

  // Provide input in the password field
  await loginPage.provideInputInField(
    loginPage.worldAccPasswordField,
    loginVar.worldAccPasswordValue
  );

  // Check the "Remember me" checkbox
  await loginPage.clickButton(loginPage.worldAccRememberMeCheckbox);

  // Click on the "Sign In" button
  await loginPage.clickButton(loginPage.worldAccSignInButton);

  // Verify wrong creds message [as no dummy user is currently available]
  await expect(loginPage.worldAccWrongCredsMessage).toBeVisible();

  // Click on the "Forgot password?" link
  await loginPage.clickButton(loginPage.worldAccForgotPasswordLink);

  // Verify reset password URL [as the page is empty at the moment]
  await expect(loginPage.page).toHaveURL(/azure-signin-oidc/);
});

test("Verify user can navigate to Oplimizely Employee login page from World Account login page", async ({
  loginPage,
}) => {
  // Click on the World Account login button
  await loginPage.clickButton(loginPage.worldAccLoginButton);

  // Verify World Account login page title
  await expect(loginPage.page).toHaveTitle(loginVar.worldAccLoginPageTitle);

  // Click on the Optimizely Employee login button
  await loginPage.clickButton(loginPage.worldAccOptiEmpLoginButton);

  // Verify Optimizely Employee login page URL
  await expect(loginPage.page).toHaveURL(/login\.microsoftonline\.com/);
});

test("Verify user can sign up from World Account login page", async ({
  loginPage,
}) => {
  // Click on the World Account login button
  await loginPage.clickButton(loginPage.worldAccLoginButton);

  // Verify World Account login page title
  await expect(loginPage.page).toHaveTitle(loginVar.worldAccLoginPageTitle);

  // Click on the register button
  await loginPage.clickButton(loginPage.worldAccSignUpButton);

  // Verify registration page URL
  await expect(loginPage.page).toHaveTitle(loginVar.registerPageTitle);
});
