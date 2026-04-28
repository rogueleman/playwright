import { test, expect } from '@fixtures/apiFixture';

test.describe('Random User API - Basic Tests', () => {
  test('should fetch a single random user with default parameters', async ({ randomUserApi }) => {
    const response = await randomUserApi.getRandomUser();

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('results');
    expect(response.data).toHaveProperty('info');
    expect(Array.isArray(response.data.results)).toBe(true);
    expect(response.data.results.length).toBe(1);
  });

  test('should return valid user object structure', async ({ randomUserApi }) => {
    const response = await randomUserApi.getRandomUser();
    const user = response.data.results[0];

    // Verify main properties exist
    expect(user).toHaveProperty('gender');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('location');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('login');
    expect(user).toHaveProperty('dob');
    expect(user).toHaveProperty('registered');
    expect(user).toHaveProperty('phone');
    expect(user).toHaveProperty('cell');
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('picture');
    expect(user).toHaveProperty('nat');
  });

  test('should verify user name structure', async ({ randomUserApi }) => {
    const response = await randomUserApi.getRandomUser();
    const user = response.data.results[0];

    expect(user.name).toHaveProperty('title');
    expect(user.name).toHaveProperty('first');
    expect(user.name).toHaveProperty('last');
    expect(typeof user.name.first).toBe('string');
    expect(user.name.first.length).toBeGreaterThan(0);
  });

  test('should verify user location structure', async ({ randomUserApi }) => {
    const response = await randomUserApi.getRandomUser();
    const user = response.data.results[0];

    expect(user.location).toHaveProperty('street');
    expect(user.location).toHaveProperty('city');
    expect(user.location).toHaveProperty('state');
    expect(user.location).toHaveProperty('country');
    expect(user.location).toHaveProperty('postcode');
    expect(user.location).toHaveProperty('coordinates');
    expect(user.location).toHaveProperty('timezone');
  });

  test('should verify API metadata structure', async ({ randomUserApi }) => {
    const response = await randomUserApi.getRandomUser();

    expect(response.data.info).toHaveProperty('seed');
    expect(response.data.info).toHaveProperty('results');
    expect(response.data.info).toHaveProperty('page');
    expect(response.data.info).toHaveProperty('version');
    expect(response.data.info.results).toBe(1);
    expect(response.data.info.page).toBe(1);
  });
});
