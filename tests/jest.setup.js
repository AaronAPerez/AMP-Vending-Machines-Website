/**
 * Jest Setup Configuration - Final Fix
 * jest.setup.js
 * 
 * Fixed Issues:
 * - Removed problematic fake timer cleanup
 * - Improved console error filtering
 * - Cleaner lifecycle management
 */

import '@testing-library/jest-dom';

/**
 * Next.js App Router Mocking
 * Mock Next.js navigation hooks for consistent testing
 */
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
      route: '/',
      isReady: true,
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
  useParams() {
    return {};
  },
  notFound: jest.fn(),
  redirect: jest.fn(),
  permanentRedirect: jest.fn(),
}));

/**
 * Next.js Image Component Mock
 * Simplified Image component for testing
 */
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage(props) {
    const { src, alt, width, height, fill, sizes, priority, ...rest } = props;
    return (
      <img
        {...rest}
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        data-testid="next-image"
        data-priority={priority}
        data-sizes={sizes}
      />
    );
  },
}));

/**
 * Next.js Link Component Mock
 * Simplified Link component for testing
 */
jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockLink({ children, href, ...props }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
}));

/**
 * Global Fetch Mock
 * Mock fetch API for API testing
 */
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Make fetch mock available globally for test files
global.mockFetch = mockFetch;

/**
 * Console Error Filtering
 * Suppress known React warnings in test environment
 */
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args) => {
    // Filter out known React warnings that are not relevant in tests
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
       args[0].includes('Warning: An invalid form control') ||
       args[0].includes('validateDOMNesting') ||
       args[0].includes('Warning: Each child in a list should have a unique "key" prop') ||
       args[0].includes('Error submitting form:')) // Filter test-specific errors
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
  
  console.warn = (...args) => {
    // Filter out known warnings including fake timer warnings
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('componentWillReceiveProps has been renamed') ||
       args[0].includes('A function to advance timers was called but the timers APIs are not replaced'))
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

/**
 * Test Lifecycle Hooks
 * Reset state before each test
 */
beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();
  
  // Reset fetch mock
  mockFetch.mockClear();
  
  // Reset DOM state
  document.head.innerHTML = '';
  document.body.innerHTML = '<div id="__next"></div>';
  
  // Reset window properties that might be modified by tests
  delete window.location;
  window.location = new URL('http://localhost:3000');
  
  // Clear localStorage and sessionStorage
  localStorage.clear();
  sessionStorage.clear();
});

afterEach(() => {
  // REMOVED: Problematic fake timer cleanup
  // The fake timer warnings were caused by these lines:
  // jest.runOnlyPendingTimers();
  // jest.useRealTimers();
  
  // Instead, just clear all timers if they exist
  if (global.setTimeout && global.clearTimeout) {
    // Clear any remaining timeouts
    for (let i = 1; i < 1000; i++) {
      clearTimeout(i);
    }
  }
});

/**
 * Global Test Utilities
 * Utility functions available in all test files
 */

// Utility to wait for async operations
global.waitForAsyncOperations = () => 
  new Promise(resolve => setTimeout(resolve, 0));

// Utility to simulate realistic user typing
global.typeWithDelay = async (element, text, delay = 50) => {
  const { userEvent } = await import('@testing-library/user-event');
  const user = userEvent.setup();
  
  for (const char of text) {
    await user.type(element, char);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
};

/**
 * Mock IntersectionObserver
 * Required for components that use intersection observers
 */
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

/**
 * Mock ResizeObserver
 * Required for responsive components
 */
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

/**
 * Mock matchMedia
 * For responsive design testing
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

/**
 * Mock scrollTo
 * For components that use window.scrollTo
 */
window.scrollTo = jest.fn();