import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { SecurePage } from '@pages/SecurePage';
import { RegisterPage } from '@pages/RegisterPage';
import { DynamicTablePage } from '@pages/DynamicTablePage';

/**
 * Extend test with custom fixtures for page objects
 * These fixtures automatically inject page object instances into tests
 */
type PageFixtures = {
  loginPage: LoginPage;
  securePage: SecurePage;
  registerPage: RegisterPage;
  dynamicTablePage: DynamicTablePage;
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

  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },

  dynamicTablePage: async ({ page }, use) => {
    const dynamicTablePage = new DynamicTablePage(page);
    await use(dynamicTablePage);
  },
});

/**
 * Export expect for assertions
 */
export { expect } from '@playwright/test';
