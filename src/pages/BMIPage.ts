import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for BMI Calculator Page at practice.expandtesting.com/bmi
 * Handles BMI calculation with inputs for gender, age, height, and weight
 */
export class BMIPage extends BasePage {
  // Page locators
  readonly genderSelect: Locator;
  readonly ageInput: Locator;
  readonly heightInput: Locator;
  readonly weightInput: Locator;
  readonly calculateButton: Locator;
  readonly resultDiv: Locator;
  readonly bmiSpan: Locator;
  readonly resultBold: Locator;

  constructor(page: Page) {
    super(page);
    this.genderSelect = page.locator('#gender');
    this.ageInput = page.locator('#age');
    this.heightInput = page.locator('#height');
    this.weightInput = page.locator('#weight');
    this.calculateButton = page.locator('button:has-text("Calculate")');
    this.resultDiv = page.locator('#divResult');
    this.bmiSpan = page.locator('#BMI');
    this.resultBold = page.locator('[style*="font-size: 30px"][style*="font-weight: bold"][style*="color: #000"]');
  }

  /**
   * Navigate to the BMI calculator page
   */
  async navigateToBMI(): Promise<void> {
    await this.goto('/bmi');
  }

  /**
   * Set gender value
   * The gender select expects capitalized values: "Male" or "Female"
   */
  async setGender(gender: string): Promise<void> {
    const genderCapitalized = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
    await this.genderSelect.selectOption(genderCapitalized);
  }

  /**
   * Set age value
   */
  async setAge(age: string): Promise<void> {
    await this.ageInput.fill(age);
  }

  /**
   * Set height value (in centimeters)
   */
  async setHeight(height: string): Promise<void> {
    await this.heightInput.fill(height);
  }

  /**
   * Set weight value (in kilograms)
   */
  async setWeight(weight: string): Promise<void> {
    await this.weightInput.fill(weight);
  }

  /**
   * Click the Calculate button and wait for results
   */
  async clickCalculate(): Promise<void> {
    await this.calculateButton.click();
    // Wait for the result to be visible
    await this.resultDiv.waitFor({ state: 'visible', timeout: 5000 });
    await this.bmiSpan.waitFor({ state: 'visible', timeout: 5000 });
  }

  /**
   * Get the result from the divResult element by reading the #BMI span
   */
  async getResultFromDiv(): Promise<string> {
    await this.resultDiv.waitFor({ state: 'visible' });
    const result = await this.bmiSpan.textContent();
    return result?.trim() || '';
  }

  /**
   * Get the result from the bold styled element (font-size: 30px; font-weight: bold; color: #000)
   */
  async getResultFromBoldElement(): Promise<string> {
    await this.resultBold.waitFor({ state: 'visible' });
    const result = await this.resultBold.textContent();
    return result?.trim() || '';
  }

  /**
   * Calculate BMI manually using the formula: BMI = Weight / ((Height/100)^2)
   * Rounded to 1 decimal place
   */
  calculateBMI(weight: number, height: number): number {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return Math.round(bmi * 10) / 10;
  }

  /**
   * Verify BMI calculation is correct by comparing with both web elements
   */
  async verifyBMICalculation(
    gender: string,
    age: string,
    height: string,
    weight: string
  ): Promise<void> {
    // Parse input values
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    // Calculate expected BMI
    const expectedBMI = this.calculateBMI(weightNum, heightNum);

    // Set inputs
    console.log('\n=== BMI Calculator Test ===');
    console.log(`Input Values:`);
    console.log(`  Gender: ${gender}`);
    console.log(`  Age: ${age}`);
    console.log(`  Height: ${height} cm`);
    console.log(`  Weight: ${weight} kg`);
    console.log(`\nCalculated BMI: ${expectedBMI}`);

    await this.setGender(gender);
    await this.setAge(age);
    await this.setHeight(height);
    await this.setWeight(weight);

    // Click Calculate button
    await this.clickCalculate();

    // Get results from both web elements
    const resultFromDiv = await this.getResultFromDiv();
    const resultFromBold = await this.getResultFromBoldElement();

    console.log(`\nResult from #BMI span: ${resultFromDiv}`);
    console.log(`Result from bold styled element: ${resultFromBold}`);

    // Extract numeric values for comparison
    // For divResult: "Your BMI is 22.5 kg/m2 (Normal)" -> extract 22.5
    const divMatch = resultFromDiv.match(/\d+\.\d+/);
    const resultDivNumeric = divMatch ? parseFloat(divMatch[0]) : 0;

    // For bold element: "BMI = 22.5" -> extract 22.5
    const boldMatch = resultFromBold.match(/\d+\.\d+/);
    const resultBoldNumeric = boldMatch ? parseFloat(boldMatch[0]) : 0;

    console.log(`\nAssertions:`);
    console.log(`  Expected BMI: ${expectedBMI}`);
    console.log(`  #BMI span numeric value: ${resultDivNumeric}`);
    console.log(`  Bold element numeric value: ${resultBoldNumeric}`);

    // Assert all values match
    expect(resultDivNumeric).toBe(expectedBMI);
    expect(resultBoldNumeric).toBe(expectedBMI);
    console.log(`\nAll assertions passed! ✓`);
    console.log('========================\n');
  }
}
