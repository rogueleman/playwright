import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for Dynamic Table Page at practice.expandtesting.com/dynamic-table
 * Handles dynamic table where columns and rows can change positions
 */
export class DynamicTablePage extends BasePage {
  // Page locators using smart locator strategies where applicable
  readonly pageHeading: Locator;
  readonly dynamicTable: Locator;
  readonly tableRows: Locator;
  readonly tableHeaders: Locator;
  readonly chromeCpuLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading');
    this.dynamicTable = page.getByRole('table');
    this.tableRows = this.dynamicTable.getByRole('row');
    this.tableHeaders = this.dynamicTable.getByRole('columnheader');
    this.chromeCpuLabel = page.locator('#chrome-cpu');
  }

  /**
   * Navigate to the dynamic table page
   */
  async navigateToDynamicTable(): Promise<void> {
    await this.goto('/dynamic-table');
  }

  /**
   * Verify page is displayed
   */
  async verifyPageDisplayed(): Promise<void> {
    await expect(this.dynamicTable).toBeVisible();
  }

  /**
   * Find the column index for CPU (column that contains CPU text)
   * Returns the index of the CPU column, or -1 if not found
   */
  async findCpuColumnIndex(): Promise<number> {
    const headers = await this.tableHeaders.allTextContents();

    // Log headers for debugging
    console.log('Table headers:', headers.map((h) => h.trim()).join(' | '));

    for (let i = 0; i < headers.length; i++) {
      const headerText = headers[i].trim().toUpperCase();
      // Look for header containing "CPU" text
      if (headerText.includes('CPU')) {
        console.log(`Found CPU column at index ${i}: "${headers[i].trim()}"`);
        return i;
      }
    }

    throw new Error(
      `CPU column (with "CPU" text) not found in table headers. Available headers: ${headers.map((h) => h.trim()).join(', ')}`
    );
  }

  /**
   * Find the row index for Chrome
   * Returns the index of the Chrome row, or -1 if not found
   */
  async findChromeRowIndex(): Promise<number> {
    const rows = await this.tableRows.count();

    for (let i = 0; i < rows; i++) {
      const row = this.tableRows.nth(i);
      const cells = row.getByRole('cell');
      const cellCount = await cells.count();

      for (let j = 0; j < cellCount; j++) {
        const cellText = await cells.nth(j).textContent();
        if (cellText?.trim() === 'Chrome') {
          return i;
        }
      }
    }

    throw new Error('Chrome row not found in dynamic table');
  }

  /**
   * Get CPU value from the Chrome row
   * This method dynamically finds the CPU column (with %) and the Chrome row
   * then returns the CPU value for that row
   */
  async getChromeRowCpuValue(): Promise<string> {
    // Find which column contains CPU (has %)
    const cpuColumnIndex = await this.findCpuColumnIndex();

    // Find which row contains Chrome
    const chromeRowIndex = await this.findChromeRowIndex();

    // Get the cell at the intersection of Chrome row and CPU column
    const chromeRow = this.tableRows.nth(chromeRowIndex);
    const cells = chromeRow.getByRole('cell');
    const cpuCell = cells.nth(cpuColumnIndex);

    const cpuValue = await cpuCell.textContent();
    if (!cpuValue) {
      throw new Error('Could not extract CPU value from Chrome row');
    }

    return cpuValue.trim();
  }

  /**
   * Get the CPU value from the yellow label with id "chrome-cpu"
   */
  async getChromeCpuLabelValue(): Promise<string> {
    const labelValue = await this.chromeCpuLabel.textContent();
    if (!labelValue) {
      throw new Error('Could not extract value from chrome-cpu label');
    }

    return labelValue.trim();
  }

  /**
   * Compare CPU values from table and label
   * Returns true if they match, false otherwise
   */
  async compareCpuValues(tableValue: string, labelValue: string): Promise<boolean> {
    // Extract just the numeric value for comparison (in case of formatting differences)
    const tableNumeric = tableValue.replace(/[^0-9.]/g, '');
    const labelNumeric = labelValue.replace(/[^0-9.]/g, '');

    return tableNumeric === labelNumeric;
  }

  /**
   * Complete automation: Get Chrome CPU from table, compare with label, and assert
   */
  async verifyChromeCpuValueMatchesLabel(): Promise<void> {
    // Step 1: Get CPU value from Chrome row in the dynamic table
    const tableValue = await this.getChromeRowCpuValue();
    console.log(`CPU value from table (Chrome row): ${tableValue}`);

    // Step 2: Get CPU value from the yellow label
    const labelValue = await this.getChromeCpuLabelValue();
    console.log(`CPU value from label (chrome-cpu): ${labelValue}`);

    // Step 3: Compare and assert they match
    const valuesMatch = await this.compareCpuValues(tableValue, labelValue);
    expect(valuesMatch).toBe(true);
  }

  /**
   * Print table information for debugging
   */
  async printTableInfo(): Promise<void> {
    console.log('\n=== Dynamic Table Information ===');

    // Print headers
    const headers = await this.tableHeaders.allTextContents();
    console.log('Headers:', headers.map((h) => h.trim()).join(' | '));

    // Print all rows
    const rows = await this.tableRows.count();
    for (let i = 0; i < rows; i++) {
      const row = this.tableRows.nth(i);
      const cells = row.getByRole('cell');
      const cellCount = await cells.count();
      const rowData = [];

      for (let j = 0; j < cellCount; j++) {
        const cellText = await cells.nth(j).textContent();
        rowData.push(cellText?.trim() || '');
      }

      console.log(`Row ${i}:`, rowData.join(' | '));
    }

    console.log('==================================\n');
  }

  /**
   * Print label information for debugging
   */
  async printLabelInfo(): Promise<void> {
    console.log('\n=== Chrome CPU Label Information ===');

    const labelValue = await this.chromeCpuLabel.textContent();
    console.log('Label ID: chrome-cpu');
    console.log(`Label Value: ${labelValue?.trim() || 'N/A'}`);

    console.log('======================================\n');
  }
}
