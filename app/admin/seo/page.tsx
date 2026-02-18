'use client';

import { useEffect, useState } from 'react';
import { SaveIcon, SearchIcon } from 'lucide-react';
import FormField from '@/components/admin/shared/FormField';
import LoadingSpinner from '@/components/admin/shared/LoadingSpinner';

interface SEOSettings {
  page_slug: string;
  meta_title: string;
  meta_description: string;
  keywords: string[];
}

const pages = [
  { slug: 'home', label: 'Home Page' },
  { slug: 'vending-machines', label: 'Vending Machines' },
  { slug: 'contact', label: 'Contact Us' },
  { slug: 'about', label: 'About Us' }
];

export default function SEOSettingsPage() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [formData, setFormData] = useState<SEOSettings>({
    page_slug: 'home',
    meta_title: '',
    meta_description: '',
    keywords: []
  });
  const [keywordInput, setKeywordInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchSEOSettings(selectedPage);
  }, [selectedPage]);

  const fetchSEOSettings = async (page: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/seo?page=${page}`, { credentials: 'include' });
      if (!response.ok) throw new Error('Failed to fetch SEO settings');

      const data = await response.json();
      if (data.data) {
        setFormData(data.data);
      } else {
        setFormData({
          page_slug: page,
          meta_title: '',
          meta_description: '',
          keywords: []
        });
      }
    } catch (error) {
      console.error('Failed to fetch SEO settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);

    try {
      const response = await fetch('/api/admin/seo', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save SEO settings');

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !formData.keywords.includes(keywordInput.trim())) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, keywordInput.trim()]
      });
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter(k => k !== keyword)
    });
  };

  if (loading) {
    return <LoadingSpinner text="Loading SEO settings..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#F5F5F5]">SEO Settings</h1>
          <p className="text-[#A5ACAF] mt-2">Optimize your website for search engines</p>
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

      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500 rounded-lg">
          <p className="text-green-500">SEO settings saved successfully!</p>
        </div>
      )}

      {/* Page Selector */}
      <div className="bg-[#111111] border border-[#333333] rounded-lg p-4">
        <label className="block text-sm font-medium text-[#F5F5F5] mb-3">Select Page</label>
        <div className="flex items-center space-x-2">
          {pages.map((page) => (
            <button
              key={page.slug}
              onClick={() => setSelectedPage(page.slug)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                selectedPage === page.slug
                  ? 'bg-[#FD5A1E] text-white'
                  : 'bg-[#222222] text-[#A5ACAF] hover:bg-[#333333]'
              }`}
            >
              {page.label}
            </button>
          ))}
        </div>
      </div>

      {/* SEO Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111111] border border-[#333333] rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[#F5F5F5] mb-4">Meta Information</h2>
            <div className="space-y-4">
              <FormField
                label="Meta Title"
                value={formData.meta_title}
                onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                placeholder="e.g., Premium Vending Machines | AMP Vending"
                helpText={`${formData.meta_title.length}/60 characters (recommended)`}
                required
              />

              <FormField
                label="Meta Description"
                value={formData.meta_description}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                placeholder="Brief description for search engine results..."
                helpText={`${formData.meta_description.length}/160 characters (recommended)`}
                multiline
                rows={3}
                required
              />

              <div>
                <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                  Keywords
                </label>
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                    placeholder="Add keyword..."
                    className="flex-1 px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder-[#A5ACAF] focus:border-[#FD5A1E] focus:outline-none"
                  />
                  <button
                    onClick={handleAddKeyword}
                    className="px-4 py-2 bg-[#FD5A1E] hover:bg-[#ff6b2e] text-white rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-3 py-1 bg-[#222222] text-[#F5F5F5] rounded-full text-sm flex items-center space-x-2"
                    >
                      <span>{keyword}</span>
                      <button
                        onClick={() => handleRemoveKeyword(keyword)}
                        className="text-[#A5ACAF] hover:text-red-500 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview & Tips */}
        <div className="space-y-6">
          {/* Search Preview */}
          <div className="bg-[#111111] border border-[#333333] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#F5F5F5] mb-3 flex items-center">
              <SearchIcon className="w-5 h-5 mr-2" />
              Search Preview
            </h3>
            <div className="bg-[#0a0a0a] border border-[#333333] rounded-lg p-4">
              <p className="text-blue-400 text-lg mb-1 line-clamp-1">
                {formData.meta_title || 'Your Page Title'}
              </p>
              <p className="text-green-600 text-xs mb-2">
                ampvendingmachines.com/{selectedPage}
              </p>
              <p className="text-[#A5ACAF] text-sm line-clamp-2">
                {formData.meta_description || 'Your page description will appear here in search results...'}
              </p>
            </div>
          </div>

          {/* SEO Tips */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">SEO Best Practices</h3>
            <ul className="text-xs text-[#A5ACAF] space-y-2">
              <li>• Keep titles under 60 characters</li>
              <li>• Descriptions should be 150-160 chars</li>
              <li>• Include target keywords naturally</li>
              <li>• Make titles and descriptions unique</li>
              <li>• Write for humans, not just robots</li>
              <li>• Include your brand name in titles</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
