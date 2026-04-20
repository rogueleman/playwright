import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { SecurePage } from '@pages/SecurePage';

/**
 * Fixture for Login and Secure Page tests
 * Only initializes LoginPage and SecurePage fixtures for tests that need them
 */
type LoginFixtures = {
  loginPage: LoginPage;
  securePage: SecurePage;
};

export const test = base.extend<LoginFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  securePage: async ({ page }, use) => {
    const securePage = new SecurePage(page);
    await use(securePage);
  },
});
