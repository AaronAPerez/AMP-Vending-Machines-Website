import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '@/components/contact/ContactForm';
import { MockedProvider } from '@apollo/client/testing';

describe('ContactForm Integration Tests', () => {
  it('should complete full form submission workflow', async () => {
    const user = userEvent.setup();
    
    render(
      <MockedProvider mocks={[]}>
        <ContactForm />
      </MockedProvider>
    );

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
});