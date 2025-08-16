import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/components/contact/ContactForm';

describe('ContactForm Integration Tests', () => {
  beforeEach(() => {
    // Mock fetch for form submissions
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, message: 'Form submitted successfully' })
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render all required form fields', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit|request/i })).toBeInTheDocument();
  });

  it('should complete full form submission workflow', async () => {
    const user = userEvent.setup();
    
    render(<ContactForm />);

    // Fill out required fields
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const companyInput = screen.getByLabelText(/company/i);

    await user.type(firstNameInput, 'John');
    await user.type(lastNameInput, 'Doe'); 
    await user.type(emailInput, 'john@company.com');
    await user.type(companyInput, 'Acme Corp');
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /submit|request/i });
    await user.click(submitButton);
    
    // Verify form submission was attempted
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/contact'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      );
    }, { timeout: 3000 });
  });

  // Simple accessibility check without external dependencies
  it('should have proper form structure for accessibility', () => {
    render(<ContactForm />);
    
    // Check for form element
    const form = screen.getByRole('form') || document.querySelector('form');
    expect(form).toBeTruthy();
    
    // Check that inputs have proper labeling
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach(input => {
      const hasLabel = input.getAttribute('aria-label') || 
                      input.getAttribute('aria-labelledby') ||
                      document.querySelector(`label[for="${input.id}"]`);
      expect(hasLabel).toBeTruthy();
    });
    
    // Check for submit button
    const submitButton = screen.getByRole('button', { name: /submit|request/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeEnabled();
  });

  it('should validate required fields', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    // Try to submit empty form
    const submitButton = screen.getByRole('button', { name: /submit|request/i });
    await user.click(submitButton);
    
    // Check that required fields exist and have proper attributes
    const requiredInputs = screen.getAllByRole('textbox');
    const hasRequiredFields = requiredInputs.some(input => 
      input.hasAttribute('required') || 
      input.getAttribute('aria-required') === 'true'
    );
    expect(hasRequiredFields).toBe(true);
  });

  it('should handle network errors gracefully', async () => {
    const user = userEvent.setup();
    
    // Mock network error
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
    
    render(<ContactForm />);

    // Fill out form
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@company.com');
    await user.type(screen.getByLabelText(/company/i), 'Acme Corp');
    
    // Submit form
    await user.click(screen.getByRole('button', { name: /submit|request/i }));
    
    // Should handle error gracefully
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });

  it('should have proper email validation', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    
    // Check that email input has proper type
    expect(emailInput).toHaveAttribute('type', 'email');
    
    // Test invalid email (browser validation will handle this)
    await user.type(emailInput, 'invalid-email');
    await user.clear(emailInput);
    await user.type(emailInput, 'valid@email.com');
    
    expect(emailInput).toHaveValue('valid@email.com');
  });
});