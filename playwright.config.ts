import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for E2E Testing
 *
 * Runs tests from tests/e2e/ directory against local dev server
 * or production URL when TEST_BASE_URL is set.
 */
const isCI = !!process.env.CI;

export default defineConfig({
  // All e2e tests are in tests/e2e/
  testDir: './tests/e2e',

  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,

  reporter: [
    ['html'],
    ['list'],
    ...(isCI ? [['github'] as const] : []),
  ],

  use: {
    // Use TEST_BASE_URL env var for production testing, otherwise localhost
    baseURL: process.env.TEST_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !isCI,
    timeout: 120 * 1000,
  },

  // Output directory for test artifacts
  outputDir: 'test-results/',

  // Test timeout
  timeout: 30 * 1000,

  expect: {
    timeout: 5 * 1000,
  },
});