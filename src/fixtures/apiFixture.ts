import { test as base, expect } from '@playwright/test';
import { RandomUserApiClient } from '@api/RandomUserApiClient';

/**
 * Fixture for Random User API tests
 * Provides RandomUserApiClient for API testing
 */
type ApiFixtures = {
  randomUserApi: RandomUserApiClient;
};

export const test = base.extend<ApiFixtures>({
  randomUserApi: async ({ request }, use) => {
    const apiClient = new RandomUserApiClient(request);
    await use(apiClient);
  },
});

export { expect };
