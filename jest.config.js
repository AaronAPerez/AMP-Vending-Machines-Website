/**
 * Jest Configuration for AMP Vending Website
 * jest.config.js
 * 
 * Fixed configuration addressing:
 * - moduleNameMapping typo (now moduleNameMapper)
 * - Proper test file matching
 * - Playwright test exclusion
 * - TypeScript support
 * - Next.js integration
 */

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Setup files to run after the test framework is installed
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Test environment for React components
  testEnvironment: 'jsdom',
  
  // FIXED: moduleNameMapping → moduleNameMapper
  moduleNameMapper: {
    // Handle module aliases (matches tsconfig.json paths)
    '^@/(.*)$': '<rootDir>/$1',
  },
  
  // Coverage collection from specific directories
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    'hooks/**/*.{js,jsx,ts,tsx}',
    'app/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/.next/**',
  ],
  
  // Test file patterns - only Jest tests, exclude Playwright
  testMatch: [
    '<rootDir>/tests/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/tests/**/unit/**/*.{test,spec}.{js,jsx,ts,tsx}',
    '<rootDir>/tests/**/components/**/*.{test,spec}.{js,jsx,ts,tsx}',
    '<rootDir>/tests/**/integration/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
  
  // Paths to ignore during testing
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/tests/e2e/',       // Exclude Playwright E2E tests
    '<rootDir>/e2e/',            // Exclude any E2E directory
    '<rootDir>/coverage/',
    '<rootDir>/dist/',
    '<rootDir>/playwright-report/',
    '<rootDir>/test-results/',
  ],
  
  // Transform configuration for different file types
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  
  // Files to not transform
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  
  // File extensions Jest will process
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Test timeout
  testTimeout: 10000,
  
  // Clear mocks automatically between every test
  clearMocks: true,
  
  // Restore mocks after every test
  restoreMocks: true,
  
  // Coverage thresholds (optional - adjust as needed)
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  
  // Coverage reporters
  coverageReporters: ['text', 'lcov', 'html'],
  
  // Verbose output for detailed test results
  verbose: true,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);