'use client';

import { useEffect, useState } from 'react';
import { PlusIcon, EditIcon, TrashIcon, CheckCircleIcon, XCircleIcon, EyeIcon } from 'lucide-react';
import { AccessibleButton } from '@/components/ui/AccessibleButton';
import Card from '@/components/ui/core/Card';
import LoadingSpinner from '@/components/admin/shared/LoadingSpinner';
import { ExitIntentPopup } from '@/components/ExitIntentPopup';

interface ExitIntentSetting {
  id: string;
  name: string;
  is_active: boolean;
  headline: string;
  subheadline: string;
  value_proposition?: string;
  benefits: string[];
  stats: { value: string; label: string }[];
  special_offer_badge?: string;
  primary_cta_text: string;
  primary_cta_link: string;
  phone_button_text: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
}

export default function ExitIntentManagementPage() {
  const [settings, setSettings] = useState<ExitIntentSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewSetting, setPreviewSetting] = useState<ExitIntentSetting | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    headline: '',
    subheadline: '',
    value_proposition: '',
    benefits: ['', '', '', ''],
    stats: [
      { value: '', label: '' },
      { value: '', label: '' },
      { value: '', label: '' }
    ],
    special_offer_badge: '',
    primary_cta_text: 'Get Your Free Machine',
    primary_cta_link: '/contact',
    phone_button_text: 'Call (209) 403-5450',
    phone_number: '+12094035450'
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/marketing/exit-intent', {
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to fetch settings');

      const data = await response.json();
      setSettings(data.data || []);
    } catch (error) {
      console.error('Failed to fetch exit intent settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty benefits and stats
    const cleanedBenefits = formData.benefits.filter(b => b.trim() !== '');
    const cleanedStats = formData.stats.filter(s => s.value.trim() !== '' && s.label.trim() !== '');

    const payload = {
      ...formData,
      benefits: cleanedBenefits,
      stats: cleanedStats,
      is_active: settings.length === 0 // First one is active by default
    };

    try {
      const url = editingId
        ? '/api/admin/marketing/exit-intent'
        : '/api/admin/marketing/exit-intent';

      const method = editingId ? 'PATCH' : 'POST';
      const body = editingId ? { id: editingId, ...payload } : payload;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error('Failed to save setting');

      await fetchSettings();
      resetForm();
    } catch (error) {
      console.error('Failed to save exit intent setting:', error);
      alert('Failed to save setting. Please try again.');
    }
  };

  const handleEdit = (setting: ExitIntentSetting) => {
    setEditingId(setting.id);
    setFormData({
      name: setting.name,
      headline: setting.headline,
      subheadline: setting.subheadline,
      value_proposition: setting.value_proposition || '',
      benefits: [...setting.benefits, '', '', '', ''].slice(0, 4),
      stats: [...setting.stats, { value: '', label: '' }, { value: '', label: '' }, { value: '', label: '' }].slice(0, 3),
      special_offer_badge: setting.special_offer_badge || '',
      primary_cta_text: setting.primary_cta_text,
      primary_cta_link: setting.primary_cta_link,
      phone_button_text: setting.phone_button_text,
      phone_number: setting.phone_number
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this exit intent setting?')) return;

    try {
      const response = await fetch(`/api/admin/marketing/exit-intent?id=${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to delete setting');

      await fetchSettings();
    } catch (error) {
      console.error('Failed to delete exit intent setting:', error);
      alert('Failed to delete setting. Please try again.');
    }
  };

  const handleActivate = async (id: string) => {
    try {
      const response = await fetch('/api/admin/marketing/exit-intent', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id, is_active: true })
      });

      if (!response.ok) throw new Error('Failed to activate setting');

      await fetchSettings();
    } catch (error) {
      console.error('Failed to activate exit intent setting:', error);
      alert('Failed to activate setting. Please try again.');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      headline: '',
      subheadline: '',
      value_proposition: '',
      benefits: ['', '', '', ''],
      stats: [
        { value: '', label: '' },
        { value: '', label: '' },
        { value: '', label: '' }
      ],
      special_offer_badge: '',
      primary_cta_text: 'Get Your Free Machine',
      primary_cta_link: '/contact',
      phone_button_text: 'Call (209) 403-5450',
      phone_number: '+12094035450'
    });
  };

  const handlePreview = (setting: ExitIntentSetting) => {
    setPreviewSetting(setting);
    setShowPreview(true);
  };

  if (loading) {
    return <LoadingSpinner text="Loading exit intent settings..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#F5F5F5]">Exit Intent Popup Manager</h1>
        <p className="text-[#A5ACAF] mt-2">
          Manage exit intent popups that appear when visitors try to leave your website
        </p>
      </div>

      {/* Active Setting Alert */}
      {settings.find(s => s.is_active) && (
        <Card variant="highlighted" padding="md">
          <div className="flex items-center space-x-3">
            <CheckCircleIcon className="w-5 h-5 text-green-400" />
            <div>
              <h3 className="text-sm font-semibold text-[#F5F5F5]">Active Exit Intent</h3>
              <p className="text-sm text-[#A5ACAF] mt-1">
                "{settings.find(s => s.is_active)?.name}" is currently active on the website
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <Card variant="default" padding="lg">
          <h2 className="text-xl font-bold text-[#F5F5F5] mb-6">
            {editingId ? 'Edit Exit Intent' : 'Create New Exit Intent'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                Setting Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., default, summer-sale, holiday-promo"
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder-[#666666] focus:border-[#FD5A1E] focus:outline-none"
                required
              />
            </div>

            {/* Headline */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                Headline <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                placeholder="Wait! Don't Miss Out..."
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder-[#666666] focus:border-[#FD5A1E] focus:outline-none"
                required
              />
            </div>

            {/* Subheadline */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                Subheadline <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.subheadline}
                onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
                placeholder="Get a FREE Vending Machine!"
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder-[#666666] focus:border-[#FD5A1E] focus:outline-none"
                required
              />
            </div>

            {/* Value Proposition */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                Value Proposition
              </label>
              <textarea
                value={formData.value_proposition}
                onChange={(e) => setFormData({ ...formData, value_proposition: e.target.value })}
                placeholder="Join the many businesses in Modesto..."
                rows={3}
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder-[#666666] focus:border-[#FD5A1E] focus:outline-none"
              />
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                Benefits (up to 4)
              </label>
              {formData.benefits.map((benefit, index) => (
                <input
                  key={index}
                  type="text"
                  value={benefit}
                  onChange={(e) => {
                    const newBenefits = [...formData.benefits];
                    newBenefits[index] = e.target.value;
                    setFormData({ ...formData, benefits: newBenefits });
                  }}
                  placeholder={`Benefit ${index + 1}`}
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder-[#666666] focus:border-[#FD5A1E] focus:outline-none mb-2"
                />
              ))}
            </div>

            {/* Stats */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                Statistics (up to 3)
              </label>
              {formData.stats.map((stat, index) => (
                <div key={index} className="grid grid-cols-2 gap-2 mb-2">
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => {
                      const newStats = [...formData.stats];
                      newStats[index].value = e.target.value;
                      setFormData({ ...formData, stats: newStats });
                    }}
                    placeholder="100% Free"
                    className="px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder-[#666666] focus:border-[#FD5A1E] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => {
                      const newStats = [...formData.stats];
                      newStats[index].label = e.target.value;
                      setFormData({ ...formData, stats: newStats });
                    }}
                    placeholder="Setup"
                    className="px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder-[#666666] focus:border-[#FD5A1E] focus:outline-none"
                  />
                </div>
              ))}
            </div>

            {/* Special Offer Badge */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                Special Offer Badge
              </label>
              <input
                type="text"
                value={formData.special_offer_badge}
                onChange={(e) => setFormData({ ...formData, special_offer_badge: e.target.value })}
                placeholder="LIMITED TIME OFFER"
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder-[#666666] focus:border-[#FD5A1E] focus:outline-none"
              />
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                  Primary CTA Text
                </label>
                <input
                  type="text"
                  value={formData.primary_cta_text}
                  onChange={(e) => setFormData({ ...formData, primary_cta_text: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] focus:border-[#FD5A1E] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                  Primary CTA Link
                </label>
                <input
                  type="text"
                  value={formData.primary_cta_link}
                  onChange={(e) => setFormData({ ...formData, primary_cta_link: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] focus:border-[#FD5A1E] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                  Phone Button Text
                </label>
                <input
                  type="text"
                  value={formData.phone_button_text}
                  onChange={(e) => setFormData({ ...formData, phone_button_text: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] focus:border-[#FD5A1E] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] focus:border-[#FD5A1E] focus:outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <AccessibleButton type="submit" variant="cta" fullWidth>
                {editingId ? 'Update Setting' : 'Create Setting'}
              </AccessibleButton>
              {editingId && (
                <AccessibleButton type="button" variant="secondary" onClick={resetForm} fullWidth>
                  Cancel
                </AccessibleButton>
              )}
            </div>
          </form>
        </Card>

        {/* List of Settings */}
        <Card variant="default" padding="lg">
          <h2 className="text-xl font-bold text-[#F5F5F5] mb-6">Existing Settings</h2>

          {settings.length === 0 ? (
            <p className="text-[#A5ACAF] text-center py-8">
              No exit intent settings yet. Create one to get started!
            </p>
          ) : (
            <div className="space-y-4">
              {settings.map((setting) => (
                <Card key={setting.id} variant={setting.is_active ? 'highlighted' : 'outlined'} padding="md">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-[#F5F5F5]">{setting.name}</h3>
                        {setting.is_active && (
                          <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#A5ACAF] mt-1">{setting.headline}</p>
                      <p className="text-xs text-[#666666] mt-2">
                        Updated: {new Date(setting.updated_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handlePreview(setting)}
                        className="p-2 text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors"
                        title="Preview"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(setting)}
                        className="p-2 text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors"
                        title="Edit"
                      >
                        <EditIcon className="w-4 h-4" />
                      </button>
                      {!setting.is_active && (
                        <button
                          onClick={() => handleActivate(setting.id)}
                          className="p-2 text-[#A5ACAF] hover:text-green-400 transition-colors"
                          title="Activate"
                        >
                          <CheckCircleIcon className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(setting.id)}
                        className="p-2 text-[#A5ACAF] hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Preview Modal */}
      {showPreview && previewSetting && (
        <ExitIntentPopup
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          content={{
            headline: previewSetting.headline,
            subheadline: previewSetting.subheadline,
            valueProposition: previewSetting.value_proposition || '',
            benefits: previewSetting.benefits,
            stats: previewSetting.stats,
            specialOfferBadge: previewSetting.special_offer_badge,
            ctaButton: previewSetting.primary_cta_text,
            ctaLink: previewSetting.primary_cta_link,
            phoneButton: previewSetting.phone_button_text,
            phoneNumber: previewSetting.phone_number
          }}
        />
      )}
    </div>
  );
}
