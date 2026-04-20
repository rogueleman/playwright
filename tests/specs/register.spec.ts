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

  test('should have username input field', async ({ registerPage }) => {
    // Use the inherited method from AuthPage
    await registerPage.verifyUsernameFieldVisible();
  });

  test('should have password input field', async ({ registerPage }) => {
    // Use the inherited method from AuthPage
    await registerPage.verifyPasswordFieldVisible();
  });

  test('should have confirm password input field', async ({ registerPage }) => {
    // Verify confirm password input is visible
    await registerPage.verifyConfirmPasswordFieldVisible();
  });

  test('should be able to enter text in username field', async ({ registerPage }) => {
    // Generate unique username
    const testUsername = generateUniqueUsername();

    // Use the inherited method from AuthPage
    await registerPage.verifyUsernameInputFunctionality(testUsername);
  });

  test('should be able to enter text in password field', async ({ registerPage }) => {
    // Enter password using inherited method
    const testPassword = 'TestPassword123!';
    await registerPage.verifyPasswordInputFunctionality(testPassword);
  });

  test('should be able to enter text in confirm password field', async ({ registerPage }) => {
    // Enter confirm password
    const testPassword = 'ConfirmPassword123!';
    await registerPage.verifyConfirmPasswordInputFunctionality(testPassword);
  });
});
