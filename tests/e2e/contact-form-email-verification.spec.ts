import { test, expect } from '@playwright/test';

/**
 * Contact Form E2E Test
 *
 * Tests the contact form submission flow including:
 * - Form field population
 * - Form submission
 * - Success message display
 * - Optional: Email delivery verification via Resend API
 *
 * Environment Variables:
 * - RESEND_API_KEY: Required for email verification step
 * - TEST_BASE_URL: Optional override for testing against production
 */

// Target email addresses that receive contact form submissions
const TARGET_EMAILS = [
  'ampdesignandconsulting@gmail.com',
  'aaronperezdev@gmail.com'
];

// Type definitions for Resend API response
interface ResendEmail {
  id: string;
  to: string[];
  subject: string;
  status: 'delivered' | 'sent' | 'bounced' | 'failed';
  created_at: string;
}

interface ResendEmailsResponse {
  data: ResendEmail[];
}

test.describe('Contact Form', () => {
  test('submits form and displays success message', async ({ page, baseURL }) => {
    // Use TEST_BASE_URL env var for production testing, otherwise use Playwright's baseURL
    const testUrl = process.env.TEST_BASE_URL || baseURL || 'http://localhost:3000';

    await page.goto(`${testUrl}/contact`);

    // Fill out all required form fields with realistic data (avoids spam filter)
    await page.fill('#firstName', 'Playwright');
    await page.fill('#lastName', 'CI');
    await page.fill('#email', 'playwright.ci@protonmail.com');
    await page.fill('#phone', '(209) 876-5432');
    await page.fill('#companyName', 'CI Pipeline Corp');
    await page.fill('#message', 'Checking the contact form submission flow works correctly in CI.');

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for and verify the success message appears
    // The ContactForm component shows this in a div with role="alert"
    const successAlert = page.locator('[role="alert"]').filter({
      hasText: /Thank you! Your message has been sent successfully/i
    });

    await expect(successAlert).toBeVisible({ timeout: 15000 });
  });

  test('validates required fields before submission', async ({ page, baseURL }) => {
    const testUrl = process.env.TEST_BASE_URL || baseURL || 'http://localhost:3000';

    await page.goto(`${testUrl}/contact`);

    // Try to submit without filling any fields
    await page.click('button[type="submit"]');

    // Verify validation error messages appear for required fields
    await expect(page.locator('#firstName-error')).toBeVisible();
    await expect(page.locator('#lastName-error')).toBeVisible();
    await expect(page.locator('#email-error')).toBeVisible();
    await expect(page.locator('#companyName-error')).toBeVisible();
  });

  test('validates email format', async ({ page, baseURL }) => {
    const testUrl = process.env.TEST_BASE_URL || baseURL || 'http://localhost:3000';

    await page.goto(`${testUrl}/contact`);

    // Fill required fields with invalid email
    await page.fill('#firstName', 'Test');
    await page.fill('#lastName', 'User');
    await page.fill('#email', 'invalid-email');
    await page.fill('#companyName', 'Test Company');
    await page.fill('#message', 'Test message for validation check.');

    // Submit the form
    await page.click('button[type="submit"]');

    // Verify email validation error appears
    await expect(page.locator('#email-error')).toBeVisible();
    await expect(page.locator('#email-error')).toContainText(/invalid email/i);
  });
});

/**
 * Email Delivery Verification Test
 *
 * This test verifies that emails are actually delivered via Resend.
 * Only runs when RESEND_API_KEY is available.
 *
 * Note: This test sends real emails and checks the Resend API logs.
 * Use sparingly to avoid unnecessary email sends.
 */
test.describe('Contact Form Email Delivery', () => {
  // Skip this test suite if RESEND_API_KEY is not configured OR if no production URL is set.
  // Email delivery verification requires a real deployed server (not dev) to reliably send
  // emails through Resend. Running against localhost/dev is unreliable in CI.
  test.skip(
    !process.env.RESEND_API_KEY || !process.env.TEST_BASE_URL,
    'RESEND_API_KEY and TEST_BASE_URL must both be set to run email delivery verification'
  );

  test('verifies email delivery via Resend API', async ({ page, baseURL }) => {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const testUrl = process.env.TEST_BASE_URL || baseURL || 'http://localhost:3000';

    // Generate unique reference ID to identify this specific email in Resend logs.
    // Use a prefix that does NOT match spam filter patterns (no "test-\d{8,}" or @example.com).
    const refId = `ci-${Date.now()}`;
    const testEmail = `playwright+${refId}@protonmail.com`;

    await page.goto(`${testUrl}/contact`);

    // Fill out the form with realistic data that passes spam filters.
    // Avoid: @example.com, 555-000-xxxx phones, "E2E Test" / "please disregard" in text.
    await page.fill('#firstName', 'Playwright');
    await page.fill('#lastName', 'CI');
    await page.fill('#email', testEmail);
    await page.fill('#phone', '(209) 876-5432');
    await page.fill('#companyName', `Pipeline Verification ${refId}`);
    await page.fill('#message', `CI pipeline contact form check. Reference: ${refId}. Verifying end-to-end delivery.`);

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for success message
    const successAlert = page.locator('[role="alert"]').filter({
      hasText: /Thank you! Your message has been sent successfully/i
    });
    await expect(successAlert).toBeVisible({ timeout: 15000 });

    // Wait for Resend to process the email (delivery can take a few seconds)
    await page.waitForTimeout(5000);

    // Check Resend API for the delivered email
    const response = await fetch('https://api.resend.com/emails', {
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    expect(response.ok).toBeTruthy();

    const data = (await response.json()) as ResendEmailsResponse;

    // Verify at least one email was delivered to one of the target addresses
    // and contains the expected subject
    const deliveredEmail = data.data.find((email) => {
      // Check if any of the target emails are in the 'to' array
      const sentToTargetEmail = email.to.some((recipient) =>
        TARGET_EMAILS.some((target) => recipient.toLowerCase().includes(target.toLowerCase()))
      );

      // Check if subject contains expected text
      const hasExpectedSubject = email.subject.toLowerCase().includes('contact');

      // Check delivery status (accept 'delivered' or 'sent' as the email may still be in transit)
      const isDelivered = email.status === 'delivered' || email.status === 'sent';

      return sentToTargetEmail && hasExpectedSubject && isDelivered;
    });

    expect(deliveredEmail).toBeDefined();
  });
});
