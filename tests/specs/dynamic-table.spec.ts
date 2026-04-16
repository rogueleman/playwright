import { test, expect } from '@fixtures/baseTest';

test.describe('Dynamic Table Tests', () => {
  test.beforeEach(async ({ dynamicTablePage }) => {
    // Navigate to dynamic table page before each test
    await dynamicTablePage.navigateToDynamicTable();
  });

  test('should display the dynamic table page', async ({ dynamicTablePage }) => {
    // Verify the page is displayed
    await dynamicTablePage.verifyPageDisplayed();
  });

  test('should find CPU column with % sign', async ({ dynamicTablePage }) => {
    // Find the CPU column index
    const cpuColumnIndex = await dynamicTablePage.findCpuColumnIndex();

    // Verify we found a valid column
    expect(cpuColumnIndex).toBeGreaterThanOrEqual(0);
    console.log(`CPU column found at index: ${cpuColumnIndex}`);
  });

  test('should find Chrome row in dynamic table', async ({ dynamicTablePage }) => {
    // Find the Chrome row index
    const chromeRowIndex = await dynamicTablePage.findChromeRowIndex();

    // Verify we found a valid row
    expect(chromeRowIndex).toBeGreaterThanOrEqual(0);
    console.log(`Chrome row found at index: ${chromeRowIndex}`);
  });

  test('should extract CPU value from Chrome row', async ({ dynamicTablePage }) => {
    // Get CPU value from the Chrome row
    const cpuValue = await dynamicTablePage.getChromeRowCpuValue();

    // Verify we got a value
    expect(cpuValue).toBeTruthy();
    console.log(`CPU value from Chrome row: ${cpuValue}`);
  });

  test('should extract CPU value from chrome-cpu label', async ({ dynamicTablePage }) => {
    // Get CPU value from the yellow label
    const labelValue = await dynamicTablePage.getChromeCpuLabelValue();

    // Verify we got a value
    expect(labelValue).toBeTruthy();
    console.log(`CPU value from chrome-cpu label: ${labelValue}`);
  });

  test('should compare CPU values and verify they match', async ({ dynamicTablePage }) => {
    // Get CPU value from Chrome row in the table
    const tableValue = await dynamicTablePage.getChromeRowCpuValue();
    console.log(`[Step 1] CPU value from Chrome row in table: ${tableValue}`);

    // Get CPU value from the yellow label
    const labelValue = await dynamicTablePage.getChromeCpuLabelValue();
    console.log(`[Step 2] CPU value from chrome-cpu label: ${labelValue}`);

    // Compare the values
    const valuesMatch = await dynamicTablePage.compareCpuValues(tableValue, labelValue);
    console.log(`[Step 3] Comparison result: ${valuesMatch ? 'MATCH ✓' : 'MISMATCH ✗'}`);

    // Assert they match
    expect(valuesMatch).toBe(true);
  });

  test('should verify Chrome CPU value matches label (complete automation)', async ({ dynamicTablePage }) => {
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
