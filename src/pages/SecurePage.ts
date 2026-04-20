import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for Secure Page at practice.expandtesting.com/secure
 * This page is displayed after successful login
 */
export class SecurePage extends BasePage {
  // Page locators using smart locator strategies
  readonly successMessage: Locator;
  readonly logoutButton: Locator;
  readonly pageHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading');
    this.successMessage = page.getByText(/you logged into a secure area/i);
    this.logoutButton = page.getByRole('link', { name: /logout/i });
  }

  /**
   * Navigate to the secure page
   */
  async navigateToSecurePage(): Promise<void> {
    await this.goto('/secure');
  }

  /**
   * Verify the success message is displayed
   */
  async verifySuccessMessage(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }

  /**
   * Verify the logout button is displayed
   */
  async verifyLogoutButtonVisible(): Promise<void> {
    await expect(this.logoutButton).toBeVisible();
  }

  /**
   * Get the success message text
   */
  async getSuccessMessageText(): Promise<string> {
    return (await this.successMessage.textContent()) || '';
  }

  /**
   * Click the logout button
   */
  async clickLogout(): Promise<void> {
    await this.logoutButton.click();
    await this.page.waitForLoadState('load');
  }

  /**
   * Verify that we're on the secure page
   */
  async verifySecurePageUrl(): Promise<void> {
    expect(this.page.url()).toContain('/secure');
  }

  /**
   * Verify all secure page elements are displayed
   */
  async verifySecurePageDisplayed(): Promise<void> {
    await this.verifySecurePageUrl();
    await this.verifySuccessMessage();
    await this.verifyLogoutButtonVisible();
  }
}
