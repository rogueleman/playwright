import { Page, Locator, expect } from '@playwright/test';

/**
 * Base Page class containing common functionality for all page objects.
 * This class provides methods for navigation, element interactions, and assertions.
 */
export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Get a locator for an element using CSS selector
   */
  getByLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Fill an input field with text
   */
  async fillInput(selector: string, value: string): Promise<void> {
    await this.page.locator(selector).fill(value);
  }

  /**
   * Click on an element
   */
  async click(selector: string): Promise<void> {
    await this.page.locator(selector).click();
  }

  /**
   * Get text content from an element
   */
  async getText(selector: string): Promise<string> {
    return (await this.page.locator(selector).textContent()) || '';
  }

  /**
   * Wait for an element to be visible
   */
  async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for an element to be hidden
   */
  async waitForElementToDisappear(selector: string, timeout: number = 5000): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'hidden', timeout });
  }

  /**
   * Take a screenshot of the page
   */
  async screenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  /**
   * Get the current URL
   */
  getURL(): string {
    return this.page.url();
  }

  /**
   * Get the page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Verify page title matches expected text
   */
  async verifyPageTitle(expectedTitle: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  /**
   * Press a keyboard key
   */
  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  /**
   * Type text character by character
   */
  async typeText(selector: string, text: string): Promise<void> {
    await this.page.locator(selector).click();
    await this.page.keyboard.type(text);
  }

  /**
   * Get the count of matching elements
   */
  async getElementCount(selector: string): Promise<number> {
    return await this.page.locator(selector).count();
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(selector: string): Promise<boolean> {
    try {
      await this.page.locator(selector).waitFor({ state: 'visible', timeout: 2000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for navigation to complete (useful after clicking links)
   */
  async waitForNavigation(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
}
