import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Abstract base class for authentication pages (Login, Register)
 * Contains common form elements and methods shared between login and registration
 */
export abstract class AuthPage extends BasePage {
  // Common authentication form locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    // Define common selectors that work across both login and registration pages
    this.usernameInput = page.locator(
      '#username, input[name="username"], input[placeholder*="Username" i]'
    );
    this.passwordInput = page.locator(
      '#password, input[name="password"], input[placeholder*="Password" i]'
    );
    this.errorMessage = page.locator('.error, .alert-danger, [class*="error"]');
    this.successMessage = page.locator('.success, .alert-success, [class*="success"]');
  }

  /**
   * Enter username in the form
   */
  async enterUsername(username: string): Promise<void> {
    await this.fillInput('#username', username);
  }

  /**
   * Enter password in the form
   */
  async enterPassword(password: string): Promise<void> {
    await this.fillInput('#password', password);
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
    return (await errorElement.textContent()) || '';
  }

  /**
   * Verify username input field is visible
   */
  async verifyUsernameFieldVisible(): Promise<void> {
    const isVisible = await this.isElementVisible('#username');
    expect(isVisible).toBe(true);
  }

  /**
   * Verify password input field is visible
   */
  async verifyPasswordFieldVisible(): Promise<void> {
    const isVisible = await this.isElementVisible('#password');
    expect(isVisible).toBe(true);
  }

  /**
   * Verify we can enter text in username field
   */
  async verifyUsernameInputFunctionality(testValue: string): Promise<void> {
    await this.enterUsername(testValue);
    const usernameValue = await this.page.locator('#username').inputValue();
    expect(usernameValue).toBe(testValue);
  }

  /**
   * Verify we can enter text in password field
   */
  async verifyPasswordInputFunctionality(testValue: string): Promise<void> {
    await this.enterPassword(testValue);
    const passwordValue = await this.page.locator('#password').inputValue();
    expect(passwordValue).toBe(testValue);
  }
}
