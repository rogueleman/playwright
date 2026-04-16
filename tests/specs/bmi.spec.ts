import { test, expect } from '@fixtures/baseTest';

test.describe('BMI Calculator Tests', () => {
  test.beforeEach(async ({ bmiPage }) => {
    // Navigate to BMI calculator page before each test
    await bmiPage.navigateToBMI();
  });

  test('should calculate BMI correctly for Male, Age 45, Height 170cm, Weight 65kg', async ({
    bmiPage,
  }) => {
    // Test data
    const gender = 'male';
    const age = '45';
    const height = '170';
    const weight = '65';

    // Run the verification which includes:
    // 1. Logging all inputs and calculated values
    // 2. Asserting against divResult element
    // 3. Asserting against the bold styled element
    await bmiPage.verifyBMICalculation(gender, age, height, weight);
  });

  test('should verify divResult element contains correct BMI value', async ({ bmiPage }) => {
    const gender = 'male';
    const age = '45';
    const height = '170';
    const weight = '65';

    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);
    const expectedBMI = bmiPage.calculateBMI(weightNum, heightNum);

    console.log(`\n=== Test: Verify divResult Element ===`);
    console.log(`Input: Gender=${gender}, Age=${age}, Height=${height}cm, Weight=${weight}kg`);
    console.log(`Expected BMI: ${expectedBMI}`);

    await bmiPage.setGender(gender);
    await bmiPage.setAge(age);
    await bmiPage.setHeight(height);
    await bmiPage.setWeight(weight);
    await bmiPage.clickCalculate();

    const resultFromDiv = await bmiPage.getResultFromDiv();
    console.log(`Result from #BMI span: ${resultFromDiv}`);

    const divMatch = resultFromDiv.match(/\d+\.\d+/);
    const resultDivNumeric = divMatch ? parseFloat(divMatch[0]) : 0;
    console.log(`Parsed numeric value: ${resultDivNumeric}`);
    console.log(`================================\n`);

    expect(resultDivNumeric).toBe(expectedBMI);
  });

  test('should verify bold styled element contains correct BMI value', async ({ bmiPage }) => {
    const gender = 'male';
    const age = '45';
    const height = '170';
    const weight = '65';

    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);
    const expectedBMI = bmiPage.calculateBMI(weightNum, heightNum);

    console.log(`\n=== Test: Verify Bold Styled Element ===`);
    console.log(`Input: Gender=${gender}, Age=${age}, Height=${height}cm, Weight=${weight}kg`);
    console.log(`Expected BMI: ${expectedBMI}`);

    await bmiPage.setGender(gender);
    await bmiPage.setAge(age);
    await bmiPage.setHeight(height);
    await bmiPage.setWeight(weight);
    await bmiPage.clickCalculate();

    const resultFromBold = await bmiPage.getResultFromBoldElement();
    console.log(`Result from bold element: ${resultFromBold}`);

    const boldMatch = resultFromBold.match(/\d+\.\d+/);
    const resultBoldNumeric = boldMatch ? parseFloat(boldMatch[0]) : 0;
    console.log(`Parsed numeric value: ${resultBoldNumeric}`);
    console.log(`=====================================\n`);

    expect(resultBoldNumeric).toBe(expectedBMI);
  });

  test('should verify both elements contain matching BMI values', async ({ bmiPage }) => {
    const gender = 'male';
    const age = '45';
    const height = '170';
    const weight = '65';

    console.log(`\n=== Test: Verify Both Elements Match ===`);
    console.log(`Input: Gender=${gender}, Age=${age}, Height=${height}cm, Weight=${weight}kg`);

    await bmiPage.setGender(gender);
    await bmiPage.setAge(age);
    await bmiPage.setHeight(height);
    await bmiPage.setWeight(weight);
    await bmiPage.clickCalculate();

    const resultFromDiv = await bmiPage.getResultFromDiv();
    const resultFromBold = await bmiPage.getResultFromBoldElement();

    console.log(`#BMI span text: ${resultFromDiv}`);
    console.log(`Bold element text: ${resultFromBold}`);

    const divMatch = resultFromDiv.match(/\d+\.\d+/);
    const resultDivNumeric = divMatch ? parseFloat(divMatch[0]) : 0;

    const boldMatch = resultFromBold.match(/\d+\.\d+/);
    const resultBoldNumeric = boldMatch ? parseFloat(boldMatch[0]) : 0;

    console.log(`#BMI span numeric value: ${resultDivNumeric}`);
    console.log(`Bold element numeric value: ${resultBoldNumeric}`);
    console.log(`====================================\n`);

    // Both should match each other
    expect(resultDivNumeric).toBe(resultBoldNumeric);
  });
});
