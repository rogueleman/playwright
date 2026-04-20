import { test } from '@fixtures/dynamicTableFixture';

test.describe('Dynamic Table Tests', () => {
  test.beforeEach(async ({ dynamicTablePage }) => {
    // Navigate to dynamic table page before each test
    await dynamicTablePage.navigateToDynamicTable();
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
});
