/**
 * Custom type definitions for the test framework
 */

/**
 * Test configuration options
 */
export interface TestConfig {
  baseURL: string;
  timeout: number;
  retries: number;
}

/**
 * Page navigation options
 */
export interface NavigationOptions {
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle';
  timeout?: number;
}

/**
 * Element interaction result
 */
export interface InteractionResult {
  success: boolean;
  message?: string;
  error?: Error;
}
