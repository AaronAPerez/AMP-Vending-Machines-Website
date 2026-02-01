'use client';

import { useState } from 'react';
import ChangePasswordForm from '@/components/admin/settings/ChangePasswordForm';
import { toast } from 'sonner';
import {
  Lock,
  Shield,
  Bell,
  Database,
  Users,
  Mail,
  Globe,
  FileText,
  Activity,
  Settings as SettingsIcon,
  Key,
  Smartphone,
  AlertTriangle,
} from 'lucide-react';

type SettingsTab =
  | 'security'
  | 'notifications'
  | 'system'
  | 'users'
  | 'backup'
  | 'integrations';

export default function SettingsContent() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('security');

  const handleComingSoonClick = (featureName: string) => {
    toast.info(`${featureName} - Coming Soon`, {
      description: 'This feature is currently in development and will be available in a future update.',
      duration: 4000,
    });
  };

  const tabs = [
    { id: 'security' as SettingsTab, label: 'Security', icon: Shield },
    { id: 'notifications' as SettingsTab, label: 'Notifications', icon: Bell },
    { id: 'users' as SettingsTab, label: 'User Management', icon: Users },
    { id: 'system' as SettingsTab, label: 'System', icon: SettingsIcon },
    { id: 'backup' as SettingsTab, label: 'Backup & Recovery', icon: Database },
    { id: 'integrations' as SettingsTab, label: 'Integrations', icon: Globe },
  ];

  return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-2">
              Manage your system preferences, security, and configurations
            </p>
          </div>

        {/* Tabs Navigation */}
        <div className="bg-white text-gray-800 rounded-t-xl shadow-sm border border-gray-200 overflow-x-auto">
          <nav className="flex gap-1 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gold-100 text-gold-700 border border-gold-200'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-xl shadow-sm border-x border-b border-gray-200 p-8">
          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-8">
              {/* Change Password Section */}
              <div>
                <div className="flex items-start gap-3 mb-6">
                  <div className="p-3 bg-gold-100 rounded-lg">
                    <Lock className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Update your password to keep your account secure
                    </p>
                  </div>
                </div>
                <div className="max-w-2xl">
                  <ChangePasswordForm />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recommended Security Features
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Two-Factor Authentication */}
                  <div className="border border-gray-200 rounded-lg p-5 hover:border-gold-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Smartphone className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                        Coming Soon
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Add an extra layer of security with 2FA using authenticator apps
                    </p>
                    <button
                      onClick={() => handleComingSoonClick('Two-Factor Authentication')}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Enable 2FA →
                    </button>
                  </div>

                  {/* API Keys */}
                  <div className="border border-gray-200 rounded-lg p-5 hover:border-gold-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Key className="w-5 h-5 text-purple-600" />
                      </div>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                        Coming Soon
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">API Keys Management</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Generate and manage API keys for third-party integrations
                    </p>
                    <button
                      onClick={() => handleComingSoonClick('API Keys Management')}
                      className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
                    >
                      Manage Keys →
                    </button>
                  </div>

                  {/* Session Management */}
                  <div className="border border-gray-200 rounded-lg p-5 hover:border-gold-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Activity className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                        Coming Soon
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Active Sessions</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      View and manage your active login sessions across devices
                    </p>
                    <button
                      onClick={() => handleComingSoonClick('Active Sessions')}
                      className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
                    >
                      View Sessions →
                    </button>
                  </div>

                  {/* Security Audit Log */}
                  <div className="border border-gray-200 rounded-lg p-5 hover:border-gold-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      </div>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                        Coming Soon
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Security Audit Log</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Track login attempts, password changes, and security events
                    </p>
                    <button
                      onClick={() => handleComingSoonClick('Security Audit Log')}
                      className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                    >
                      View Audit Log →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="flex items-start gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Bell className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Configure how you want to receive notifications
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                    Coming Soon
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Project Updates</h4>
                    <p className="text-sm text-gray-600">Get notified about project status changes</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                    Coming Soon
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">New Client Leads</h4>
                    <p className="text-sm text-gray-600">Alert when new leads are created</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* User Management Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-start gap-3 mb-6">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                  <p className="text-sm text-gray-600 mt-1">Manage team members and permissions</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 mb-2">User Roles & Permissions</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Define custom roles with specific permissions
                  </p>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                    Coming Soon
                  </span>
                </div>

                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 mb-2">Team Invitations</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Invite new team members via email with custom roles
                  </p>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div className="flex items-start gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-lg">
                  <SettingsIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">System Settings</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Configure system-wide preferences and defaults
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 mb-2">Site Configuration</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Company name, logo, contact information, and branding
                  </p>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                    Coming Soon
                  </span>
                </div>

                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 mb-2">Regional Settings</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Timezone, date format, currency, and language preferences
                  </p>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Backup Tab */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="flex items-start gap-3 mb-6">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <Database className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Backup & Recovery</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Protect your data with automated backups
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 mb-2">Automated Backups</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Schedule automatic database and file backups
                  </p>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                    Coming Soon
                  </span>
                </div>

                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 mb-2">Export Data</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Download your data in CSV, JSON, or PDF format
                  </p>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div className="flex items-start gap-3 mb-6">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Globe className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Integrations</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Connect with third-party services and tools
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="w-6 h-6 text-gray-600" />
                    <h4 className="font-semibold text-gray-900">Email Services</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Connect SendGrid, Mailgun, or AWS SES for email delivery
                  </p>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                    Coming Soon
                  </span>
                </div>

                <div className="border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="w-6 h-6 text-gray-600" />
                    <h4 className="font-semibold text-gray-900">Document Storage</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Integrate with Google Drive, Dropbox, or AWS S3
                  </p>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
  );
}
