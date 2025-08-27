export const carouselLocator = {
  carouselItmes: '.carousel.slide .carousel-item',
  carouselButton : '.carousel.slide .carousel-item a.button',
}

export const loginPageVariables = {
  loginButton: 'Log in',
  registerButton: 'ul > li > a[href="/WorldAccount/AzureRegister/"]',
  registerPageTitle: 'User details',

  optiIDLoginButton: 'ul > li > a[href="/WorldAccount/OptiIDLogIn/"]',
  optiIDLoginPageTitle: 'Optimizely - Sign In',
  optiIDEmailField: '#input27',
  optiIDPasswordField: 'input[type="password"]',
  optiIDKeepSignedInCheckbox: 'label[data-se-for-name="rememberMe"]',
  optiIDNextButton: 'input[value="Next"]',
  optiIDVerifyButton: 'input[value="Verify"]',
  optiIDErrorMessage: 'Unable to sign in',
  optiIDResetPasswordButton: 'a[data-se="forgot-password"]',
  optiIDResetPasswordMessage: 'Reset password is not allowed at this time. Please contact support for assistance.',
  optiIDEmailValue: 'md.shadd@optimizely.com', //using personal email for testing, will be replaced with a test account email
  optiIDWrongEmailValue: 'dummy.user@email.com',
  optiIDPasswordValue: 'Test123!',

  worldAccLoginButton: 'ul > li > a[href="/WorldAccount/AzureLogin/"]',
  worldAccLoginPageTitle: 'Login',
  worldAccUsernameField: '#signInName',
  worldAccPasswordField: '#password',
  worldAccRememberMeCheckbox: 'Remember me',
  worldAccSignInButton: '#next',
  worldAccWrongCredsMessage: 'We can\'t seem to find your account',
  worldAccOptiEmpLoginButton: '#EpiserverAccountSigninExchange',
  worldAccForgotPasswordLink: '#forgotPassword',
  worldAccSignUpButton: '#createAccount',
  userAvatar: '#avatarDropdown',
  worldAccUsername: 'DummyUser',
  worldAccWrongUsernameValue: 'dummy.user',
  worldAccEmailValue: 'jebote6504@kloudis.com', //used tempmail for test email address, mailbox does not exist for this email
  worldAccPasswordValue: 'Test123!',

}

export const cmsOverviewPageVariables = {
  homepageProductsMenu: 'a[href="/products/"]',
  homepageProductCmsSubMenu: 'ul[class="dropdown-menu second"] > li > a[href="/products/cms/overview/"]',
  promoSubtitle: '.promo .contentContainer .content p:nth-of-type(2)',
  promoImg: '.promo .imageContainer .image .lazy',
  colorBlockTitle: '.colourBlockContainer .title .bold',
  colorItemText: '.colourBlocks > .colourBlock:nth-of-type(3) p:nth-of-type(2) > span',
  bloglistingTitle: '.blogListing .title .bold',
  blogTitle: '.blogItem .content .blurb .title',
  carouselTitle: '.carousel-content > h2 >span',
  carouselImg: '.carousel-background .lazy',
  socialMediaColumnTitle: '.columnContainer .title .bold',
  socialMediaLinkedinColumnTitle: '.contentContainer .content .bold',
  forumpostBlockSubtitle: '.latestForumPosts > p',
  forumpostTitle: 'a[href*="proper-way-to-backtrack-published-changes-done-in-bulk" i]',
  columnBlockTitle: '.columnContainer .title .bold',
  columnItemTitle: '.contentContainer .content .bold',
  columnItemImg: '.row .col .block .promo .imageContainer .image .lazy',

}