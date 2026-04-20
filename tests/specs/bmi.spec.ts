import { test } from '@fixtures/bmiFixture';

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
});
