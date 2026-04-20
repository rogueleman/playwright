import { test as base } from '@playwright/test';
import { BMIPage } from '@pages/BMIPage';

/**
 * Fixture for BMI Page tests
 * Only initializes BMIPage fixture for tests that need it
 */
type BMIFixture = {
  bmiPage: BMIPage;
};

export const test = base.extend<BMIFixture>({
  bmiPage: async ({ page }, use) => {
    const bmiPage = new BMIPage(page);
    await use(bmiPage);
  },
});
