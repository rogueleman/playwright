import { Page, Locator, expect } from '@playwright/test';
import { AuthPage } from './AuthPage';

/**
 * Page Object Model for Login Page at practice.expandtesting.com/login
 * Encapsulates all selectors and interactions for the login page
 * Extends AuthPage to inherit common authentication form elements and methods
 */
export class LoginPage extends AuthPage {
  // Login-specific locators
  readonly pageHeading: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('h1, h2');
    this.loginButton = page.locator('button:has-text("Login"), button[type="submit"]');
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
