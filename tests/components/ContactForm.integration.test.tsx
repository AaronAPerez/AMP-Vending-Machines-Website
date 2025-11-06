/**
 * ContactForm Integration Tests
 * tests/components/ContactForm.integration.test.tsx
 * 
 * FIXED: TypeScript syntax error on line 28
 * Changed from: let user: ReturnType<typeof userEvent.setup>;
 * To: let user: any; (simpler approach that works with Jest)
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Import the component to test
const ContactForm = React.lazy(() => import('../../components/contact/ContactForm'));

describe('ContactForm Integration Tests', () => {
  // FIXED: Simplified TypeScript typing
  let user: any;

  beforeEach(() => {
    user = userEvent.setup();
    mockFetch.mockClear();
    
    // Reset DOM
    document.body.innerHTML = '';
    
    // Mock successful API response by default
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true, message: 'Message sent successfully!' }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Form Structure and Accessibility', () => {
    it('should have proper form structure for accessibility', async () => {
      render(
        <React.Suspense fallback={<div>Loading...</div>}>
          <ContactForm />
        </React.Suspense>
      );

      // Wait for component to load
      await waitFor(() => {
        expect(screen.getByRole('form')).toBeInTheDocument();
      });

      // Check for form elements
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('should have proper ARIA attributes for accessibility', async () => {
      render(
        <React.Suspense fallback={<div>Loading...</div>}>
          <ContactForm />
        </React.Suspense>
      );

      await waitFor(() => {
        expect(screen.getByRole('form')).toBeInTheDocument();
      });

      // Check ARIA attributes
      const form = screen.getByRole('form');
      expect(form).toHaveAttribute('aria-label');

      // Check required fields have aria-required
      const nameField = screen.getByLabelText(/name/i);
      const emailField = screen.getByLabelText(/email/i);
      const messageField = screen.getByLabelText(/message/i);

      expect(nameField).toHaveAttribute('aria-required', 'true');
      expect(emailField).toHaveAttribute('aria-required', 'true');
      expect(messageField).toHaveAttribute('aria-required', 'true');
    });

    it('should have proper heading structure', async () => {
      render(
        <React.Suspense fallback={<div>Loading...</div>}>
          <ContactForm />
        </React.Suspense>
      );

      await waitFor(() => {
        expect(screen.getByRole('heading')).toBeInTheDocument();
      });

      // Check heading hierarchy
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(/contact/i);
    });
  });

  describe('Form Validation', () => {
    it('should validate required fields on submission', async () => {
      render(
        <React.Suspense fallback={<div>Loading...</div>}>
          <ContactForm />
        </React.Suspense>
      );

      await waitFor(() => {
        expect(screen.getByRole('form')).toBeInTheDocument();
      });

      const submitButton = screen.getByRole('button', { name: /send message/i });
      
      // Try to submit empty form
      await user.click(submitButton);

      // Check for validation errors
      await waitFor(() => {
        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/message is required/i)).toBeInTheDocument();
      });

      // Ensure form was not submitted
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should validate email format', async () => {
      render(
        <React.Suspense fallback={<div>Loading...</div>}>
          <ContactForm />
        </React.Suspense>
      );

      await waitFor(() => {
        expect(screen.getByRole('form')).toBeInTheDocument();
      });

      const emailField = screen.getByLabelText(/email/i);
      
      // Enter invalid email
      await user.type(emailField, 'invalid-email');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      // Check for email validation error
      await waitFor(() => {
        expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
      });
    });

    it('should accept valid form data', async () => {
      render(
        <React.Suspense fallback={<div>Loading...</div>}>
          <ContactForm />
        </React.Suspense>
      );

      await waitFor(() => {
        expect(screen.getByRole('form')).toBeInTheDocument();
      });

      // Fill out form with valid data
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/phone/i), '555-1234');
      await user.type(screen.getByLabelText(/company/i), 'Test Company');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');

      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      // Wait for form submission
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: expect.stringContaining('John Doe'),
        }));
      });
    });
  });

  describe('API Integration', () => {
    it('should handle successful form submission', async () => {
      render(
        <React.Suspense fallback={<div>Loading...</div>}>
          <ContactForm />
        </React.Suspense>
      );

      await waitFor(() => {
        expect(screen.getByRole('form')).toBeInTheDocument();
      });

      // Fill out and submit form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'Test message');

      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      // Wait for success message
      await waitFor(() => {
        expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
      });
    });

    it('should handle API errors gracefully', async () => {
      // Mock API error
      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ error: 'Validation failed' }),
      });

      render(
        <React.Suspense fallback={<div>Loading...</div>}>
          <ContactForm />
        </React.Suspense>
      );

      await waitFor(() => {
        expect(screen.getByRole('form')).toBeInTheDocument();
      });

      // Fill out and submit form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'Test message');

      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      // Wait for error message
      await waitFor(() => {
        expect(screen.getByText(/failed to submit form/i)).toBeInTheDocument();
      });
    });

    it('should handle server errors (500)', async () => {
      // Mock server error
      mockFetch.mockRejectedValue(new Error('Network error'));

      render(
        <React.Suspense fallback={<div>Loading...</div>}>
          <ContactForm />
        </React.Suspense>
      );

      await waitFor(() => {
        expect(screen.getByRole('form')).toBeInTheDocument();
      });

      // Fill out and submit form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'Test message');

      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      // Wait for error handling
      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument();
      });
    });

    it('should show loading state during submission', async () => {
      // Mock slow API response
      mockFetch.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({
          ok: true,
          status: 200,
          json: async () => ({ success: true }),
        }), 100))
      );

      render(
        <React.Suspense fallback={<div>Loading...</div>}>
          <ContactForm />
        </React.Suspense>
      );

      await waitFor(() => {
        expect(screen.getByRole('form')).toBeInTheDocument();
      });

      // Fill out and submit form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'Test message');

      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      // Check for loading state
      expect(screen.getByText(/sending/i)).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
  });

  describe('User Experience', () => {
    it('should provide helpful descriptions for form fields', async () => {
      render(
        <React.Suspense fallback={<div>Loading...</div>}>
          <ContactForm />
        </React.Suspense>
      );

      await waitFor(() => {
        expect(screen.getByRole('form')).toBeInTheDocument();
      });

      // Check for field descriptions
      expect(screen.getByText(/we'll get back to you/i)).toBeInTheDocument();
    });

    it('should have proper focus management', async () => {
      render(
        <React.Suspense fallback={<div>Loading...</div>}>
          <ContactForm />
        </React.Suspense>
      );

      await waitFor(() => {
        expect(screen.getByRole('form')).toBeInTheDocument();
      });

      const nameField = screen.getByLabelText(/name/i);
      
      // Tab to first field
      await user.tab();
      expect(nameField).toHaveFocus();
    });

    it('should clear form after successful submission', async () => {
      render(
        <React.Suspense fallback={<div>Loading...</div>}>
          <ContactForm />
        </React.Suspense>
      );

      await waitFor(() => {
        expect(screen.getByRole('form')).toBeInTheDocument();
      });

      const nameField = screen.getByLabelText(/name/i);
      const emailField = screen.getByLabelText(/email/i);
      const messageField = screen.getByLabelText(/message/i);

      // Fill out form
      await user.type(nameField, 'John Doe');
      await user.type(emailField, 'john@example.com');
      await user.type(messageField, 'Test message');

      // Submit form
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      // Wait for success and form clear
      await waitFor(() => {
        expect(nameField).toHaveValue('');
        expect(emailField).toHaveValue('');
        expect(messageField).toHaveValue('');
      });
    });
  });

  describe('Contact Information Display', () => {
    it('should display contact information correctly', async () => {
      render(
        <React.Suspense fallback={<div>Loading...</div>}>
          <ContactForm />
        </React.Suspense>
      );

      await waitFor(() => {
        expect(screen.getByRole('form')).toBeInTheDocument();
      });

      // Check for contact information
      expect(screen.getByText(/contact information/i)).toBeInTheDocument();
      expect(screen.getByText(/phone/i)).toBeInTheDocument();
      expect(screen.getByText(/email/i)).toBeInTheDocument();
    });

    it('should display business hours', async () => {
      render(
        <React.Suspense fallback={<div>Loading...</div>}>
          <ContactForm />
        </React.Suspense>
      );

      await waitFor(() => {
        expect(screen.getByRole('form')).toBeInTheDocument();
      });

      // Check for business hours
      expect(screen.getByText(/business hours/i)).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('should adapt layout for mobile devices', async () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(
        <React.Suspense fallback={<div>Loading...</div>}>
          <ContactForm />
        </React.Suspense>
      );

      await waitFor(() => {
        expect(screen.getByRole('form')).toBeInTheDocument();
      });

      // Form should be responsive
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
    });
  });

  describe('SEO and Performance', () => {
    it('should have proper semantic structure for SEO', async () => {
      render(
        <React.Suspense fallback={<div>Loading...</div>}>
          <ContactForm />
        </React.Suspense>
      );

      await waitFor(() => {
        expect(screen.getByRole('form')).toBeInTheDocument();
      });

      // Check semantic structure
      expect(screen.getByRole('main') || screen.getByRole('form')).toBeInTheDocument();
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });
  });
});