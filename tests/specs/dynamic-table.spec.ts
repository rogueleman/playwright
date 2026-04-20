import { test } from '@fixtures/baseTest';

test.describe('Dynamic Table Tests', () => {
  test.beforeEach(async ({ dynamicTablePage }) => {
    // Navigate to dynamic table page before each test
    await dynamicTablePage.navigateToDynamicTable();
  });

  test('should display the dynamic table page', async ({ dynamicTablePage }) => {
    // Verify the page is displayed
    await dynamicTablePage.verifyPageDisplayed();
  });

  test('should verify Chrome CPU value matches label (complete automation)', async ({
    dynamicTablePage,
  }) => {
    // Print table info for debugging
    await dynamicTablePage.printTableInfo();

    // Print label info for debugging
    await dynamicTablePage.printLabelInfo();

    // Step 1: Identify the CPU value for the Chrome row
    // Step 2: Compare it with the value in the yellow label (id="chrome-cpu")
    // Step 3: Assert that the values match
    await dynamicTablePage.verifyChromeCpuValueMatchesLabel();
  });

  test('should handle dynamic table structure changes', async ({ dynamicTablePage, page }) => {
    // Get the initial CPU value
    const initialCpuValue = await dynamicTablePage.getChromeRowCpuValue();
    console.log(`Initial CPU value: ${initialCpuValue}`);

    // Refresh the page (simulating dynamic changes)
    await page.reload();
    await page.waitForLoadState('load');

    // Get the CPU value again after refresh
    const refreshedCpuValue = await dynamicTablePage.getChromeRowCpuValue();
    console.log(`CPU value after refresh: ${refreshedCpuValue}`);

    // Verify the page still works correctly after refresh
    await dynamicTablePage.verifyChromeCpuValueMatchesLabel();
  });
});
