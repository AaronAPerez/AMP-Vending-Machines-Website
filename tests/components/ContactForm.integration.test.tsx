// tests/components/ContactForm.integration.test.tsx - Fixed TypeScript errors

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/components/contact/ContactForm';
import { axe, toHaveNoViolations } from 'jest-axe';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('ContactForm Integration Tests', () => {
  it('should complete full form submission workflow', async () => {
    const user = userEvent.setup();
    
    render(<ContactForm />);

    // Fill out required fields
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe'); 
    await user.type(screen.getByLabelText(/email/i), 'john@company.com');
    await user.type(screen.getByLabelText(/company/i), 'Acme Corp');
    
    // Submit form
    await user.click(screen.getByRole('button', { name: /request information/i }));
    
    // Verify success state
    await waitFor(() => {
      expect(screen.getByText(/thank you for your request/i)).toBeInTheDocument();
    });
  });

  it('should meet accessibility standards', async () => {
    const { container } = render(<ContactForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should handle form validation correctly', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    // Try to submit empty form
    await user.click(screen.getByRole('button', { name: /request information/i }));
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
    });
  });
});
