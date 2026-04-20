import { Page, Locator, expect } from '@playwright/test';
import { AuthPage } from './AuthPage';

/**
 * Page Object Model for Register Page at practice.expandtesting.com/register
 * Handles user registration functionality
 * Extends AuthPage to inherit common authentication form elements and methods
 */
export class RegisterPage extends AuthPage {
  // Register-specific locators using smart locator strategies
  readonly pageHeading: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading');
    this.confirmPasswordInput = page
      .getByLabel(/confirm.*password/i)
      .or(page.getByPlaceholder(/confirm/i));
    this.registerButton = page.getByRole('button', { name: /register/i });
  }

  /**
   * Navigate to the register page
   */
  async navigateToRegister(): Promise<void> {
    await this.goto('/register');
  }

  /**
   * Verify register page is displayed
   */
  async verifyRegisterPageDisplayed(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.confirmPasswordInput).toBeVisible();
    await expect(this.registerButton).toBeVisible();
  }

  /**
   * Enter confirm password
   */
  async enterConfirmPassword(password: string): Promise<void> {
    await this.confirmPasswordInput.fill(password);
  }

  /**
   * Click register button
   */
  async clickRegisterButton(): Promise<void> {
    await this.registerButton.click();
  }

  /**
   * Perform complete registration
   */
  async registerUser(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.enterConfirmPassword(password);
    await this.clickRegisterButton();
    await this.page.waitForLoadState('load');
  }

  /**
   * Verify successful registration message
   */
  async verifyRegistrationSuccess(): Promise<void> {
    // Wait for success message to be visible
    await this.page.waitForTimeout(1000); // Wait for page to process

    // Use smart locator for success message
    const successMessage = this.page.getByText(/successfully registered|registered successfully/i);

    let found = false;
    try {
      if (await successMessage.isVisible({ timeout: 2000 })) {
        found = true;
      }
    } catch {
      // Continue to check other indicators
    }

    if (!found) {
      // If no success message found, verify we were redirected (registration might redirect automatically)
      // This is a common pattern in some forms
      const currentUrl = this.page.url();
      if (!currentUrl.includes('/register')) {
        // Successfully redirected away from register page, indicating successful registration
        found = true;
      }
    }

    expect(found).toBe(true);
  }

  /**
   * Verify confirm password field is visible
   */
  async verifyConfirmPasswordFieldVisible(): Promise<void> {
    const isVisible = await this.isElementVisible(
      '#confirm_password, #confirmPassword, input[placeholder*="Confirm" i]'
    );
    expect(isVisible).toBe(true);
  }

  /**
   * Verify page title contains register
   */
  async verifyPageTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(/register|sign up/i);
  }

  /**
   * Verify we can enter text in confirm password field
   */
  async verifyConfirmPasswordInputFunctionality(testValue: string): Promise<void> {
    await this.enterConfirmPassword(testValue);
    const confirmPasswordValue = await this.confirmPasswordInput.inputValue();
    expect(confirmPasswordValue).toBe(testValue);
  }
}
