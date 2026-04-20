import { test } from '@fixtures/loginFixture';

test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    // Navigate to login page before each test
    await loginPage.navigateToLogin();
  });

  test('should successfully login with valid credentials', async ({ loginPage, securePage }) => {
    // Step 1: Navigate to the login page URL
    await loginPage.navigateToLogin();

    // Step 2: Verify that the login page is displayed successfully
    await loginPage.verifyLoginPageDisplayed();

    // Step 3: Enter Username: practice
    await loginPage.enterUsername('practice');

    // Step 4: Enter Password: SuperSecretPassword!
    await loginPage.enterPassword('SuperSecretPassword!');

    // Step 5: Click the Login button
    await loginPage.clickLoginButton();

    // Step 6: Verify that the user is redirected to the /secure page
    await securePage.verifySecurePageUrl();

    // Step 7: Confirm the success message "You logged into a secure area!" is visible
    await securePage.verifySuccessMessage();

    // Step 8: Verify that a Logout button is displayed
    await securePage.verifyLogoutButtonVisible();

    // Step 9: Logout to close the session
    await securePage.clickLogout();
  });

  test('should display error message with invalid username', async ({ loginPage }) => {
    // Enter invalid credentials
    await loginPage.enterUsername('invaliduser123');
    await loginPage.enterPassword('wrongpassword');

    // Click login button
    await loginPage.clickLoginButton();

    // Verify the specific error message "Your username is invalid!" is displayed
    await loginPage.verifyErrorMessageText('Your username is invalid!');
  });
});
