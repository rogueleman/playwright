import { Page, Locator, expect } from '@playwright/test';
import { AuthPage } from './AuthPage';
import { PATHS } from '@config/constants';

/**
 * Page Object Model for Login Page at practice.expandtesting.com/login
 * Encapsulates all selectors and interactions for the login page
 * Extends AuthPage to inherit common authentication form elements and methods
 */
export class LoginPage extends AuthPage {
  // Login-specific locators using smart locator strategies
  readonly pageHeading: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading');
    this.loginButton = page.getByRole('button', { name: /login/i });
  }

  /**
   * Navigate to the login page
   */
  async navigateToLogin(): Promise<void> {
    await this.goto(PATHS.LOGIN);
  }

  /**
   * Perform login with username and password
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    // Playwright auto-waits for navigation; no explicit wait needed
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Verify login page is displayed
   */
  async verifyLoginPageDisplayed(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await this.waitForElement('button[type="submit"]');
  }

  /**
   * Verify a specific error message is displayed
   */
  async verifyErrorMessageText(expectedMessage: string): Promise<void> {
    const errorMessageLocator = this.page.getByText(expectedMessage);
    await expect(errorMessageLocator).toBeVisible();
  }

  /**
   * Verify page title contains login
   */
  async verifyPageTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(/login|sign in/i);
  }
}
