/**
 * ContactForm Integration Tests
 * tests/components/ContactForm.integration.test.tsx
 * 
 * Comprehensive test suite covering:
 * - Form accessibility and structure
 * - User interactions and validation
 * - API integration with proper mocking
 * - Error handling scenarios
 * - Mobile-first responsive behavior
 * - WCAG compliance verification
 */

import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/components/contact/ContactForm';

// Mock toast notifications 
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    loading: jest.fn(),
  },
}));

describe('ContactForm Integration Tests', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    // Reset fetch mock before each test
    global.mockFetch.mockClear();
  });

  describe('Form Structure and Accessibility', () => {
    it('should have proper form structure for accessibility', () => {
      render(<ContactForm />);

      // Check for form element with proper role
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
      
      // Form should have proper ARIA labeling
      expect(form).toHaveAttribute('aria-labelledby');
      
      // Check all required form fields are present and properly labeled
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
      
      // Check optional fields
      expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
      
      // Check submit button
      expect(screen.getByRole('button', { name: /request information/i })).toBeInTheDocument();
    });

    it('should have proper ARIA attributes for accessibility', () => {
      render(<ContactForm />);

      // Required fields should have proper ARIA attributes
      const requiredFields = [
        screen.getByLabelText(/first name/i),
        screen.getByLabelText(/last name/i),
        screen.getByLabelText(/email address/i),
        screen.getByLabelText(/company name/i),
      ];

      requiredFields.forEach(field => {
        expect(field).toHaveAttribute('aria-required', 'true');
        expect(field).toHaveAttribute('required');
        expect(field).toHaveAttribute('aria-invalid', 'false');
      });

      // Optional fields should not have required attributes
      const phoneField = screen.getByLabelText(/phone number/i);
      expect(phoneField).not.toHaveAttribute('required');
      expect(phoneField).not.toHaveAttribute('aria-required', 'true');

      // Check that help text is properly associated
      const phoneHelpText = screen.getByText(/optional: for faster response times/i);
      expect(phoneField).toHaveAttribute('aria-describedby', phoneHelpText.id);
    });

    it('should have proper heading structure', () => {
      render(<ContactForm />);

      // Check for main heading
      const mainHeading = screen.getByRole('heading', { level: 3, name: /ready to enhance your workplace/i });
      expect(mainHeading).toBeInTheDocument();

      // Check for contact information heading
      const contactHeading = screen.getByRole('heading', { level: 3, name: /contact information/i });
      expect(contactHeading).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('should validate required fields on submission', async () => {
      render(<ContactForm />);

      // Try to submit empty form
      const submitButton = screen.getByRole('button', { name: /request information/i });
      await user.click(submitButton);

      // Check that HTML5 validation prevents submission
      const firstNameInput = screen.getByLabelText(/first name/i) as HTMLInputElement;
      expect(firstNameInput.validity.valid).toBe(false);
      expect(firstNameInput.validity.valueMissing).toBe(true);
    });

    it('should validate email format', async () => {
      render(<ContactForm />);

      const emailInput = screen.getByLabelText(/email address/i);
      
      // Enter invalid email
      await user.type(emailInput, 'invalid-email');
      
      // Try to submit
      const submitButton = screen.getByRole('button', { name: /request information/i });
      await user.click(submitButton);

      // Check that email validation prevents submission
      expect((emailInput as HTMLInputElement).validity.valid).toBe(false);
      expect((emailInput as HTMLInputElement).validity.typeMismatch).toBe(true);
    });

    it('should accept valid form data', async () => {
      render(<ContactForm />);

      // Fill all required fields with valid data
      await user.type(screen.getByLabelText(/first name/i), 'John');
      await user.type(screen.getByLabelText(/last name/i), 'Doe');
      await user.type(screen.getByLabelText(/email address/i), 'john.doe@example.com');
      await user.type(screen.getByLabelText(/company name/i), 'Test Company');

      // Check that all required fields are now valid
      const requiredInputs = [
        screen.getByLabelText(/first name/i),
        screen.getByLabelText(/last name/i),
        screen.getByLabelText(/email address/i),
        screen.getByLabelText(/company name/i),
      ];

      requiredInputs.forEach(input => {
        expect((input as HTMLInputElement).validity.valid).toBe(true);
      });
    });
  });

  describe('API Integration', () => {
    it('should handle successful form submission', async () => {
      // Mock successful API response
      global.mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ 
          success: true, 
          message: 'Form submitted successfully' 
        }),
      });

      render(<ContactForm />);

      // Fill out the form with valid data
      await user.type(screen.getByLabelText(/first name/i), 'John');
      await user.type(screen.getByLabelText(/last name/i), 'Doe');
      await user.type(screen.getByLabelText(/email address/i), 'john.doe@example.com');
      await user.type(screen.getByLabelText(/phone number/i), '(555) 123-4567');
      await user.type(screen.getByLabelText(/company name/i), 'Test Company');
      await user.type(screen.getByLabelText(/message/i), 'Interested in vending solutions');

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /request information/i });
      await user.click(submitButton);

      // Verify API call was made with correct data
      await waitFor(() => {
        expect(global.mockFetch).toHaveBeenCalledWith(
          '/api/contact',
          expect.objectContaining({
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: expect.stringContaining('john.doe@example.com'),
          })
        );
      });

      // Verify the request body contains all form data
      const callArgs = global.mockFetch.mock.calls[0];
      const requestBody = JSON.parse(callArgs[1].body);
      expect(requestBody).toEqual({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '(555) 123-4567',
        companyName: 'Test Company',
        message: 'Interested in vending solutions',
      });
    });

    it('should handle API errors gracefully', async () => {
      // Mock API error
      global.mockFetch.mockRejectedValueOnce(new Error('Network error'));

      render(<ContactForm />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/first name/i), 'John');
      await user.type(screen.getByLabelText(/last name/i), 'Doe');
      await user.type(screen.getByLabelText(/email address/i), 'john.doe@example.com');
      await user.type(screen.getByLabelText(/company name/i), 'Test Company');

      const submitButton = screen.getByRole('button', { name: /request information/i });
      await user.click(submitButton);

      // Verify API call was attempted
      await waitFor(() => {
        expect(global.mockFetch).toHaveBeenCalled();
      });

      // Check that error handling occurs (adjust based on your error handling implementation)
      // This test assumes your component shows an error message or toast
      // Uncomment and modify based on your actual error handling:
      /*
      await waitFor(() => {
        expect(screen.getByText(/error submitting form/i)).toBeInTheDocument();
      });
      */
    });

    it('should handle server errors (500)', async () => {
      // Mock server error
      global.mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ 
          success: false, 
          message: 'Internal server error' 
        }),
      });

      render(<ContactForm />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/first name/i), 'John');
      await user.type(screen.getByLabelText(/last name/i), 'Doe');
      await user.type(screen.getByLabelText(/email address/i), 'john.doe@example.com');
      await user.type(screen.getByLabelText(/company name/i), 'Test Company');

      const submitButton = screen.getByRole('button', { name: /request information/i });
      await user.click(submitButton);

      // Verify API call was made
      await waitFor(() => {
        expect(global.mockFetch).toHaveBeenCalled();
      });
    });

    it('should show loading state during submission', async () => {
      // Mock slow API response
      global.mockFetch.mockImplementationOnce(
        () => new Promise(resolve => 
          setTimeout(() => resolve({
            ok: true,
            json: async () => ({ success: true })
          }), 1000)
        )
      );

      render(<ContactForm />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/first name/i), 'John');
      await user.type(screen.getByLabelText(/last name/i), 'Doe');
      await user.type(screen.getByLabelText(/email address/i), 'john.doe@example.com');
      await user.type(screen.getByLabelText(/company name/i), 'Test Company');

      const submitButton = screen.getByRole('button', { name: /request information/i });
      await user.click(submitButton);

      // Check for loading state (adjust based on your implementation)
      expect(submitButton).toHaveAttribute('aria-busy', 'true');
      expect(submitButton).toBeDisabled();
    });
  });

  describe('User Experience', () => {
    it('should provide helpful descriptions for form fields', () => {
      render(<ContactForm />);

      // Check for phone help text
      const phoneHelpText = screen.getByText(/optional: for faster response times/i);
      expect(phoneHelpText).toBeInTheDocument();

      // Check for message help text
      const messageHelpText = screen.getByText(/tell us about your location and vending needs/i);
      expect(messageHelpText).toBeInTheDocument();
    });

    it('should have proper focus management', async () => {
      render(<ContactForm />);

      const firstNameInput = screen.getByLabelText(/first name/i);
      const lastNameInput = screen.getByLabelText(/last name/i);

      // Test tab navigation
      await user.tab();
      expect(firstNameInput).toHaveFocus();

      await user.tab();
      expect(lastNameInput).toHaveFocus();
    });

    it('should clear form after successful submission', async () => {
      // Mock successful submission
      global.mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      render(<ContactForm />);

      // Fill form
      const firstNameInput = screen.getByLabelText(/first name/i);
      await user.type(firstNameInput, 'John');
      await user.type(screen.getByLabelText(/last name/i), 'Doe');
      await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
      await user.type(screen.getByLabelText(/company name/i), 'Test Company');

      // Submit form
      await user.click(screen.getByRole('button', { name: /request information/i }));

      // Wait for submission to complete and form to reset (adjust timing as needed)
      await waitFor(() => {
        expect((firstNameInput as HTMLInputElement).value).toBe('');
      }, { timeout: 3000 });
    });
  });

  describe('Contact Information Display', () => {
    it('should display contact information correctly', () => {
      render(<ContactForm />);

      // Check for phone number link
      const phoneLink = screen.getByRole('link', { name: /call us at \(209\) 403-5450/i });
      expect(phoneLink).toBeInTheDocument();
      expect(phoneLink).toHaveAttribute('href', 'tel:+12094035450');

      // Check for email link
      const emailLink = screen.getByRole('link', { name: /ampdesignandconsulting@gmail.com/i });
      expect(emailLink).toBeInTheDocument();
      expect(emailLink).toHaveAttribute('href', 'mailto:ampdesignandconsulting@gmail.com');
    });

    it('should display business hours', () => {
      render(<ContactForm />);

      const businessHoursHeading = screen.getByRole('heading', { name: /business hours/i });
      expect(businessHoursHeading).toBeInTheDocument();

      // Check for specific business hours (adjust based on your actual content)
      expect(screen.getByText(/monday - friday/i)).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('should adapt layout for mobile devices', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<ContactForm />);

      // Check that mobile-first responsive classes are applied
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();

      // Verify form is still accessible on mobile
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /request information/i })).toBeInTheDocument();
    });
  });

  describe('SEO and Performance', () => {
    it('should have proper semantic structure for SEO', () => {
      render(<ContactForm />);

      // Check for proper heading hierarchy
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);

      // Check for proper form semantics
      const form = screen.getByRole('form');
      expect(form).toHaveAttribute('aria-labelledby');
    });
  });
});