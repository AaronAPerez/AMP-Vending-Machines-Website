'use client';

import { useEffect, useState } from 'react';
import { PlusIcon, EditIcon, TrashIcon, EyeIcon, CopyIcon } from 'lucide-react';
import { AccessibleButton } from '@/components/ui/AccessibleButton';
import Card from '@/components/ui/core/Card';
import LoadingSpinner from '@/components/admin/shared/LoadingSpinner';
import DataTable, { Column } from '@/components/admin/shared/DataTable';

interface EmailTemplate {
  id: string;
  template_id: string;
  name: string;
  description?: string;
  category: string;
  subject: string;
  body: string;
  variables: string[];
  is_active: boolean;
  is_default: boolean;
  usage_count: number;
  created_at: string;
  updated_at: string;
}

export default function EmailTemplatesPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    template_id: '',
    name: '',
    description: '',
    category: 'customer',
    subject: '',
    body: '',
    variables: [] as string[],
    is_active: true
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/admin/marketing/email-templates', {
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to fetch templates');

      const data = await response.json();
      setTemplates(data.data || []);
    } catch (error) {
      console.error('Failed to fetch email templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      body: formData.body
    };

    try {
      const url = '/api/admin/marketing/email-templates';
      const method = editingId ? 'PATCH' : 'POST';
      const body = editingId ? { id: editingId, ...payload } : payload;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error('Failed to save template');

      await fetchTemplates();
      resetForm();
      setShowEditor(false);
    } catch (error) {
      console.error('Failed to save email template:', error);
      alert('Failed to save template. Please try again.');
    }
  };

  const handleEdit = (template: EmailTemplate) => {
    setEditingId(template.id);
    setFormData({
      template_id: template.template_id,
      name: template.name,
      description: template.description || '',
      category: template.category,
      subject: template.subject,
      body: template.body,
      variables: template.variables || [],
      is_active: template.is_active
    });
    setShowEditor(true);
  };

  const handleDelete = async (id: string, isDefault: boolean) => {
    if (isDefault) {
      alert('Cannot delete default template');
      return;
    }

    if (!confirm('Are you sure you want to delete this email template?')) return;

    try {
      const response = await fetch(`/api/admin/marketing/email-templates?id=${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to delete template');

      await fetchTemplates();
    } catch (error) {
      console.error('Failed to delete email template:', error);
      alert('Failed to delete template. Please try again.');
    }
  };

  const handleDuplicate = (template: EmailTemplate) => {
    setEditingId(null);
    setFormData({
      template_id: `${template.template_id}-copy`,
      name: `${template.name} (Copy)`,
      description: template.description || '',
      category: template.category,
      subject: template.subject,
      body: template.body,
      variables: template.variables || [],
      is_active: false
    });
    setShowEditor(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      template_id: '',
      name: '',
      description: '',
      category: 'customer',
      subject: '',
      body: '',
      variables: [],
      is_active: true
    });
  };

  const extractVariables = (text: string): string[] => {
    const matches = text.match(/\[([^\]]+)\]/g);
    return matches ? Array.from(new Set(matches)) : [];
  };

  const updateVariables = () => {
    const subjectVars = extractVariables(formData.subject);
    const bodyVars = extractVariables(formData.body);
    const allVars = Array.from(new Set([...subjectVars, ...bodyVars]));
    setFormData({ ...formData, variables: allVars });
  };

  const columns: Column<EmailTemplate>[] = [
    {
      key: 'name',
      label: 'Template',
      sortable: true,
      render: (template) => (
        <div>
          <p className="font-medium text-[#F5F5F5]">{template.name}</p>
          <p className="text-xs text-[#A5ACAF] mt-1">{template.template_id}</p>
          {template.description && (
            <p className="text-xs text-[#666666] mt-1 line-clamp-1">{template.description}</p>
          )}
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (template) => (
        <span className="px-2 py-1 text-xs bg-[#222222] text-[#F5F5F5] rounded-full capitalize">
          {template.category}
        </span>
      )
    },
    {
      key: 'subject',
      label: 'Subject',
      render: (template) => (
        <p className="text-sm text-[#F5F5F5] line-clamp-2">{template.subject}</p>
      )
    },
    {
      key: 'usage_count',
      label: 'Used',
      sortable: true,
      render: (template) => (
        <span className="text-sm text-[#A5ACAF]">{template.usage_count} times</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (template) => (
        <div className="flex flex-col space-y-1">
          {template.is_active && (
            <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">
              Active
            </span>
          )}
          {template.is_default && (
            <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">
              Default
            </span>
          )}
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (template) => (
        <div className="flex space-x-2">
          <button
            onClick={() => setPreviewTemplate(template)}
            className="p-2 text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors"
            title="Preview"
          >
            <EyeIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleEdit(template)}
            className="p-2 text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors"
            title="Edit"
          >
            <EditIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDuplicate(template)}
            className="p-2 text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors"
            title="Duplicate"
          >
            <CopyIcon className="w-4 h-4" />
          </button>
          {!template.is_default && (
            <button
              onClick={() => handleDelete(template.id, template.is_default)}
              className="p-2 text-[#A5ACAF] hover:text-red-400 transition-colors"
              title="Delete"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      )
    }
  ];

  if (loading) {
    return <LoadingSpinner text="Loading email templates..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#F5F5F5]">Email Templates</h1>
          <p className="text-[#A5ACAF] mt-2">
            Manage customizable email templates for customer communications
          </p>
        </div>
        <AccessibleButton
          variant="cta"
          leftIcon={<PlusIcon className="w-4 h-4" />}
          onClick={() => {
            resetForm();
            setShowEditor(true);
          }}
        >
          New Template
        </AccessibleButton>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Templates', count: templates.length, color: 'text-[#F5F5F5]' },
          { label: 'Active', count: templates.filter(t => t.is_active).length, color: 'text-green-400' },
          { label: 'Default', count: templates.filter(t => t.is_default).length, color: 'text-blue-400' },
          { label: 'Total Sends', count: templates.reduce((sum, t) => sum + t.usage_count, 0), color: 'text-[#FD5A1E]' }
        ].map((stat) => (
          <Card key={stat.label} variant="highlighted" padding="md">
            <p className="text-sm text-[#A5ACAF]">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.count}</p>
          </Card>
        ))}
      </div>

      {/* Templates Table */}
      <Card variant="default" padding="none">
        <DataTable
          columns={columns}
          data={templates}
          keyExtractor={(template) => template.id}
          searchable
          searchPlaceholder="Search templates by name or subject..."
          emptyMessage="No email templates found."
        />
      </Card>

      {/* Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowEditor(false)} />

          <div className="relative bg-[#111111] border border-[#333333] rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-[#F5F5F5] mb-6">
                {editingId ? 'Edit Email Template' : 'Create New Email Template'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                      Template ID <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.template_id}
                      onChange={(e) => setFormData({ ...formData, template_id: e.target.value })}
                      placeholder="welcome-email"
                      disabled={!!editingId}
                      className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder-[#666666] focus:border-[#FD5A1E] focus:outline-none disabled:opacity-50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                      Template Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Welcome Email"
                      className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder-[#666666] focus:border-[#FD5A1E] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of when to use this template"
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder-[#666666] focus:border-[#FD5A1E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] focus:border-[#FD5A1E] focus:outline-none"
                    required
                  >
                    <option value="customer">Customer</option>
                    <option value="internal">Internal</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                    Subject Line <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      setTimeout(updateVariables, 100);
                    }}
                    placeholder="Welcome to AMP Vending, [Name]!"
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder-[#666666] focus:border-[#FD5A1E] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                    Email Body (HTML) <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={formData.body}
                    onChange={(e) => {
                      setFormData({ ...formData, body: e.target.value });
                      setTimeout(updateVariables, 100);
                    }}
                    placeholder="<p>Dear [Name],</p>..."
                    rows={12}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder-[#666666] focus:border-[#FD5A1E] focus:outline-none font-mono text-sm"
                    required
                  />
                  <p className="text-xs text-[#A5ACAF] mt-2">
                    💡 Use [Name], [Company], etc. for personalization
                  </p>
                </div>

                {formData.variables.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                      Detected Variables
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {formData.variables.map((variable) => (
                        <span
                          key={variable}
                          className="px-3 py-1 text-xs bg-[#FD5A1E]/20 text-[#FD5A1E] rounded-full"
                        >
                          {variable}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 bg-[#0a0a0a] border-[#333333] rounded"
                  />
                  <label htmlFor="is_active" className="text-sm text-[#F5F5F5]">
                    Template is active
                  </label>
                </div>

                <div className="flex space-x-3 pt-4">
                  <AccessibleButton type="submit" variant="cta" fullWidth>
                    {editingId ? 'Update Template' : 'Create Template'}
                  </AccessibleButton>
                  <AccessibleButton
                    type="button"
                    variant="secondary"
                    onClick={() => setShowEditor(false)}
                    fullWidth
                  >
                    Cancel
                  </AccessibleButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setPreviewTemplate(null)} />

          <div className="relative bg-[#111111] border border-[#333333] rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#F5F5F5] mb-4">Email Preview</h2>
              <div className="bg-[#0a0a0a] border border-[#333333] rounded-lg p-4 mb-4">
                <p className="text-sm text-[#A5ACAF] mb-2">Subject:</p>
                <p className="text-[#F5F5F5] font-medium">{previewTemplate.subject}</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: previewTemplate.body }}
                />
              </div>
              <div className="mt-4">
                <AccessibleButton
                  variant="secondary"
                  onClick={() => setPreviewTemplate(null)}
                  fullWidth
                >
                  Close
                </AccessibleButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
