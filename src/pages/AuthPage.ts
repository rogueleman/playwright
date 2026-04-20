import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Abstract base class for authentication pages (Login, Register)
 * Contains common form elements and methods shared between login and registration
 */
export abstract class AuthPage extends BasePage {
  // Common authentication form locators using smart locator strategies
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    // Use smart locators - more specific to avoid matching multiple elements
    this.usernameInput = page.getByLabel(/username/i);
    this.passwordInput = page.getByLabel(/^password$/i); // Exact match to avoid "Confirm Password"
    this.errorMessage = page.getByRole('alert').or(page.getByText(/error|invalid|fail/i));
    this.successMessage = page
      .getByRole('status')
      .or(page.getByText(/success|registered|welcome/i));
  }

  /**
   * Enter username in the form
   */
  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /**
   * Enter password in the form
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Verify error message is displayed
   */
  async verifyErrorMessage(): Promise<boolean> {
    return await this.errorMessage.isVisible().catch(() => false);
  }

  /**
   * Get error message text
   */
  async getErrorMessageText(): Promise<string> {
    return (await this.errorMessage.textContent()) || '';
  }

  /**
   * Verify username input field is visible
   */
  async verifyUsernameFieldVisible(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
  }

  /**
   * Verify password input field is visible
   */
  async verifyPasswordFieldVisible(): Promise<void> {
    await expect(this.passwordInput).toBeVisible();
  }

  /**
   * Verify we can enter text in username field
   */
  async verifyUsernameInputFunctionality(testValue: string): Promise<void> {
    await this.enterUsername(testValue);
    const usernameValue = await this.usernameInput.inputValue();
    expect(usernameValue).toBe(testValue);
  }

  /**
   * Verify we can enter text in password field
   */
  async verifyPasswordInputFunctionality(testValue: string): Promise<void> {
    await this.enterPassword(testValue);
    const passwordValue = await this.passwordInput.inputValue();
    expect(passwordValue).toBe(testValue);
  }
}
