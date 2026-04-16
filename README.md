# Playwright Test Framework with TypeScript & Page Object Model

A professional, production-ready Playwright test automation framework built with **TypeScript**, **Page Object Model (POM)**, and **Fixture-based testing**. This framework is designed for maintainability, scalability, and best practices in test automation.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [Running Tests](#running-tests)
- [Creating New Tests](#creating-new-tests)
- [Page Objects](#page-objects)
- [Test Fixtures](#test-fixtures)
- [Debugging & Development](#debugging--development)
- [Project Contents](#project-contents)
- [Best Practices](#best-practices)

## 🎯 Overview

This framework automates testing for **https://practice.expandtesting.com**, featuring:
- **TypeScript-first** development with strict type checking
- **Page Object Model** pattern for maintainable test code
- **Custom fixtures** for automatic page object injection into tests
- **Reusable base classes** with 15+ common methods
- **Professional test organization** with clear separation of concerns
- **VS Code integration** with debugging and IntelliSense support

## ✨ Features

✅ **Type-Safe Testing** - Full TypeScript strict mode with IntelliSense  
✅ **Page Object Model** - Clean separation of locators and test logic  
✅ **Custom Fixtures** - Auto-inject page objects into tests  
✅ **Base Page Pattern** - 15+ common methods inherited by all pages  
✅ **Test Utilities** - Retry logic, wait helpers, screenshots  
✅ **Code Quality** - ESLint and Prettier configured  
✅ **VS Code Ready** - Debug configuration and extension recommendations  
✅ **BaseURL Support** - Pre-configured for practice.expandtesting.com  
✅ **Comprehensive Logging** - Screenshots and videos on failures  
✅ **Multi-browser Support** - Runs on Chromium, Firefox, and WebKit  

## 📁 Project Structure

```
playwright-framework/
├── src/
│   ├── pages/
│   │   ├── BasePage.ts              # Abstract base class for all page objects
│   │   ├── ExamplePage.ts           # Page object for example.com
│   │   ├── LoginPage.ts             # Page object for practice site login
│   │   └── SecurePage.ts            # Page object for secure area after login
│   ├── fixtures/
│   │   ├── pageFixtures.ts          # Custom test fixtures for page objects
│   │   └── baseTest.ts              # Extended test interface
│   ├── utils/
│   │   └── testHelpers.ts           # Reusable test utilities and helpers
│   └── types/
│       └── index.ts                 # Custom TypeScript type definitions
├── tests/
│   └── specs/
│       ├── example.spec.ts          # Example.com test suite
│       └── login.spec.ts            # Login page test suite
├── test-results/                    # Test execution results (generated)
├── .vscode/
│   ├── extensions.json              # Recommended VS Code extensions
│   └── launch.json                  # Debug configuration
├── playwright.config.ts             # Playwright configuration (TypeScript)
├── tsconfig.json                    # TypeScript compiler configuration
├── tsconfig.test.json               # TypeScript config for tests
├── eslintrc.json                    # ESLint rules
├── prettier.json                    # Code formatting rules
├── package.json                     # Project dependencies and scripts
└── README.md                        # This file
```

## 📋 Prerequisites

- **Node.js** 16+ installed
- **npm** 7+ or **yarn** package manager
- A code editor (VS Code recommended)

## 🚀 Setup & Installation

### 1. Clone or navigate to the project
```bash
cd ~/playwright-framework
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install Playwright browsers
```bash
npm run install:browsers
```

### 4. (Optional) Open in VS Code
```bash
code .
```

## ▶️ Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (visible browser)
```bash
npm run test:headed
```

### Run specific test file
```bash
npm test tests/specs/login.spec.ts
```

### Run tests matching a pattern
```bash
npm test -- --grep "login"
```

### Run tests with debugger
```bash
npm run test:debug
```

### Run tests with UI mode (interactive)
```bash
npm run test:ui
```

### View test results
```bash
npm run test:report
```

## 📝 Creating New Tests

### Step 1: Create a new Page Object (e.g., `src/pages/DashboardPage.ts`)

```typescript
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly welcomeMessage: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeMessage = page.locator('.welcome-text');
    this.logoutButton = page.locator('button:has-text("Logout")');
  }

  async navigateToDashboard(): Promise<void> {
    await this.goto('/dashboard');
  }

  async verifyWelcomeMessage(): Promise<void> {
    await expect(this.welcomeMessage).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }
}
```

### Step 2: Add the fixture to `src/fixtures/pageFixtures.ts`

```typescript
import { DashboardPage } from '@pages/DashboardPage';

type PageFixtures = {
  // ... existing fixtures ...
  dashboardPage: DashboardPage;
};

export const test = base.extend<PageFixtures>({
  // ... existing fixtures ...
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
});
```

### Step 3: Create test file (e.g., `tests/specs/dashboard.spec.ts`)

```typescript
import { test, expect } from '@fixtures/baseTest';

test.describe('Dashboard Page Tests', () => {
  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.navigateToDashboard();
  });

  test('should display welcome message', async ({ dashboardPage }) => {
    await dashboardPage.verifyWelcomeMessage();
  });

  test('should logout successfully', async ({ dashboardPage }) => {
    await dashboardPage.logout();
    // Add verification for logout
  });
});
```

## 🗂️ Page Objects

Page Objects encapsulate all locators and interactions for a specific page. This pattern improves test maintainability and readability.

### BasePage (`src/pages/BasePage.ts`)
Abstract base class providing common methods:

```typescript
// Navigation
await page.goto(url);
await page.navigateToUrl(url);
await page.reloadPage();
await page.goBack();

// Interactions
await page.click(selector);
await page.fillInput(selector, value);
await page.selectDropdown(selector, value);
await page.typeText(selector, text);

// Visibility & Assertions
await page.isElementVisible(selector);
await page.waitForElement(selector);
await page.waitForNavigation();

// Utilities
await page.screenshot(name);
await page.getTitle();
```

### LoginPage (`src/pages/LoginPage.ts`)
Handles login page interactions:
- `navigateToLogin()` - Navigate to login page
- `login(username, password)` - Perform login
- `enterUsername(username)` - Enter username
- `enterPassword(password)` - Enter password
- `clickLoginButton()` - Click login button
- `verifyLoginPageDisplayed()` - Verify page elements
- `verifyErrorMessageText(message)` - Verify specific error message

### SecurePage (`src/pages/SecurePage.ts`)
Handles the secure area after login:
- `navigateToSecurePage()` - Navigate to /secure
- `verifySuccessMessage()` - Verify "You logged into a secure area!"
- `verifyLogoutButtonVisible()` - Verify logout button
- `verifySecurePageUrl()` - Verify URL
- `clickLogout()` - Perform logout

## 🔌 Test Fixtures

Fixtures provide automatic dependency injection of page objects into tests.

### Example Test Using Fixtures

```typescript
import { test, expect } from '@fixtures/baseTest';

test('user can login successfully', async ({ loginPage, securePage }) => {
  // Page objects are automatically injected
  await loginPage.navigateToLogin();
  await loginPage.login('practice', 'SuperSecretPassword!');
  await securePage.verifySuccessMessage();
});
```

Fixtures automatically:
- Create page object instances
- Inject them into test context
- Clean up after tests
- Handle page lifecycle

## 🐛 Debugging & Development

### VS Code Debugging

1. Open the project in VS Code
2. Press `F5` or go to **Run → Start Debugging**
3. Select **"Run all tests (debug)"**
4. Breakpoints work in TypeScript files

### Headed Mode
See the browser while tests run:
```bash
npm run test:headed
```

### Debug Mode
Step through tests with interactive debugger:
```bash
npm run test:debug
```

### UI Mode
Interactive test explorer:
```bash
npm run test:ui
```

### Type Checking
Check TypeScript without running tests:
```bash
npm run type-check
```

### Code Quality
Run linter:
```bash
npm run lint
```

Format code:
```bash
npm run format
```

## 📦 Project Contents

### Test Files (10 tests total)
- **example.spec.ts** (3 tests)
  - Load example.com homepage
  - Verify heading text
  - Verify page URL

- **login.spec.ts** (7 tests)
  - Display login page
  - **Successful login with valid credentials** (8-step verification)
  - Error message display with invalid username
  - Username input field functionality
  - Password input field functionality
  - Input field data entry tests

### Configuration Files
- **playwright.config.ts** - Playwright runner configuration with baseURL
- **tsconfig.json** - TypeScript strict mode configuration
- **tsconfig.test.json** - TypeScript config for test files
- **package.json** - Dependencies and npm scripts
- **.eslintrc.json** - Code style rules
- **.prettierrc.json** - Code formatting rules

### Source Files
- **BasePage.ts** - Base class with 15+ reusable methods
- **LoginPage.ts** - Login page object with 8+ methods
- **SecurePage.ts** - Secure page object with verification methods
- **ExamplePage.ts** - Example domain page object
- **testHelpers.ts** - Utility functions for tests
- **pageFixtures.ts** - Custom test fixtures
- **baseTest.ts** - Extended test interface

## ✅ Test Results

All 10 tests currently passing:
```
✓ Example Domain Tests (3 passing)
✓ Login Page Tests (7 passing)
```

## 💡 Best Practices

### 1. **Use Page Objects for All Pages**
```typescript
// ✅ Good
const loginPage = new LoginPage(page);
await loginPage.login('user', 'pass');

// ❌ Avoid
await page.locator('#username').fill('user');
await page.locator('#password').fill('pass');
```

### 2. **Use Fixtures for Page Object Injection**
```typescript
// ✅ Good
test('login test', async ({ loginPage }) => {
  // Page object automatically injected
});

// ❌ Avoid
test('login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  // Manual creation
});
```

### 3. **Organize Tests in Describe Blocks**
```typescript
test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLogin();
  });

  test('should login successfully', async ({ loginPage }) => {
    // Test code
  });
});
```

### 4. **Use Meaningful Test Names**
```typescript
// ✅ Good
test('should display error when username is invalid');

// ❌ Avoid
test('test login');
```

### 5. **Keep Tests Independent**
Each test should:
- Not depend on other tests
- Set up its own state
- Clean up after itself
- Be runnable in any order

### 6. **Use Base Page Methods**
```typescript
// ✅ Reuse base methods
await page.waitForElement(selector);
await page.isElementVisible(selector);

// ❌ Avoid reimplementing
await page.locator(selector).waitFor();
```

## 🔍 Test Execution Details

### Successful Login Test
Steps validated:
1. ✅ Browser launched
2. ✅ Navigate to login page
3. ✅ Verify login page displayed
4. ✅ Enter username: "practice"
5. ✅ Enter password: "SuperSecretPassword!"
6. ✅ Click login button
7. ✅ Redirected to /secure page
8. ✅ Success message visible: "You logged into a secure area!"
9. ✅ Logout button displayed

### Invalid Username Error Test
- Enters invalid credentials
- Verifies error message: "Your username is invalid!"

## 🤝 Contributing

When adding new tests or page objects:
1. Follow TypeScript strict mode
2. Use Page Object Model pattern
3. Add JSDoc comments
4. Keep tests independent
5. Update this README

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)

## 📄 License

MIT

---

**Last Updated:** 2026-04-16  
**Framework Version:** 1.0.0  
**Playwright Version:** Latest  
**Node Version:** 16+
