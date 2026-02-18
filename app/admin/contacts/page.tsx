'use client';

import { useEffect, useState } from 'react';
import { MailIcon, PhoneIcon, BuildingIcon, ClockIcon, CheckIcon, XIcon } from 'lucide-react';
import DataTable, { Column } from '@/components/admin/shared/DataTable';
import LoadingSpinner from '@/components/admin/shared/LoadingSpinner';
import EmailComposer from '@/components/admin/EmailComposer';

interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company_name: string;
  message?: string;
  status: 'new' | 'in_progress' | 'resolved' | 'archived';
  created_at: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [composingEmail, setComposingEmail] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contacts, selectedStatus]);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts', { credentials: 'include' });
      if (!response.ok) throw new Error('Failed to fetch contacts');

      const data = await response.json();
      setContacts(data.data || []);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterContacts = () => {
    if (selectedStatus === 'all') {
      setFilteredContacts(contacts);
    } else {
      setFilteredContacts(contacts.filter(c => c.status === selectedStatus));
    }
  };

  const handleStatusChange = async (contactId: string, newStatus: Contact['status']) => {
    try {
      const response = await fetch(`/api/admin/contacts/${contactId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error('Failed to update status');

      setContacts(contacts.map(c =>
        c.id === contactId ? { ...c, status: newStatus } : c
      ));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const getStatusColor = (status: Contact['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/20 text-blue-400';
      case 'in_progress':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'resolved':
        return 'bg-green-500/20 text-green-400';
      case 'archived':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-[#222222] text-[#A5ACAF]';
    }
  };

  const columns: Column<Contact>[] = [
    {
      key: 'name',
      label: 'Contact',
      sortable: true,
      render: (contact) => (
        <div>
          <p className="font-medium text-[#F5F5F5]">
            {contact.first_name} {contact.last_name}
          </p>
          <div className="flex items-center space-x-3 mt-1">
            <span className="text-xs text-[#A5ACAF] flex items-center">
              <MailIcon className="w-3 h-3 mr-1" />
              {contact.email}
            </span>
            {contact.phone && (
              <span className="text-xs text-[#A5ACAF] flex items-center">
                <PhoneIcon className="w-3 h-3 mr-1" />
                {contact.phone}
              </span>
            )}
          </div>
        </div>
      )
    },
    {
      key: 'company_name',
      label: 'Company',
      sortable: true,
      render: (contact) => (
        <div className="flex items-center space-x-2">
          <BuildingIcon className="w-4 h-4 text-[#A5ACAF]" />
          <span className="text-sm text-[#F5F5F5]">{contact.company_name}</span>
        </div>
      )
    },
    {
      key: 'message',
      label: 'Message',
      render: (contact) => (
        <p className="text-sm text-[#A5ACAF] line-clamp-2 max-w-md">
          {contact.message || 'No message provided'}
        </p>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (contact) => (
        <select
          value={contact.status}
          onChange={(e) => handleStatusChange(contact.id, e.target.value as Contact['status'])}
          className={`px-3 py-1 text-xs rounded-full ${getStatusColor(contact.status)} bg-[#0a0a0a] border-none focus:outline-none cursor-pointer`}
        >
          <option value="new">New</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="archived">Archived</option>
        </select>
      )
    },
    {
      key: 'created_at',
      label: 'Received',
      sortable: true,
      render: (contact) => (
        <div className="flex items-center space-x-2 text-sm text-[#A5ACAF]">
          <ClockIcon className="w-4 h-4" />
          <span>{new Date(contact.created_at).toLocaleDateString()}</span>
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (contact) => (
        <button
          onClick={() => setSelectedContact(contact)}
          className="px-3 py-1 text-sm bg-[#FD5A1E] hover:bg-[#ff6b2e] text-white rounded-lg transition-colors"
        >
          View Details
        </button>
      )
    }
  ];

  if (loading) {
    return <LoadingSpinner text="Loading contacts..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#F5F5F5]">Contact Inquiries</h1>
        <p className="text-[#A5ACAF] mt-2">
          Manage customer inquiries and leads ({contacts.length} total)
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'New', count: contacts.filter(c => c.status === 'new').length, color: 'text-blue-400' },
          { label: 'In Progress', count: contacts.filter(c => c.status === 'in_progress').length, color: 'text-yellow-400' },
          { label: 'Resolved', count: contacts.filter(c => c.status === 'resolved').length, color: 'text-green-400' },
          { label: 'Total', count: contacts.length, color: 'text-[#F5F5F5]' }
        ].map((stat) => (
          <div key={stat.label} className="bg-[#111111] border border-[#333333] rounded-lg p-4">
            <p className="text-sm text-[#A5ACAF]">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2 bg-[#111111] border border-[#333333] rounded-lg p-4">
        {['all', 'new', 'in_progress', 'resolved', 'archived'].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 text-sm rounded-lg transition-colors capitalize ${
              selectedStatus === status
                ? 'bg-[#FD5A1E] text-white'
                : 'bg-[#222222] text-[#A5ACAF] hover:bg-[#333333]'
            }`}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Contacts Table */}
      <DataTable
        columns={columns}
        data={filteredContacts}
        keyExtractor={(contact) => contact.id}
        searchable
        searchPlaceholder="Search contacts..."
        emptyMessage="No contact inquiries found."
      />

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={() => setSelectedContact(null)} />
          <div className="relative bg-[#111111] border border-[#333333] rounded-lg shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-[#333333]">
              <div>
                <h3 className="text-xl font-semibold text-[#F5F5F5]">
                  {selectedContact.first_name} {selectedContact.last_name}
                </h3>
                <p className="text-sm text-[#A5ACAF] mt-1">{selectedContact.company_name}</p>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-[#A5ACAF] hover:text-[#F5F5F5] transition-colors"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-[#A5ACAF]">Email</label>
                <p className="text-[#F5F5F5] mt-1">{selectedContact.email}</p>
              </div>

              {selectedContact.phone && (
                <div>
                  <label className="text-sm font-medium text-[#A5ACAF]">Phone</label>
                  <p className="text-[#F5F5F5] mt-1">{selectedContact.phone}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-[#A5ACAF]">Message</label>
                <p className="text-[#F5F5F5] mt-1 whitespace-pre-wrap">
                  {selectedContact.message || 'No message provided'}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-[#A5ACAF]">Received</label>
                <p className="text-[#F5F5F5] mt-1">
                  {new Date(selectedContact.created_at).toLocaleString()}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-[#A5ACAF] block mb-2">Status</label>
                <select
                  value={selectedContact.status}
                  onChange={(e) => {
                    handleStatusChange(selectedContact.id, e.target.value as Contact['status']);
                    setSelectedContact({ ...selectedContact, status: e.target.value as Contact['status'] });
                  }}
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg text-[#F5F5F5] focus:border-[#FD5A1E] focus:outline-none"
                >
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-[#333333]">
              <button
                onClick={() => {
                  setComposingEmail(true);
                }}
                className="px-4 py-2 bg-[#FD5A1E] hover:bg-[#ff6b2e] text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <MailIcon className="w-4 h-4" />
                <span>Send Email</span>
              </button>
              <button
                onClick={() => setSelectedContact(null)}
                className="px-4 py-2 bg-[#222222] hover:bg-[#333333] text-[#F5F5F5] rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Composer */}
      {composingEmail && selectedContact && (
        <EmailComposer
          recipientEmail={selectedContact.email}
          recipientName={`${selectedContact.first_name} ${selectedContact.last_name}`}
          contactId={selectedContact.id}
          onClose={() => setComposingEmail(false)}
          onSent={() => {
            setComposingEmail(false);
            // Optionally show success message
          }}
        />
      )}
    </div>
  );
}
