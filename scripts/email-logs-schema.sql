-- Email Logs Table
-- Stores history of all emails sent from admin dashboard

CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_user_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  recipient_email VARCHAR(255) NOT NULL,
  subject TEXT NOT NULL,
  template_used VARCHAR(100),
  contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
  message_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'pending')),
  metadata JSONB,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_email_logs_admin_user_id ON email_logs(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_contact_id ON email_logs(contact_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_recipient_email ON email_logs(recipient_email);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON email_logs(sent_at DESC);

-- Add RLS (Row Level Security) policies
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Admin users can view all email logs
CREATE POLICY "Admin users can view all email logs"
  ON email_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- Policy: Admin users can insert email logs
CREATE POLICY "Admin users can create email logs"
  ON email_logs
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- Policy: Admin users can update email logs
CREATE POLICY "Admin users can update email logs"
  ON email_logs
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_email_logs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER email_logs_updated_at_trigger
  BEFORE UPDATE ON email_logs
  FOR EACH ROW
  EXECUTE FUNCTION update_email_logs_updated_at();

-- Comments for documentation
COMMENT ON TABLE email_logs IS 'Stores history of all emails sent from admin dashboard';
COMMENT ON COLUMN email_logs.admin_user_id IS 'Admin user who sent the email';
COMMENT ON COLUMN email_logs.recipient_email IS 'Email address of recipient';
COMMENT ON COLUMN email_logs.subject IS 'Email subject line';
COMMENT ON COLUMN email_logs.template_used IS 'Template ID used for email (if any)';
COMMENT ON COLUMN email_logs.contact_id IS 'Related contact record (if applicable)';
COMMENT ON COLUMN email_logs.message_id IS 'Email service provider message ID';
COMMENT ON COLUMN email_logs.status IS 'Email delivery status';
COMMENT ON COLUMN email_logs.metadata IS 'Additional data about the email';
COMMENT ON COLUMN email_logs.sent_at IS 'When the email was sent';
