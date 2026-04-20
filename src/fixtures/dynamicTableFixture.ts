import { test as base } from '@playwright/test';
import { DynamicTablePage } from '@pages/DynamicTablePage';

/**
 * Fixture for Dynamic Table Page tests
 * Only initializes DynamicTablePage fixture for tests that need it
 */
type DynamicTableFixture = {
  dynamicTablePage: DynamicTablePage;
};

export const test = base.extend<DynamicTableFixture>({
  dynamicTablePage: async ({ page }, use) => {
    const dynamicTablePage = new DynamicTablePage(page);
    await use(dynamicTablePage);
  },
});
