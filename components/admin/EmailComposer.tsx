'use client';

import { useState } from 'react';
import { XIcon, SendIcon, FileTextIcon } from 'lucide-react';
import { AccessibleButton } from '@/components/ui/AccessibleButton';
import Card from '@/components/ui/core/Card';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

interface EmailComposerProps {
  recipientEmail: string;
  recipientName?: string;
  contactId?: string;
  onClose: () => void;
  onSent?: () => void;
}

// Professional email templates
const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'welcome',
    name: 'Welcome Email',
    subject: 'Welcome to AMP Vending - Your Vending Solutions Partner',
    body: `<p>Dear [Name],</p>

<p>Thank you for reaching out to AMP Vending! We're excited to help you find the perfect vending solution for your business.</p>

<p><strong>What happens next:</strong></p>
<ul>
  <li>Our team will review your requirements</li>
  <li>We'll prepare a customized proposal</li>
  <li>You'll receive a call within 24 hours</li>
</ul>

<p><strong>Why choose AMP Vending?</strong></p>
<ul>
  <li>✅ FREE installation and setup</li>
  <li>✅ NO upfront costs</li>
  <li>✅ 24/7 support and maintenance</li>
  <li>✅ Wide selection of products</li>
</ul>

<p>In the meantime, feel free to browse our vending machines: <a href="https://www.ampvendingmachines.com/vending-machines">View Machines</a></p>

<p>Questions? Call us at <strong>(209) 403-5450</strong> or reply to this email.</p>

<p>Best regards,<br>
<strong>AMP Vending Team</strong><br>
📞 (209) 403-5450<br>
🌐 <a href="https://www.ampvendingmachines.com">www.ampvendingmachines.com</a></p>`
  },
  {
    id: 'follow-up',
    name: 'Follow-Up Email',
    subject: 'Following Up - AMP Vending Solutions',
    body: `<p>Hi [Name],</p>

<p>I wanted to follow up on your recent inquiry about our vending machine services.</p>

<p>Have you had a chance to review our proposal? I'd be happy to answer any questions you might have about:</p>
<ul>
  <li>Machine placement and installation</li>
  <li>Product selection and pricing</li>
  <li>Service and maintenance schedules</li>
  <li>Payment processing options</li>
</ul>

<p>We're committed to providing the best vending solutions for your business. Let's schedule a quick call to discuss your needs in detail.</p>

<p><strong>Available times this week:</strong></p>
<ul>
  <li>Monday - Friday: 9 AM - 5 PM</li>
  <li>Call directly: (209) 403-5450</li>
</ul>

<p>Looking forward to hearing from you!</p>

<p>Best regards,<br>
<strong>AMP Vending Team</strong></p>`
  },
  {
    id: 'thank-you',
    name: 'Thank You Email',
    subject: 'Thank You for Choosing AMP Vending!',
    body: `<p>Dear [Name],</p>

<p>Thank you for choosing AMP Vending as your vending solutions partner! We're thrilled to serve your business.</p>

<p><strong>Your service includes:</strong></p>
<ul>
  <li>✅ Professional installation</li>
  <li>✅ Regular restocking and maintenance</li>
  <li>✅ 24/7 customer support</li>
  <li>✅ Fresh, quality products</li>
</ul>

<p>Our team will be in touch shortly to schedule your installation. In the meantime, if you have any questions or special requests, please don't hesitate to reach out.</p>

<p><strong>Need help?</strong></p>
<ul>
  <li>📞 Call: (209) 403-5450</li>
  <li>📧 Email: ampdesignandconsulting@gmail.com</li>
  <li>🌐 Visit: www.ampvendingmachines.com</li>
</ul>

<p>We appreciate your business and look forward to a long partnership!</p>

<p>Best regards,<br>
<strong>AMP Vending Team</strong></p>`
  },
  {
    id: 'custom',
    name: 'Custom Message',
    subject: '',
    body: '<p>Dear [Name],</p>\n\n<p></p>\n\n<p>Best regards,<br><strong>AMP Vending Team</strong><br>📞 (209) 403-5450</p>'
  }
];

export default function EmailComposer({
  recipientEmail,
  recipientName,
  contactId,
  onClose,
  onSent
}: EmailComposerProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('custom');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load template
  const loadTemplate = (templateId: string) => {
    const template = EMAIL_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);

      // Replace [Name] placeholder
      const name = recipientName || recipientEmail.split('@')[0];
      setSubject(template.subject);
      setBody(template.body.replace(/\[Name\]/g, name));
    }
  };

  const handleSend = async () => {
    setError(null);

    if (!subject.trim() || !body.trim()) {
      setError('Subject and message are required');
      return;
    }

    setSending(true);

    try {
      const response = await fetch('/api/admin/emails/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          to: recipientEmail,
          subject,
          html: body,
          templateUsed: selectedTemplate !== 'custom' ? selectedTemplate : undefined,
          contactId,
          metadata: {
            recipientName,
            sentFrom: 'admin-dashboard'
          }
        })
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to send email');
      }

      // Success
      onSent?.();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to send email');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#111111] border border-[#333333] rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#333333]">
          <div>
            <h3 className="text-xl font-bold text-[#F5F5F5]">Compose Email</h3>
            <p className="text-sm text-[#A5ACAF] mt-1">
              To: <span className="text-[#FD5A1E]">{recipientEmail}</span>
              {recipientName && <span className="ml-2">({recipientName})</span>}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#A5ACAF] hover:text-[#F5F5F5] transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Template Selector */}
        <div className="p-6 border-b border-[#333333] bg-[#0a0a0a]">
          <label className="block text-sm font-medium text-[#F5F5F5] mb-3">
            <FileTextIcon className="w-4 h-4 inline mr-2" />
            Choose Template
          </label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {EMAIL_TEMPLATES.map((template) => (
              <AccessibleButton
                key={template.id}
                variant={selectedTemplate === template.id ? 'cta' : 'secondary'}
                size="sm"
                onClick={() => loadTemplate(template.id)}
                fullWidth
              >
                {template.name}
              </AccessibleButton>
            ))}
          </div>
        </div>

        {/* Email Content */}
        <div className="p-6 space-y-4">
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject..."
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder-[#666666] focus:border-[#FD5A1E] focus:outline-none"
            />
          </div>

          {/* Message Body */}
          <div>
            <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
              Message
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Email body (HTML supported)..."
              rows={12}
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder-[#666666] focus:border-[#FD5A1E] focus:outline-none font-mono text-sm"
            />
            <p className="text-xs text-[#A5ACAF] mt-2">
              💡 Tip: HTML tags are supported for formatting (e.g., &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, etc.)
            </p>
          </div>

          {/* Preview */}
          <div>
            <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
              Preview
            </label>
            <Card variant="highlighted" padding="lg">
              <div
                className="prose prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: body || '<p class="text-[#666666]">Email preview will appear here...</p>' }}
              />
            </Card>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-[#333333] bg-[#0a0a0a]">
          <AccessibleButton
            variant="secondary"
            onClick={onClose}
            disabled={sending}
          >
            Cancel
          </AccessibleButton>
          <AccessibleButton
            variant="cta"
            onClick={handleSend}
            disabled={sending || !subject.trim() || !body.trim()}
            leftIcon={<SendIcon className="w-4 h-4" />}
          >
            {sending ? 'Sending...' : 'Send Email'}
          </AccessibleButton>
        </div>
      </div>
    </div>
  );
}
