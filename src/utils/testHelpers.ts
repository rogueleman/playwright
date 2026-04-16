import { Page } from '@playwright/test';

/**
 * Test utility helpers for common operations
 */

/**
 * Generate a unique username using UUID format
 * Format: gmg-{random-hex}
 * Example: gmg-a1b2c3d4e5f6
 */
export function generateUniqueUsername(): string {
  const randomBytes = crypto.getRandomValues(new Uint8Array(6));
  const hexString = Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  return `gmg-${hexString}`;
}

/**
 * Retry a function multiple times until it succeeds
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 500
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  throw new Error(`Operation failed after ${maxAttempts} attempts: ${lastError?.message}`);
}

/**
 * Wait for a condition to be true
 */
export async function waitForCondition(
  condition: () => boolean | Promise<boolean>,
  timeoutMs: number = 5000,
  intervalMs: number = 100
): Promise<void> {
  const startTime = Date.now();

  while (Date.now() - startTime < timeoutMs) {
    if (await condition()) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error(`Condition not met within ${timeoutMs}ms timeout`);
}

/**
 * Take a screenshot with timestamp
 */
export async function takeScreenshotWithTimestamp(
  page: Page,
  testName: string
): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `screenshots/${testName}-${timestamp}.png`;
  await page.screenshot({ path: filename });
  return filename;
}

/**
 * Get all text content from elements matching a selector
 */
export async function getTextFromAllElements(page: Page, selector: string): Promise<string[]> {
  const elements = await page.locator(selector).all();
  const texts: string[] = [];

  for (const element of elements) {
    const text = await element.textContent();
    if (text) {
      texts.push(text.trim());
    }
  }

  return texts;
}

/**
 * Wait for element to have a specific attribute
 */
export async function waitForElementAttribute(
  page: Page,
  selector: string,
  attributeName: string,
  expectedValue: string,
  timeoutMs: number = 5000
): Promise<void> {
  const locator = page.locator(selector);
  await locator.waitFor({ state: 'visible', timeout: timeoutMs });

  const startTime = Date.now();
  while (Date.now() - startTime < timeoutMs) {
    const attributeValue = await locator.getAttribute(attributeName);
    if (attributeValue === expectedValue) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  throw new Error(
    `Attribute ${attributeName} on element ${selector} did not match ${expectedValue} within ${timeoutMs}ms`
  );
}
