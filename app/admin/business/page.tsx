'use client';

import { useEffect, useState } from 'react';
import { SaveIcon } from 'lucide-react';
import FormField from '@/components/admin/shared/FormField';
import LoadingSpinner from '@/components/admin/shared/LoadingSpinner';

interface BusinessInfo {
  company_name: string;
  tagline: string;
  phone: string;
  email: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  zip_code: string;
  business_hours: Record<string, { open: string; close: string; closed?: boolean }>;
}

export default function BusinessInfoPage() {
  const [formData, setFormData] = useState<BusinessInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchBusinessInfo();
  }, []);

  const fetchBusinessInfo = async () => {
    try {
      const response = await fetch('/api/admin/business', { credentials: 'include' });
      if (!response.ok) throw new Error('Failed to fetch business info');

      const data = await response.json();
      setFormData(data.data || getDefaultFormData());
    } catch (error) {
      console.error('Failed to fetch business info:', error);
      setFormData(getDefaultFormData());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultFormData = (): BusinessInfo => ({
    company_name: 'AMP Vending Machines',
    tagline: 'Premium Vending Solutions for Central California',
    phone: '(559) 123-4567',
    email: 'info@ampvendingmachines.com',
    address_line1: '123 Business St',
    address_line2: '',
    city: 'Modesto',
    state: 'CA',
    zip_code: '95350',
    business_hours: {
      monday: { open: '08:00', close: '19:00' },
      tuesday: { open: '08:00', close: '19:00' },
      wednesday: { open: '08:00', close: '19:00' },
      thursday: { open: '08:00', close: '19:00' },
      friday: { open: '08:00', close: '19:00' },
      saturday: { open: '8:00', close: '19:00' },
      sunday: { open: '08:00', close: '19:00' },
    }
  });

  const handleSave = async () => {
    if (!formData) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/admin/business', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save business info');

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error: any) {
      console.error('Failed to save:', error);
      setError(error.message || 'Failed to save business info');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !formData) {
    return <LoadingSpinner text="Loading business info..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#F5F5F5]">Business Information</h1>
          <p className="text-[#A5ACAF] mt-2">Update your company details and contact information</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2 px-4 py-2 bg-[#FD5A1E] hover:bg-[#ff6b2e] text-white rounded-lg transition-colors disabled:opacity-50"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <SaveIcon className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500 rounded-lg">
          <p className="text-green-500">Business information saved successfully!</p>
        </div>
      )}

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Details */}
        <div className="bg-[#111111] border border-[#333333] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[#F5F5F5] mb-4">Company Details</h2>
          <div className="space-y-4">
            <FormField
              label="Company Name"
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              required
            />
            <FormField
              label="Tagline"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              required
            />
            <FormField
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            <FormField
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Address */}
        <div className="bg-[#111111] border border-[#333333] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[#F5F5F5] mb-4">Business Address</h2>
          <div className="space-y-4">
            <FormField
              label="Address Line 1"
              value={formData.address_line1}
              onChange={(e) => setFormData({ ...formData, address_line1: e.target.value })}
              required
            />
            <FormField
              label="Address Line 2"
              value={formData.address_line2 || ''}
              onChange={(e) => setFormData({ ...formData, address_line2: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
              <FormField
                label="State"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                required
              />
            </div>
            <FormField
              label="ZIP Code"
              value={formData.zip_code}
              onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
              required
            />
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-[#111111] border border-[#333333] rounded-lg p-6">
        <h2 className="text-xl font-semibold text-[#F5F5F5] mb-4">Business Hours</h2>
        <div className="space-y-3">
          {Object.entries(formData.business_hours).map(([day, hours]) => (
            <div key={day} className="flex items-center space-x-4">
              <div className="w-32">
                <p className="text-sm font-medium text-[#F5F5F5] capitalize">{day}</p>
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={!hours.closed}
                  onChange={(e) => setFormData({
                    ...formData,
                    business_hours: {
                      ...formData.business_hours,
                      [day]: { ...hours, closed: !e.target.checked }
                    }
                  })}
                  className="w-4 h-4 rounded border-[#333333] text-[#FD5A1E] focus:ring-[#FD5A1E]"
                />
                <span className="text-sm text-[#A5ACAF]">Open</span>
              </label>
              {!hours.closed && (
                <>
                  <input
                    type="time"
                    value={hours.open}
                    onChange={(e) => setFormData({
                      ...formData,
                      business_hours: {
                        ...formData.business_hours,
                        [day]: { ...hours, open: e.target.value }
                      }
                    })}
                    className="px-3 py-1 bg-[#0a0a0a] border border-[#333333] rounded text-[#F5F5F5] text-sm focus:border-[#FD5A1E] focus:outline-none"
                  />
                  <span className="text-[#A5ACAF]">to</span>
                  <input
                    type="time"
                    value={hours.close}
                    onChange={(e) => setFormData({
                      ...formData,
                      business_hours: {
                        ...formData.business_hours,
                        [day]: { ...hours, close: e.target.value }
                      }
                    })}
                    className="px-3 py-1 bg-[#0a0a0a] border border-[#333333] rounded text-[#F5F5F5] text-sm focus:border-[#FD5A1E] focus:outline-none"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
