import { test as base } from '@playwright/test';
import { SecurePage } from '@pages/SecurePage';

/**
 * Fixture for Secure Page tests
 * Only initializes SecurePage fixture for tests that need it
 */
type SecureFixture = {
  securePage: SecurePage;
};

export const test = base.extend<SecureFixture>({
  securePage: async ({ page }, use) => {
    const securePage = new SecurePage(page);
    await use(securePage);
  },
});
