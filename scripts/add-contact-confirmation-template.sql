-- Migration: Add Contact Confirmation Template
-- This adds the editable contact form auto-reply template to the database
-- Run this if you already have the email_templates table created

-- =====================================================
-- Add RPC function for incrementing template usage
-- =====================================================
CREATE OR REPLACE FUNCTION increment_template_usage(p_template_id VARCHAR)
RETURNS void AS $$
BEGIN
  UPDATE email_templates
  SET
    usage_count = usage_count + 1,
    last_used_at = NOW()
  WHERE template_id = p_template_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Allow public access to increment function
GRANT EXECUTE ON FUNCTION increment_template_usage(VARCHAR) TO anon, authenticated;

-- =====================================================
-- Add contact-confirmation template
-- =====================================================
INSERT INTO email_templates (
  template_id,
  name,
  description,
  category,
  subject,
  body,
  variables,
  is_active,
  is_default
) VALUES (
  'contact-confirmation',
  'Contact Form Auto-Reply',
  'Automatic confirmation email sent when contact form is submitted',
  'customer',
  'Thank you for contacting AMP Vending, [FirstName]!',
  '<h1>Thank You for Contacting AMP Vending!</h1>

<p>Dear [FirstName] [LastName],</p>

<p>Thank you for your interest in our premium vending solutions! We''ve received your inquiry and one of our vending specialists will contact you within <strong>24 hours</strong>.</p>

<div style="background-color: #f8f9fa; border-left: 4px solid #FD5A1E; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
    <h2 style="color: #FD5A1E; font-size: 22px; font-weight: 600; margin: 0 0 15px 0;">📋 Your Inquiry Details</h2>
    <p><strong>Name:</strong> [FirstName] [LastName]</p>
    <p><strong>Company:</strong> [Company]</p>
    <p><strong>Email:</strong> [Email]</p>
    <p><strong>Phone:</strong> [Phone]</p>
    <p><strong>Message:</strong> [Message]</p>
</div>

<p>In the meantime, feel free to explore our vending machine solutions on our website.</p>

<p><strong>Why Choose AMP Vending?</strong></p>
<ul>
  <li>✅ <strong>100% FREE</strong> installation and setup</li>
  <li>✅ <strong>NO</strong> upfront costs or contracts</li>
  <li>✅ <strong>24/7</strong> service and support</li>
  <li>✅ <strong>50+</strong> customizable products</li>
  <li>✅ Premium touchscreen machines with contactless payment</li>
</ul>

<div style="text-align: center; margin: 30px 0;">
    <a href="https://www.ampvendingmachines.com/vending-machines" style="display: inline-block; padding: 16px 32px; background-color: #FD5A1E; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
        View Our Vending Machines
    </a>
</div>

<p><strong>Have questions right now?</strong></p>
<p>📞 Call us at <a href="tel:+12094035450">(209) 403-5450</a><br>
📧 Email us at <a href="mailto:ampdesignandconsulting@gmail.com">ampdesignandconsulting@gmail.com</a></p>

<p>Best regards,<br>
<strong>The AMP Vending Team</strong><br>
Premium Vending Solutions for Modern Workplaces</p>',
  '["[FirstName]", "[LastName]", "[Company]", "[Email]", "[Phone]", "[Message]"]'::jsonb,
  true,
  true
)
ON CONFLICT (template_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  subject = EXCLUDED.subject,
  body = EXCLUDED.body,
  variables = EXCLUDED.variables,
  is_active = EXCLUDED.is_active,
  is_default = EXCLUDED.is_default,
  updated_at = NOW();

-- Verify the template was added
SELECT
  template_id,
  name,
  is_active,
  is_default,
  created_at
FROM email_templates
WHERE template_id = 'contact-confirmation';
