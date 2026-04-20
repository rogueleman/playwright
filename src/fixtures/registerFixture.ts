import { test as base } from '@playwright/test';
import { RegisterPage } from '@pages/RegisterPage';
import { LoginPage } from '@pages/LoginPage';
import { SecurePage } from '@pages/SecurePage';

/**
 * Fixture for Register, Login, and Secure Page tests
 * Only initializes page fixtures needed for registration flow tests
 */
type RegisterFixtures = {
  registerPage: RegisterPage;
  loginPage: LoginPage;
  securePage: SecurePage;
};

export const test = base.extend<RegisterFixtures>({
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  securePage: async ({ page }, use) => {
    const securePage = new SecurePage(page);
    await use(securePage);
  },
});
