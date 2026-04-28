/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, expect } from '@fixtures/apiFixture';
import { RANDOMUSER_API } from '@config/randomUserApi';

test.describe('Random User API - Comprehensive Tests', () => {
  test('should validate JSON response structure for data formats', async ({ randomUserApi }) => {
    const response = await randomUserApi.getUsersInFormat(RANDOMUSER_API.FORMATS.JSON, 1);

    expect(response.status).toBe(200);
    expect(typeof response.data).toBe('object');
    expect(response.data).toHaveProperty('results');
    expect(Array.isArray(response.data.results)).toBe(true);
  });

  test('should return CSV format as text', async ({ randomUserApi }) => {
    const response = await randomUserApi.getUsersInFormat(RANDOMUSER_API.FORMATS.CSV, 5);

    expect(response.status).toBe(200);
    expect(typeof response.data).toBe('string');
    // CSV should contain comma-separated values and newlines
    expect(response.data).toContain(',');
    expect(response.data).toContain('\n');
  });

  test('should return YAML format as text', async ({ randomUserApi }) => {
    const response = await randomUserApi.getUsersInFormat(RANDOMUSER_API.FORMATS.YAML, 1);

    expect(response.status).toBe(200);
    expect(typeof response.data).toBe('string');
    // YAML format should contain colons
    expect(response.data).toContain(':');
  });

  test('should return XML format as text', async ({ randomUserApi }) => {
    const response = await randomUserApi.getUsersInFormat(RANDOMUSER_API.FORMATS.XML, 1);

    expect(response.status).toBe(200);
    expect(typeof response.data).toBe('string');
    // XML should contain angle brackets
    expect(response.data).toContain('<');
    expect(response.data).toContain('>');
  });

  test('should validate data integrity across multiple requests', async ({ randomUserApi }) => {
    const response1 = await randomUserApi.getRandomUsers(5);
    const response2 = await randomUserApi.getRandomUsers(5);

    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);

    // Both responses should have valid structures
    expect(response1.data.results.length).toBeGreaterThan(0);
    expect(response2.data.results.length).toBeGreaterThan(0);

    // Verify all users have required fields
    [...response1.data.results, ...response2.data.results].forEach((user: any) => {
      expect(user).toHaveProperty('gender');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('login');
      expect(user).toHaveProperty('dob');
      expect(user).toHaveProperty('registered');
    });
  });

  test('should validate location data completeness', async ({ randomUserApi }) => {
    const response = await randomUserApi.getRandomUsers(5);

    expect(response.status).toBe(200);

    response.data.results.forEach((user: any) => {
      const location = user.location;
      expect(location).toHaveProperty('street');
      expect(location).toHaveProperty('city');
      expect(location).toHaveProperty('country');
      expect(location).toHaveProperty('coordinates');
      expect(location).toHaveProperty('timezone');

      // Verify coordinates are valid
      expect(location.coordinates).toHaveProperty('latitude');
      expect(location.coordinates).toHaveProperty('longitude');
      const lat = parseFloat(location.coordinates.latitude);
      const lng = parseFloat(location.coordinates.longitude);
      expect(lat).toBeGreaterThanOrEqual(-90);
      expect(lat).toBeLessThanOrEqual(90);
      expect(lng).toBeGreaterThanOrEqual(-180);
      expect(lng).toBeLessThanOrEqual(180);
    });
  });

  test('should validate user identification data', async ({ randomUserApi }) => {
    const response = await randomUserApi.getRandomUsers(5);

    expect(response.status).toBe(200);

    response.data.results.forEach((user: any) => {
      // Verify ID exists
      expect(user).toHaveProperty('id');
      expect(user.id).toHaveProperty('name');
      expect(user.id).toHaveProperty('value');

      // Verify login credentials
      expect(user.login).toHaveProperty('uuid');
      expect(user.login).toHaveProperty('username');
      expect(user.login).toHaveProperty('password');
    });
  });

  test('should validate date fields are ISO 8601 format', async ({ randomUserApi }) => {
    const response = await randomUserApi.getRandomUsers(3);

    expect(response.status).toBe(200);
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

    response.data.results.forEach((user: any) => {
      expect(user.dob.date).toMatch(iso8601Regex);
      expect(user.registered.date).toMatch(iso8601Regex);
    });
  });

  test('should validate all returned users have valid picture URLs', async ({ randomUserApi }) => {
    const response = await randomUserApi.getRandomUsers(5);

    expect(response.status).toBe(200);

    response.data.results.forEach((user: any) => {
      expect(user.picture).toHaveProperty('large');
      expect(user.picture).toHaveProperty('medium');
      expect(user.picture).toHaveProperty('thumbnail');

      // Verify picture URLs are valid
      expect(user.picture.large).toMatch(/^https?:\/\/.+\.(jpg|png|gif)$/i);
      expect(user.picture.medium).toMatch(/^https?:\/\/.+\.(jpg|png|gif)$/i);
      expect(user.picture.thumbnail).toMatch(/^https?:\/\/.+\.(jpg|png|gif)$/i);
    });
  });
});
