/**
 * Contact Form E2E Tests
 * End-to-end tests using Playwright
 */

import { test, expect } from '@playwright/test';

test.describe('Contact Form E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to contact page
    await page.goto('/contact');

    // Wait for form to be visible
    await page.waitForSelector('form[aria-label*="contact" i]', { timeout: 5000 });
  });

  test.describe('Form Display and Layout', () => {
    test('should display all form fields', async ({ page }) => {
      // Check all required fields are visible
      await expect(page.getByLabel(/first name/i)).toBeVisible();
      await expect(page.getByLabel(/last name/i)).toBeVisible();
      await expect(page.getByLabel(/email/i)).toBeVisible();
      await expect(page.getByLabel(/phone/i)).toBeVisible();
      await expect(page.getByLabel(/company/i)).toBeVisible();
      await expect(page.getByLabel(/message/i)).toBeVisible();

      // Check submit button
      await expect(page.getByRole('button', { name: /send message/i })).toBeVisible();
    });

    test('should have proper page title and heading', async ({ page }) => {
      // Check page title
      await expect(page).toHaveTitle(/contact/i);

      // Check main heading
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeVisible();
      await expect(heading).toContainText(/contact/i);
    });

    test('should display contact information', async ({ page }) => {
      // Check for business contact details
      await expect(page.getByText(/phone/i)).toBeVisible();
      await expect(page.getByText(/email/i)).toBeVisible();
    });
  });

  test.describe('Form Validation', () => {
    test('should show validation errors for empty required fields', async ({ page }) => {
      // Click submit without filling form
      await page.getByRole('button', { name: /send message/i }).click();

      // Check for error messages
      await expect(page.getByText(/first name is required/i)).toBeVisible();
      await expect(page.getByText(/last name is required/i)).toBeVisible();
      await expect(page.getByText(/email is required/i)).toBeVisible();
      await expect(page.getByText(/company name is required/i)).toBeVisible();
    });

    test('should show error for invalid email format', async ({ page }) => {
      // Fill in fields with invalid email
      await page.getByLabel(/first name/i).fill('John');
      await page.getByLabel(/last name/i).fill('Doe');
      await page.getByLabel(/email/i).fill('invalid-email');
      await page.getByLabel(/company/i).fill('Test Company');

      // Submit form
      await page.getByRole('button', { name: /send message/i }).click();

      // Check for email validation error
      await expect(page.getByText(/invalid email/i)).toBeVisible();
    });

    test('should clear validation errors when user types', async ({ page }) => {
      // Submit empty form to show errors
      await page.getByRole('button', { name: /send message/i }).click();
      await expect(page.getByText(/first name is required/i)).toBeVisible();

      // Start typing in first name field
      await page.getByLabel(/first name/i).fill('J');

      // Error should disappear
      await expect(page.getByText(/first name is required/i)).not.toBeVisible();
    });
  });

  test.describe('Form Submission', () => {
    test('should successfully submit valid form data', async ({ page }) => {
      // Fill out the form
      await page.getByLabel(/first name/i).fill('John');
      await page.getByLabel(/last name/i).fill('Doe');
      await page.getByLabel(/email/i).fill('john.doe@example.com');
      await page.getByLabel(/phone/i).fill('555-123-4567');
      await page.getByLabel(/company/i).fill('Acme Corp');
      await page.getByLabel(/message/i).fill('I am interested in your vending machine services.');

      // Mock the API response
      await page.route('**/api/contact', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            message: 'Message sent successfully!'
          })
        });
      });

      // Submit the form
      await page.getByRole('button', { name: /send message/i }).click();

      // Wait for success message
      await expect(page.getByText(/message sent successfully/i)).toBeVisible({ timeout: 10000 });
    });

    test('should show loading state during submission', async ({ page }) => {
      // Fill out the form
      await page.getByLabel(/first name/i).fill('John');
      await page.getByLabel(/last name/i).fill('Doe');
      await page.getByLabel(/email/i).fill('john.doe@example.com');
      await page.getByLabel(/company/i).fill('Acme Corp');

      // Mock slow API response
      await page.route('**/api/contact', async route => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await route.fulfill({
          status: 200,
          body: JSON.stringify({ success: true })
        });
      });

      // Submit form
      await page.getByRole('button', { name: /send message/i }).click();

      // Check for loading state
      const submitButton = page.getByRole('button', { name: /sending/i });
      await expect(submitButton).toBeDisabled();
    });

    test('should handle API errors gracefully', async ({ page }) => {
      // Fill out the form
      await page.getByLabel(/first name/i).fill('John');
      await page.getByLabel(/last name/i).fill('Doe');
      await page.getByLabel(/email/i).fill('john.doe@example.com');
      await page.getByLabel(/company/i).fill('Acme Corp');

      // Mock API error
      await page.route('**/api/contact', async route => {
        await route.fulfill({
          status: 500,
          body: JSON.stringify({ error: 'Internal server error' })
        });
      });

      // Submit form
      await page.getByRole('button', { name: /send message/i }).click();

      // Check for error message
      await expect(page.getByText(/error/i)).toBeVisible();
    });

    test('should clear form after successful submission', async ({ page }) => {
      // Fill out the form
      await page.getByLabel(/first name/i).fill('John');
      await page.getByLabel(/last name/i).fill('Doe');
      await page.getByLabel(/email/i).fill('john.doe@example.com');
      await page.getByLabel(/company/i).fill('Acme Corp');
      await page.getByLabel(/message/i).fill('Test message');

      // Mock successful response
      await page.route('**/api/contact', async route => {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({ success: true })
        });
      });

      // Submit form
      await page.getByRole('button', { name: /send message/i }).click();

      // Wait for success
      await expect(page.getByText(/success/i)).toBeVisible();

      // Check that form is cleared
      await expect(page.getByLabel(/first name/i)).toHaveValue('');
      await expect(page.getByLabel(/last name/i)).toHaveValue('');
      await expect(page.getByLabel(/email/i)).toHaveValue('');
    });
  });

  test.describe('Accessibility', () => {
    test('should be keyboard navigable', async ({ page }) => {
      // Tab through form fields
      await page.keyboard.press('Tab');
      await expect(page.getByLabel(/first name/i)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByLabel(/last name/i)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByLabel(/email/i)).toBeFocused();
    });

    test('should have proper ARIA labels', async ({ page }) => {
      const form = page.locator('form[aria-label*="contact" i]');
      await expect(form).toHaveAttribute('aria-label');

      // Check required fields have aria-required
      await expect(page.getByLabel(/first name/i)).toHaveAttribute('aria-required', 'true');
      await expect(page.getByLabel(/last name/i)).toHaveAttribute('aria-required', 'true');
      await expect(page.getByLabel(/email/i)).toHaveAttribute('aria-required', 'true');
    });

    test('should announce errors to screen readers', async ({ page }) => {
      // Submit empty form
      await page.getByRole('button', { name: /send message/i }).click();

      // Check error messages have proper role
      const errors = page.locator('[role="alert"]');
      await expect(errors.first()).toBeVisible();
    });
  });

  test.describe('Mobile Responsiveness', () => {
    test('should work on mobile viewport', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      // Form should still be functional
      await expect(page.getByLabel(/first name/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /send message/i })).toBeVisible();

      // Fill and submit form
      await page.getByLabel(/first name/i).fill('John');
      await page.getByLabel(/last name/i).fill('Doe');
      await page.getByLabel(/email/i).fill('john@example.com');
      await page.getByLabel(/company/i).fill('Test');

      await page.route('**/api/contact', route => {
        route.fulfill({
          status: 200,
          body: JSON.stringify({ success: true })
        });
      });

      await page.getByRole('button', { name: /send message/i }).click();
      await expect(page.getByText(/success/i)).toBeVisible();
    });

    test('should work on tablet viewport', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });

      await expect(page.getByLabel(/first name/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /send message/i })).toBeVisible();
    });
  });

  test.describe('Performance', () => {
    test('should load quickly', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/contact');
      await page.waitForSelector('form[aria-label*="contact" i]');
      const loadTime = Date.now() - startTime;

      // Page should load in under 3 seconds
      expect(loadTime).toBeLessThan(3000);
    });

    test('should not have console errors', async ({ page }) => {
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      await page.goto('/contact');
      await page.waitForLoadState('networkidle');

      // Should not have any console errors
      expect(errors).toHaveLength(0);
    });
  });

  test.describe('SEO', () => {
    test('should have proper meta tags', async ({ page }) => {
      await page.goto('/contact');

      // Check meta description
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription).toContain('contact');
    });

    test('should have proper heading structure', async ({ page }) => {
      // Should have h1
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();

      // h1 should be about contact
      await expect(h1).toContainText(/contact/i);
    });
  });
});
