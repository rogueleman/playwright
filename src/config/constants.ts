/**
 * Application-wide constants
 */

// Base URL configuration
export const BASE_URL = 'https://practice.expandtesting.com';

// Login credentials
export const TEST_CREDENTIALS = {
  USERNAME: 'practice',
  PASSWORD: 'SuperSecretPassword!',
} as const;

// Test timeouts (in milliseconds)
export const TIMEOUTS = {
  SHORT: 2000, // For quick element visibility checks
  MEDIUM: 5000, // For standard operations
  LONG: 10000, // For page loads and navigation
} as const;

// Page paths
export const PATHS = {
  LOGIN: '/login',
  REGISTER: '/register',
  SECURE: '/secure',
  BMI: '/bmi',
  DYNAMIC_TABLE: '/dynamic-table',
} as const;

// Common wait states
export const WAIT_STATES = {
  LOAD: 'load',
  NETWORK_IDLE: 'networkidle',
  DOM_CONTENT_LOADED: 'domcontentloaded',
} as const;
