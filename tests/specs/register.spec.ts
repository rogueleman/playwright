import { test } from '@fixtures/baseTest';
import { generateUniqueUsername } from '@utils/testHelpers';

test.describe('Registration Page Tests', () => {
  test.beforeEach(async ({ registerPage }) => {
    // Navigate to register page before each test
    await registerPage.navigateToRegister();
  });

  test('should display the registration page with all required elements', async ({
    registerPage,
  }) => {
    // Verify registration page is displayed
    await registerPage.verifyRegisterPageDisplayed();

    // Verify page title
    await registerPage.verifyPageTitle();
  });

  test('should successfully register a new user with unique username', async ({
    registerPage,
    loginPage,
    securePage,
  }) => {
    // Generate unique username using format: gmg-{uuid}
    const uniqueUsername = generateUniqueUsername();
    const password = 'SuperSecretPassword!';

    // Step 1: Verify registration page is displayed
    await registerPage.verifyRegisterPageDisplayed();

    // Step 2: Enter unique username
    await registerPage.enterUsername(uniqueUsername);

    // Step 3: Enter password
    await registerPage.enterPassword(password);

    // Step 4: Confirm password
    await registerPage.enterConfirmPassword(password);

    // Step 5: Click register button
    await registerPage.clickRegisterButton();

    // Step 6: Verify successful registration
    await registerPage.verifyRegistrationSuccess();

    // Step 7: Verify we can login with the newly registered credentials
    await loginPage.navigateToLogin();
    await loginPage.verifyLoginPageDisplayed();
    await loginPage.login(uniqueUsername, password);

    // Step 8: Verify we are on the secure page (successful login)
    await securePage.verifySecurePageUrl();
    await securePage.verifySuccessMessage();

    // Step 9: Logout to close the session
    await securePage.clickLogout();
  });
});
