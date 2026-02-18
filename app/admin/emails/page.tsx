'use client';

import { useEffect, useState } from 'react';
import { MailIcon, UserIcon, ClockIcon, CheckCircleIcon, XCircleIcon, AlertCircleIcon } from 'lucide-react';
import DataTable, { Column } from '@/components/admin/shared/DataTable';
import LoadingSpinner from '@/components/admin/shared/LoadingSpinner';
import Card from '@/components/ui/core/Card';

interface EmailLog {
  id: string;
  recipient_email: string;
  subject: string;
  template_used?: string;
  status: 'sent' | 'failed' | 'pending';
  sent_at: string;
  message_id?: string;
  admin_users?: {
    id: string;
    name: string;
    email: string;
  };
  contacts?: {
    id: string;
    first_name: string;
    last_name: string;
    company_name: string;
  };
}

export default function EmailHistoryPage() {
  const [emails, setEmails] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    sent: 0,
    failed: 0,
    todaySent: 0
  });

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await fetch('/api/admin/emails/logs?limit=100', {
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to fetch email logs');

      const data = await response.json();
      const emailData = data.data || [];

      setEmails(emailData);

      // Calculate stats
      const today = new Date().toISOString().split('T')[0];
      setStats({
        total: emailData.length,
        sent: emailData.filter((e: EmailLog) => e.status === 'sent').length,
        failed: emailData.filter((e: EmailLog) => e.status === 'failed').length,
        todaySent: emailData.filter((e: EmailLog) =>
          e.sent_at.split('T')[0] === today && e.status === 'sent'
        ).length
      });
    } catch (error) {
      console.error('Failed to fetch emails:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircleIcon className="w-4 h-4 text-green-400" />;
      case 'failed':
        return <XCircleIcon className="w-4 h-4 text-red-400" />;
      case 'pending':
        return <AlertCircleIcon className="w-4 h-4 text-yellow-400" />;
      default:
        return <MailIcon className="w-4 h-4 text-[#A5ACAF]" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-500/20 text-green-400';
      case 'failed':
        return 'bg-red-500/20 text-red-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-[#222222] text-[#A5ACAF]';
    }
  };

  const columns: Column<EmailLog>[] = [
    {
      key: 'recipient',
      label: 'Recipient',
      sortable: true,
      render: (email) => (
        <div>
          <p className="font-medium text-[#F5F5F5]">{email.recipient_email}</p>
          {email.contacts && (
            <p className="text-xs text-[#A5ACAF] mt-1">
              {email.contacts.first_name} {email.contacts.last_name} • {email.contacts.company_name}
            </p>
          )}
        </div>
      )
    },
    {
      key: 'subject',
      label: 'Subject',
      sortable: true,
      render: (email) => (
        <div>
          <p className="text-sm text-[#F5F5F5] line-clamp-1">{email.subject}</p>
          {email.template_used && (
            <p className="text-xs text-[#A5ACAF] mt-1 flex items-center">
              <MailIcon className="w-3 h-3 mr-1" />
              Template: <span className="capitalize ml-1">{email.template_used}</span>
            </p>
          )}
        </div>
      )
    },
    {
      key: 'admin_users',
      label: 'Sent By',
      render: (email) => (
        <div className="flex items-center space-x-2">
          <UserIcon className="w-4 h-4 text-[#A5ACAF]" />
          <span className="text-sm text-[#F5F5F5]">
            {email.admin_users?.name || 'System'}
          </span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (email) => (
        <div className="flex items-center space-x-2">
          {getStatusIcon(email.status)}
          <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(email.status)}`}>
            {email.status.charAt(0).toUpperCase() + email.status.slice(1)}
          </span>
        </div>
      )
    },
    {
      key: 'sent_at',
      label: 'Sent',
      sortable: true,
      render: (email) => (
        <div className="flex items-center space-x-2 text-sm text-[#A5ACAF]">
          <ClockIcon className="w-4 h-4" />
          <div>
            <p>{new Date(email.sent_at).toLocaleDateString()}</p>
            <p className="text-xs">{new Date(email.sent_at).toLocaleTimeString()}</p>
          </div>
        </div>
      )
    }
  ];

  if (loading) {
    return <LoadingSpinner text="Loading email history..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#F5F5F5]">Email History</h1>
        <p className="text-[#A5ACAF] mt-2">
          View all emails sent from the admin dashboard
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Sent', count: stats.total, color: 'text-[#F5F5F5]', icon: MailIcon },
          { label: 'Successful', count: stats.sent, color: 'text-green-400', icon: CheckCircleIcon },
          { label: 'Failed', count: stats.failed, color: 'text-red-400', icon: XCircleIcon },
          { label: 'Today', count: stats.todaySent, color: 'text-blue-400', icon: ClockIcon }
        ].map((stat) => (
          <Card key={stat.label} variant="highlighted" padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#A5ACAF]">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.count}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color} opacity-50`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Email Logs Table */}
      <Card variant="default" padding="none">
        <DataTable
          columns={columns}
          data={emails}
          keyExtractor={(email) => email.id}
          searchable
          searchPlaceholder="Search emails by recipient or subject..."
          emptyMessage="No emails sent yet."
        />
      </Card>

      {/* Info Banner */}
      <Card variant="highlighted" padding="md">
        <div className="flex items-start space-x-3">
          <MailIcon className="w-5 h-5 text-[#FD5A1E] mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-[#F5F5F5]">Email Management</h3>
            <p className="text-sm text-[#A5ACAF] mt-1">
              All emails sent through the admin dashboard are logged here. You can send emails directly from the Contacts page using professional templates.
            </p>
            <p className="text-xs text-[#A5ACAF] mt-2">
              📧 Using: <span className="text-[#FD5A1E] font-mono">Resend API</span> •
              📝 Templates: Welcome, Follow-Up, Thank You, Custom
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
