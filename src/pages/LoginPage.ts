import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for Login Page at practice.expandtesting.com
 * Encapsulates all selectors and interactions for the login page
 */
export class LoginPage extends BasePage {
  // Page locators
  readonly pageHeading: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('h1, h2');
    this.usernameInput = page.locator('#username, input[name="username"], input[placeholder*="Username" i]');
    this.passwordInput = page.locator('#password, input[name="password"], input[placeholder*="Password" i]');
    this.loginButton = page.locator('button:has-text("Login"), button[type="submit"]');
    this.errorMessage = page.locator('.error, .alert-danger, [class*="error"]');
    this.successMessage = page.locator('.success, .alert-success, [class*="success"]');
  }

  /**
   * Navigate to the login page
   */
  async navigateToLogin(): Promise<void> {
    await this.goto('/login');
  }

  /**
   * Perform login with username and password
   */
  async login(username: string, password: string): Promise<void> {
    await this.fillInput('#username', username);
    await this.fillInput('#password', password);
    await this.click('button[type="submit"]');
    // Wait for page load after login
    await this.page.waitForLoadState('load');
  }

  /**
   * Enter username
   */
  async enterUsername(username: string): Promise<void> {
    await this.fillInput('#username', username);
  }

  /**
   * Enter password
   */
  async enterPassword(password: string): Promise<void> {
    await this.fillInput('#password', password);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    await this.click('button[type="submit"]');
  }

  /**
   * Verify login page is displayed
   */
  async verifyLoginPageDisplayed(): Promise<void> {
    await this.waitForElement('#username');
    await this.waitForElement('#password');
    await this.waitForElement('button[type="submit"]');
  }

  /**
   * Verify error message is displayed
   */
  async verifyErrorMessage(): Promise<boolean> {
    return await this.isElementVisible('[class*="error"], [class*="invalid"]');
  }

  /**
   * Get error message text
   */
  async getErrorMessageText(): Promise<string> {
    const errorElement = this.page.locator('[class*="error"], [class*="invalid"], .alert');
    return await errorElement.textContent() || '';
  }

  /**
   * Verify a specific error message is displayed
   */
  async verifyErrorMessageText(expectedMessage: string): Promise<void> {
    const errorMessageLocator = this.page.locator(`text=${expectedMessage}`);
    await expect(errorMessageLocator).toBeVisible();
  }

  /**
   * Verify page title contains login
   */
  async verifyPageTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(/login|sign in/i);
  }
}
