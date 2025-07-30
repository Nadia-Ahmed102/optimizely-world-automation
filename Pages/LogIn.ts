import { loginPageVariables } from '../support/locators';
import { basePage } from './basePage';
import { Page, Locator } from '@playwright/test';

export class LoginPage extends basePage {
    readonly page: Page;
    readonly loginButton: Locator;
    readonly registerButton: Locator;
    
    readonly optiIDLoginButton: Locator;
    readonly optiIDEmailField: Locator;
    readonly optiIDPasswordField: Locator;
    readonly optiIDKeepSignedInCheckbox: Locator;
    readonly optiIDNextButton: Locator;
    readonly optiIDVerifyButton: Locator;
    readonly optiIDErrorMessage: Locator;
    readonly optiIDResetPasswordButton: Locator;
    readonly optiIDResetPasswordMessage: Locator;

    readonly worldAccLoginButton: Locator;
    readonly worldAccUsernameField: Locator;
    readonly worldAccPasswordField: Locator;
    readonly worldAccRememberMeCheckbox: Locator;
    readonly worldAccSignInButton: Locator;
    readonly worldAccWrongCredsMessage: Locator;
    readonly worldAccOptiEmpLoginButton: Locator;
    readonly worldAccForgotPasswordLink: Locator;
    readonly worldAccSignUpButton: Locator;
    readonly userAvatar: Locator;
    readonly worldAccUsername: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.loginButton = page.getByText(loginPageVariables.loginButton);
        this.registerButton = page.locator(loginPageVariables.registerButton);
        
        this.optiIDLoginButton = page.locator(loginPageVariables.optiIDLoginButton);
        this.optiIDEmailField = page.locator(loginPageVariables.optiIDEmailField);
        this.optiIDPasswordField = page.locator(loginPageVariables.optiIDPasswordField);
        this.optiIDKeepSignedInCheckbox = page.locator(loginPageVariables.optiIDKeepSignedInCheckbox);
        this.optiIDNextButton = page.locator(loginPageVariables.optiIDNextButton);
        this.optiIDVerifyButton = page.locator(loginPageVariables.optiIDVerifyButton);
        this.optiIDErrorMessage = page.getByText(loginPageVariables.optiIDErrorMessage);
        this.optiIDResetPasswordButton = page.locator(loginPageVariables.optiIDResetPasswordButton);
        this.optiIDResetPasswordMessage = page.getByText(loginPageVariables.optiIDResetPasswordMessage);
        
        this.worldAccLoginButton = page.locator(loginPageVariables.worldAccLoginButton);
        this.worldAccUsernameField = page.locator(loginPageVariables.worldAccUsernameField);
        this.worldAccPasswordField = page.locator(loginPageVariables.worldAccPasswordField);
        this.worldAccRememberMeCheckbox = page.getByText(loginPageVariables.worldAccRememberMeCheckbox);
        this.worldAccSignInButton = page.locator(loginPageVariables.worldAccSignInButton);
        this.worldAccWrongCredsMessage = page.getByText(loginPageVariables.worldAccWrongCredsMessage);
        this.worldAccOptiEmpLoginButton = page.locator(loginPageVariables.worldAccOptiEmpLoginButton);
        this.worldAccForgotPasswordLink = page.locator(loginPageVariables.worldAccForgotPasswordLink);
        this.worldAccSignUpButton = page.locator(loginPageVariables.worldAccSignUpButton);
        this.userAvatar = page.locator(loginPageVariables.userAvatar);
        this.worldAccUsername = page.getByText(loginPageVariables.worldAccUsername);
    
    }

}
