const { test, expect } = require('@playwright/test');

test.describe('Playwright demo', () => {
  test('homepage loads and shows title', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example Domain/);
    await expect(page.locator('h1')).toHaveText('Example Domain');
  });
});
