import { Page, Locator, expect } from '@playwright/test';
import { AuthPage } from './AuthPage';

/**
 * Page Object Model for Register Page at practice.expandtesting.com/register
 * Handles user registration functionality
 * Extends AuthPage to inherit common authentication form elements and methods
 */
export class RegisterPage extends AuthPage {
  // Register-specific locators
  readonly pageHeading: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('h1, h2');
    this.confirmPasswordInput = page.locator(
      '#confirm_password, #confirmPassword, input[name="confirm_password"], input[placeholder*="Confirm" i]'
    );
    this.registerButton = page.locator('button:has-text("Register"), button[type="submit"]');
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
    await this.waitForElement('#username');
    await this.waitForElement('#password');
    await this.waitForElement(
      '#confirm_password, #confirmPassword, input[placeholder*="Confirm" i]'
    );
    await this.waitForElement('button[type="submit"]');
  }

  /**
   * Enter confirm password
   */
  async enterConfirmPassword(password: string): Promise<void> {
    await this.fillInput(
      '#confirm_password, #confirmPassword, input[placeholder*="Confirm" i]',
      password
    );
  }

  /**
   * Click register button
   */
  async clickRegisterButton(): Promise<void> {
    await this.click('button[type="submit"]');
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

    // Try multiple selectors for success message
    const successSelectors = [
      'text=successfully registered',
      'text=registered successfully',
      'text=successfully',
      '[class*="success"]',
      '.alert-success',
      '.success-message',
    ];

    let found = false;
    for (const selector of successSelectors) {
      try {
        const element = this.page.locator(selector);
        if (await element.isVisible({ timeout: 2000 })) {
          found = true;
          break;
        }
      } catch {
        // Continue to next selector
        continue;
      }
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
    const confirmPasswordValue = await this.page
      .locator('#confirm_password, #confirmPassword, input[placeholder*="Confirm" i]')
      .inputValue();
    expect(confirmPasswordValue).toBe(testValue);
  }
}
