'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeftIcon, SaveIcon, AlertCircle, CheckCircle, Trash2, Star } from 'lucide-react';
import Link from 'next/link';
import FormField from '@/components/admin/shared/FormField';
import LoadingSpinner from '@/components/admin/shared/LoadingSpinner';
import ImageUploader from '@/components/admin/shared/ImageUploader';
import Image from 'next/image';

interface MachineFormData {
  slug: string;
  name: string;
  category: 'refrigerated' | 'non-refrigerated';
  short_description: string;
  description: string;
  is_active: boolean;
}

export default function MachineEditorPage() {
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === 'new';
  const machineId = isNew ? null : params.id as string;

  const [formData, setFormData] = useState<MachineFormData>({
    slug: '',
    name: '',
    category: 'refrigerated',
    short_description: '',
    description: '',
    is_active: true
  });

  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isNew && machineId) {
      fetchMachine();
    }
  }, [machineId, isNew]);

  const fetchMachine = async () => {
    try {
      const response = await fetch(`/api/admin/machines/${machineId}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch machine');
      }

      const result = await response.json();
      console.log('Fetched machine data:', result); // Debug log

      if (!result.success || !result.data) {
        throw new Error('Invalid response format');
      }

      const machine = result.data;

      setFormData({
        slug: machine.slug || '',
        name: machine.name || '',
        category: machine.category || 'refrigerated',
        short_description: machine.short_description || '',
        description: machine.description || '',
        is_active: machine.is_active ?? true
      });
      setImages(machine.machine_images || []);
    } catch (error: any) {
      console.error('Failed to fetch machine:', error);
      setError(error.message || 'Failed to load machine');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleInputChange = (field: keyof MachineFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Auto-generate slug from name
    if (field === 'name' && isNew) {
      setFormData(prev => ({ ...prev, slug: generateSlug(value) }));
    }

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Slug validation
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug must contain only lowercase letters, numbers, and hyphens';
    } else if (formData.slug.length < 3) {
      newErrors.slug = 'Slug must be at least 3 characters';
    } else if (formData.slug.startsWith('-') || formData.slug.endsWith('-')) {
      newErrors.slug = 'Slug cannot start or end with a hyphen';
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 5) {
      newErrors.name = 'Name must be at least 5 characters';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }

    // Short description validation
    if (!formData.short_description.trim()) {
      newErrors.short_description = 'Short description is required';
    } else if (formData.short_description.length < 20) {
      newErrors.short_description = `Short description must be at least 20 characters (${formData.short_description.length}/20)`;
    } else if (formData.short_description.length > 300) {
      newErrors.short_description = `Short description must be less than 300 characters (${formData.short_description.length}/300)`;
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 100) {
      newErrors.description = `Description must be at least 100 characters (${formData.description.length}/100)`;
    } else if (formData.description.length > 5000) {
      newErrors.description = `Description must be less than 5000 characters (${formData.description.length}/5000)`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      setError('Please fix the errors below');
      setSuccess(null);
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const url = isNew ? '/api/admin/machines' : `/api/admin/machines/${machineId}`;
      const method = isNew ? 'POST' : 'PATCH';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save machine');
      }

      const data = await response.json();

      // Show success message
      setSuccess(isNew ? 'Machine created successfully!' : 'Machine updated successfully!');

      // Redirect to the machine list or edit page
      setTimeout(() => {
        if (isNew) {
          router.push(`/admin/machines/${data.data.id}`);
        } else {
          router.push('/admin/machines');
        }
      }, 1500);
    } catch (error: any) {
      console.error('Failed to save machine:', error);
      setError(error.message || 'Failed to save machine');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!machineId) {
      throw new Error('Please save the machine first before uploading images');
    }

    try {
      setError(null);
      setSuccess(null);

      const imageFormData = new FormData();
      imageFormData.append('image', file);
      imageFormData.append('alt_text', `${formData.name} - Image`);
      imageFormData.append('display_order', String(images.length + 1));

      const response = await fetch(`/api/admin/machines/${machineId}/images`, {
        method: 'POST',
        credentials: 'include',
        body: imageFormData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload image');
      }

      // Show success and refresh images
      setSuccess('Image uploaded successfully!');
      await fetchMachine();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (error: any) {
      console.error('Failed to upload image:', error);
      setError(error.message || 'Failed to upload image');
      throw error; // Re-throw so ImageUploader can handle it
    }
  };

  const handleImageDelete = async (imageId: string) => {
    try {
      setError(null);
      setSuccess(null);

      const response = await fetch(`/api/admin/machines/${machineId}/images?image_id=${imageId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete image');
      }

      // Show success and refresh images
      setSuccess('Image deleted successfully!');
      await fetchMachine();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (error: any) {
      console.error('Failed to delete image:', error);
      setError(error.message || 'Failed to delete image');
      throw error; // Re-throw so ImageUploader can handle it
    }
  };

  const handleSetPrimaryImage = async (imageId: string) => {
    try {
      setError(null);
      setSuccess(null);

      const response = await fetch(`/api/admin/machines/${machineId}/images/set-primary`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ image_id: imageId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to set primary image');
      }

      // Show success and refresh images
      setSuccess('Primary image updated successfully!');
      await fetchMachine();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (error: any) {
      console.error('Failed to set primary image:', error);
      setError(error.message || 'Failed to set primary image');
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading machine..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/machines"
            className="p-2 hover:bg-[#222222] rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 text-[#A5ACAF]" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#F5F5F5]">
              {isNew ? 'Add New Machine' : 'Edit Machine'}
            </h1>
            <p className="text-[#A5ACAF] mt-2">
              {isNew ? 'Create a new vending machine' : 'Update machine details'}
            </p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2 px-4 py-2 bg-[#FD5A1E] hover:bg-[#ff6b2e] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <SaveIcon className="w-4 h-4" />
              <span>Save Machine</span>
            </>
          )}
        </button>
      </div>

      {/* Success Message */}
      {success && (
        <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <p className="text-green-500 font-medium">{success}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      )}

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-[#111111] border border-[#333333] rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[#F5F5F5] mb-4">Basic Information</h2>
            <div className="space-y-4">
              <FormField
                label="Machine Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Premium Touchscreen Vending Machine"
                error={errors.name}
                required
              />

              <FormField
                label="URL Slug"
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder="e.g., premium-touchscreen-vending-machine"
                helpText="Used in the URL. Only lowercase letters, numbers, and hyphens."
                error={errors.slug}
                required
              />

              <div>
                <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] focus:border-[#FD5A1E] focus:outline-none"
                >
                  <option value="refrigerated">Refrigerated</option>
                  <option value="non-refrigerated">Non-Refrigerated</option>
                </select>
              </div>

              <div>
                <FormField
                  label="Short Description"
                  value={formData.short_description}
                  onChange={(e) => handleInputChange('short_description', e.target.value)}
                  placeholder="Brief description for listings (20-300 characters)"
                  error={errors.short_description}
                  multiline
                  rows={2}
                  required
                />
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-[#A5ACAF]">For listing pages and previews</p>
                  <p className={`text-xs ${
                    formData.short_description.length < 20
                      ? 'text-red-500'
                      : formData.short_description.length > 300
                      ? 'text-orange-500'
                      : 'text-[#A5ACAF]'
                  }`}>
                    {formData.short_description.length}/300
                  </p>
                </div>
              </div>

              <div>
                <FormField
                  label="Full Description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Detailed description with features, benefits, and specifications (100+ characters)"
                  error={errors.description}
                  multiline
                  rows={6}
                  required
                />
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-[#A5ACAF]">Detailed information shown on machine detail page</p>
                  <p className={`text-xs ${
                    formData.description.length < 100
                      ? 'text-red-500'
                      : formData.description.length > 5000
                      ? 'text-orange-500'
                      : 'text-[#A5ACAF]'
                  }`}>
                    {formData.description.length}/5000
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          {!isNew && machineId && (
            <div className="bg-[#111111] border border-[#333333] rounded-lg p-6">
              <h2 className="text-xl font-semibold text-[#F5F5F5] mb-4">Images</h2>

              {/* Main Image Preview */}
              {images.length > 0 && (() => {
                const primaryImage = images.find(img => img.is_primary);
                const imageUrl = primaryImage?.image_url || images[0]?.image_url;
                const altText = primaryImage?.alt_text || images[0]?.alt_text || formData.name;

                if (!imageUrl) return null;

                return (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-[#F5F5F5] mb-3">Primary Image Preview</h3>
                    <div className="relative aspect-square w-full max-w-md bg-[#0a0a0a] rounded-lg border-2 border-[#FD5A1E]/30 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={altText}
                        fill
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute top-2 left-2 px-3 py-1 bg-[#FD5A1E] text-white text-xs font-semibold rounded-full">
                        Main Image
                      </div>
                    </div>
                    <p className="text-xs text-[#A5ACAF] mt-2">
                      This image will be used as the primary thumbnail on listing pages
                    </p>
                  </div>
                );
              })()}

              {/* Image Gallery */}
              {images.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-[#F5F5F5] mb-3">
                    All Images ({images.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images
                      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
                      .map((img, index) => (
                        <div
                          key={img.id}
                          className={`group relative aspect-square rounded-lg border-2 overflow-hidden transition-all ${
                            img.is_primary
                              ? 'border-[#FD5A1E] ring-2 ring-[#FD5A1E]/50'
                              : 'border-[#333333] hover:border-[#666666]'
                          }`}
                        >
                          <Image
                            src={img.image_url}
                            alt={img.alt_text || `${formData.name} - Image ${index + 1}`}
                            fill
                            className="w-full h-full object-cover"
                          />

                          {/* Overlay with actions */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            {!img.is_primary && (
                              <button
                                onClick={() => handleSetPrimaryImage(img.id)}
                                className="p-2 bg-[#FD5A1E] hover:bg-[#ff6b2e] rounded-full transition-colors"
                                title="Set as primary"
                              >
                                <Star className="w-4 h-4 text-white" />
                              </button>
                            )}
                            <button
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this image?')) {
                                  handleImageDelete(img.id);
                                }
                              }}
                              className="p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                              title="Delete image"
                            >
                              <Trash2 className="w-4 h-4 text-white" />
                            </button>
                          </div>

                          {/* Badges */}
                          {img.is_primary && (
                            <div className="absolute top-2 left-2 px-2 py-1 bg-[#FD5A1E] text-white text-xs font-semibold rounded flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current" />
                              Primary
                            </div>
                          )}
                          <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                            #{img.display_order || index + 1}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Image Uploader */}
              <div>
                <h3 className="text-sm font-medium text-[#F5F5F5] mb-3">Upload New Images</h3>
                <ImageUploader
                  onUpload={handleImageUpload}
                  maxSize={10}
                />
              </div>

              {/* Image Tips */}
              <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <h4 className="text-xs font-semibold text-blue-400 mb-2">📸 Image Tips</h4>
                <ul className="text-xs text-[#A5ACAF] space-y-1">
                  <li>• Upload multiple angles for better showcase</li>
                  <li>• First image uploaded becomes the primary image</li>
                  <li>• Recommended size: 1200x1200px or larger</li>
                  <li>• Use clear, well-lit photos</li>
                  <li>• Show product features and details</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-[#111111] border border-[#333333] rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[#F5F5F5] mb-4">Status</h2>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => handleInputChange('is_active', e.target.checked)}
                className="w-5 h-5 rounded border-[#333333] text-[#FD5A1E] focus:ring-[#FD5A1E] focus:ring-offset-0 bg-[#0a0a0a]"
              />
              <span className="text-sm text-[#F5F5F5]">Active (visible on website)</span>
            </label>
          </div>

          {/* Preview URL */}
          {!isNew && formData.slug && (
            <div className="bg-[#111111] border border-[#333333] rounded-lg p-6">
              <h2 className="text-xl font-semibold text-[#F5F5F5] mb-4">Preview</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[#A5ACAF] mb-2">
                    Public URL
                  </label>
                  <a
                    href={`/vending-machines/${formData.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg text-sm text-[#FD5A1E] hover:text-[#ff6b2e] transition-colors break-all"
                  >
                    /vending-machines/{formData.slug}
                  </a>
                </div>
                <div className="text-xs text-[#A5ACAF]">
                  <p>Click to preview how this machine appears on your website</p>
                </div>
              </div>
            </div>
          )}

          {/* Help */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-blue-400 mb-3">✨ Pro Tips</h3>
            <ul className="text-xs text-[#A5ACAF] space-y-2">
              <li>📝 Use descriptive names for better SEO</li>
              <li>🔗 Keep slug URL-friendly (lowercase, hyphens)</li>
              <li>✍️ Write compelling descriptions (100+ chars)</li>
              <li>📸 Upload high-quality images (max 10MB)</li>
              <li>🖼️ Add multiple angles and close-ups</li>
              <li>⭐ Set first image as primary thumbnail</li>
            </ul>
          </div>

          {/* Character Limits */}
          <div className="bg-[#111111] border border-[#333333] rounded-lg p-6">
            <h3 className="text-sm font-semibold text-[#F5F5F5] mb-3">Character Limits</h3>
            <ul className="text-xs text-[#A5ACAF] space-y-2">
              <li>Name: 5-100 characters</li>
              <li>Slug: 3+ characters</li>
              <li>Short Desc: 20-300 characters</li>
              <li>Full Desc: 100-5000 characters</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
