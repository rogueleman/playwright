import { test as base, Page } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { SecurePage } from '@pages/SecurePage';

/**
 * Extend test with custom fixtures for page objects
 * These fixtures automatically inject page object instances into tests
 */
type PageFixtures = {
  loginPage: LoginPage;
  securePage: SecurePage;
};

/**
 * Define custom fixtures that extend the base test
 * Each fixture receives the page object and can be used in tests via destructuring
 */
export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  securePage: async ({ page }, use) => {
    const securePage = new SecurePage(page);
    await use(securePage);
  },
});

/**
 * Export expect for assertions
 */
export { expect } from '@playwright/test';
