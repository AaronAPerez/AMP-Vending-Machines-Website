/**
 * Test Utilities and Helpers
 * Shared utilities for testing contact form components
 */

import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

/**
 * Custom render function with common providers
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { ...options });
}

/**
 * Mock form data for testing
 */
export const mockContactFormData = {
  valid: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    companyName: 'Acme Corp',
    message: 'I am interested in your vending machine services.'
  },
  invalid: {
    missingRequired: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      companyName: '',
      message: ''
    },
    invalidEmail: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid-email',
      phone: '(555) 123-4567',
      companyName: 'Acme Corp',
      message: 'Test message'
    },
    shortMessage: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      companyName: 'Acme Corp',
      message: 'Hi'
    }
  }
};

/**
 * Mock API responses
 */
export const mockApiResponses = {
  success: {
    ok: true,
    status: 200,
    json: async () => ({
      success: true,
      message: 'Message sent successfully!',
      data: {
        customerEmailSent: true,
        businessEmailSent: true
      }
    })
  },
  validationError: {
    ok: false,
    status: 400,
    json: async () => ({
      success: false,
      error: 'Validation failed',
      details: {
        email: 'Invalid email format'
      }
    })
  },
  serverError: {
    ok: false,
    status: 500,
    json: async () => ({
      success: false,
      error: 'Internal server error'
    })
  },
  networkError: new Error('Network error')
};

/**
 * Wait for async operations
 */
export const waitForAsync = (ms: number = 100) =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock window.matchMedia for responsive tests
 */
export function mockMatchMedia(width: number) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: width <= 768 ? query === '(max-width: 768px)' : false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

/**
 * Mock IntersectionObserver for lazy loading tests
 */
export function mockIntersectionObserver() {
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    takeRecords() {
      return [];
    }
    unobserve() {}
  } as any;
}

/**
 * Get form field values
 */
export function getFormValues(form: HTMLFormElement) {
  const formData = new FormData(form);
  const values: Record<string, string> = {};

  formData.forEach((value, key) => {
    values[key] = value.toString();
  });

  return values;
}

/**
 * Mock analytics tracking
 */
export const mockAnalytics = {
  trackFormSubmission: jest.fn(),
  trackPhoneCall: jest.fn(),
  trackGoogleAdsConversion: jest.fn()
};

/**
 * Setup and teardown helpers
 */
export function setupTest() {
  // Mock console methods to reduce test noise
  global.console = {
    ...console,
    error: jest.fn(),
    warn: jest.fn(),
    log: jest.fn(),
  };
}

export function teardownTest() {
  jest.clearAllMocks();
  jest.restoreAllMocks();
}

/**
 * Fill form helper
 */
export async function fillForm(
  user: any,
  screen: any,
  data: typeof mockContactFormData.valid
) {
  await user.type(screen.getByLabelText(/first name/i), data.firstName);
  await user.type(screen.getByLabelText(/last name/i), data.lastName);
  await user.type(screen.getByLabelText(/email/i), data.email);
  if (data.phone) {
    await user.type(screen.getByLabelText(/phone/i), data.phone);
  }
  await user.type(screen.getByLabelText(/company/i), data.companyName);
  if (data.message) {
    await user.type(screen.getByLabelText(/message/i), data.message);
  }
}

/**
 * Assert form submission helper
 */
export function assertFormSubmission(
  mockFetch: jest.Mock,
  expectedData: Partial<typeof mockContactFormData.valid>
) {
  expect(mockFetch).toHaveBeenCalledWith(
    '/api/contact',
    expect.objectContaining({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: expect.stringContaining(expectedData.email || ''),
    })
  );
}
