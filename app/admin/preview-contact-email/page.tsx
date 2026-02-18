'use client';

import { useState } from 'react';
import { emailTemplates } from '@/lib/email/emailBranding';

export default function PreviewContactEmailPage() {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    companyName: 'Smith Manufacturing',
    message: 'I\'m interested in getting a free vending machine for our office with about 50 employees.',
    submittedAt: new Date().toISOString()
  });

  const generatePreview = () => {
    return emailTemplates.contactConfirmation(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Contact Form Auto-Reply Preview</h1>
          <p className="text-gray-600 mt-2">
            Preview what customers receive when they submit the contact form
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form to customize preview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Customize Preview Data</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"
                />
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Email Subject</h3>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded border border-gray-200">
                  Thank you for contacting AMP Vending, {formData.firstName}!
                </p>
              </div>
            </div>
          </div>

          {/* Email Preview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Email Preview</h2>
              <button
                onClick={() => {
                  const html = generatePreview();
                  const win = window.open('', '_blank');
                  if (win) {
                    win.document.write(html);
                    win.document.close();
                  }
                }}
                className="px-4 py-2 bg-[#FD5A1E] text-white rounded-md hover:bg-[#E54E15] transition-colors text-sm font-medium"
              >
                Open in New Tab
              </button>
            </div>

            <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
              <div
                className="w-full h-[600px] overflow-auto bg-white"
                dangerouslySetInnerHTML={{ __html: generatePreview() }}
              />
            </div>

            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>✅ Dynamic Template Active!</strong> This email now uses the editable template from the database.
                Edit it at <a href="/admin/marketing/email-templates" className="underline font-semibold hover:text-green-900">Email Templates</a> (template ID: <code className="bg-green-100 px-2 py-1 rounded">contact-confirmation</code>).
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            ✨ How to Edit This Email
          </h3>
          <p className="text-blue-800 mb-4">
            The contact form auto-reply is now fully editable from the admin dashboard:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-blue-800 ml-4">
            <li>Go to <a href="/admin/marketing/email-templates" className="underline font-semibold hover:text-blue-900">Email Templates</a> in the admin dashboard</li>
            <li>Find the template with ID <code className="bg-blue-100 px-2 py-1 rounded">contact-confirmation</code></li>
            <li>Click <strong>Edit</strong> to modify the subject, body, or content</li>
            <li>Use variables like <code className="bg-blue-100 px-2 py-1 rounded">[FirstName]</code>, <code className="bg-blue-100 px-2 py-1 rounded">[Company]</code>, etc. for personalization</li>
            <li>Preview your changes before saving</li>
            <li>Changes take effect immediately for new contact form submissions</li>
          </ol>

          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="text-sm text-blue-700">
              <strong>💡 Pro Tip:</strong> Create multiple versions to A/B test different messaging and see which performs better!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
