import { APIRequestContext } from '@playwright/test';
import { RANDOMUSER_API } from '@config/randomUserApi';

/**
 * Random User API Client
 * Provides methods to interact with the Random User Generator API
 */
export class RandomUserApiClient {
  constructor(private request: APIRequestContext) {}

  /**
   * Build query parameters for API requests
   */
  private buildQueryParams(options: {
    results?: number;
    gender?: string;
    nat?: string | string[];
    seed?: string;
    page?: number;
    inc?: string | string[];
    exc?: string | string[];
    format?: string;
    password?: string;
    noinfo?: boolean;
  }): string {
    const params = new URLSearchParams();

    if (options.results) params.append('results', options.results.toString());
    if (options.gender) params.append('gender', options.gender);
    if (options.nat) {
      const natValue = Array.isArray(options.nat) ? options.nat.join(',') : options.nat;
      params.append('nat', natValue);
    }
    if (options.seed) params.append('seed', options.seed);
    if (options.page) params.append('page', options.page.toString());
    if (options.inc) {
      const incValue = Array.isArray(options.inc) ? options.inc.join(',') : options.inc;
      params.append('inc', incValue);
    }
    if (options.exc) {
      const excValue = Array.isArray(options.exc) ? options.exc.join(',') : options.exc;
      params.append('exc', excValue);
    }
    if (options.format) params.append('format', options.format);
    if (options.password) params.append('password', options.password);
    if (options.noinfo) params.append('noinfo', 'true');

    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  }

  /**
   * Fetch a single random user (default behavior)
   */
  async getRandomUser() {
    const response = await this.request.get(`${RANDOMUSER_API.BASE_URL}`);
    return {
      status: response.status(),
      data: await response.json(),
    };
  }

  /**
   * Fetch multiple random users
   */
  async getRandomUsers(count: number) {
    const queryString = this.buildQueryParams({ results: count });
    const response = await this.request.get(`${RANDOMUSER_API.BASE_URL}${queryString}`);
    return {
      status: response.status(),
      data: await response.json(),
    };
  }

  /**
   * Fetch users with specific gender
   */
  async getUsersByGender(gender: string, count: number = 1) {
    const queryString = this.buildQueryParams({ gender, results: count });
    const response = await this.request.get(`${RANDOMUSER_API.BASE_URL}${queryString}`);
    return {
      status: response.status(),
      data: await response.json(),
    };
  }

  /**
   * Fetch users with specific nationality/nationalities
   */
  async getUsersByNationality(nationalities: string | string[], count: number = 1) {
    const queryString = this.buildQueryParams({ nat: nationalities, results: count });
    const response = await this.request.get(`${RANDOMUSER_API.BASE_URL}${queryString}`);
    return {
      status: response.status(),
      data: await response.json(),
    };
  }

  /**
   * Fetch users with reproducible results using seed
   */
  async getUsersWithSeed(seed: string, count: number = 1) {
    const queryString = this.buildQueryParams({ seed, results: count });
    const response = await this.request.get(`${RANDOMUSER_API.BASE_URL}${queryString}`);
    return {
      status: response.status(),
      data: await response.json(),
    };
  }

  /**
   * Fetch users with included fields only
   */
  async getUsersWithFields(fields: string | string[], count: number = 1) {
    const queryString = this.buildQueryParams({ inc: fields, results: count });
    const response = await this.request.get(`${RANDOMUSER_API.BASE_URL}${queryString}`);
    return {
      status: response.status(),
      data: await response.json(),
    };
  }

  /**
   * Fetch users excluding specific fields
   */
  async getUsersExcludingFields(fields: string | string[], count: number = 1) {
    const queryString = this.buildQueryParams({ exc: fields, results: count });
    const response = await this.request.get(`${RANDOMUSER_API.BASE_URL}${queryString}`);
    return {
      status: response.status(),
      data: await response.json(),
    };
  }

  /**
   * Fetch users in specific format
   */
  async getUsersInFormat(format: string, count: number = 1) {
    const queryString = this.buildQueryParams({ format, results: count });
    const response = await this.request.get(`${RANDOMUSER_API.BASE_URL}${queryString}`);
    return {
      status: response.status(),
      data: format === 'json' ? await response.json() : await response.text(),
    };
  }

  /**
   * Fetch users with pagination
   */
  async getUsersWithPagination(seed: string, page: number, resultsPerPage: number = 10) {
    const queryString = this.buildQueryParams({ seed, page, results: resultsPerPage });
    const response = await this.request.get(`${RANDOMUSER_API.BASE_URL}${queryString}`);
    return {
      status: response.status(),
      data: await response.json(),
    };
  }

  /**
   * Fetch users with custom password requirements
   */
  async getUsersWithCustomPassword(passwordSpec: string, count: number = 1) {
    const queryString = this.buildQueryParams({ password: passwordSpec, results: count });
    const response = await this.request.get(`${RANDOMUSER_API.BASE_URL}${queryString}`);
    return {
      status: response.status(),
      data: await response.json(),
    };
  }

  /**
   * Fetch users with combined filters
   */
  async getUsersWithFilters(options: {
    gender?: string;
    nat?: string | string[];
    results?: number;
    fields?: string | string[];
    format?: string;
  }) {
    const inc = options.fields ? options.fields : undefined;
    const queryString = this.buildQueryParams({
      gender: options.gender,
      nat: options.nat,
      results: options.results || 1,
      inc,
      format: options.format,
    });
    const response = await this.request.get(`${RANDOMUSER_API.BASE_URL}${queryString}`);
    return {
      status: response.status(),
      data: options.format === 'json' ? await response.json() : await response.text(),
    };
  }
}
