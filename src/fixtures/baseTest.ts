/**
 * Base test exports custom fixtures and expect for use in test files
 * Import this instead of importing from @playwright/test to get access to page objects
 *
 * Usage:
 * import { test, expect } from '@fixtures/baseTest';
 *
 * test('my test', async ({ examplePage }) => {
 *   await examplePage.navigateToExampleDomain();
 * });
 */

export { test, expect } from './pageFixtures';
