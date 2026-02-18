'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PlusIcon, EditIcon, TrashIcon, EyeIcon, FilterIcon } from 'lucide-react';
import DataTable, { Column } from '@/components/admin/shared/DataTable';
import LoadingSpinner from '@/components/admin/shared/LoadingSpinner';
import ConfirmDialog from '@/components/admin/shared/ConfirmDialog';

interface Machine {
  id: string;
  slug: string;
  name: string;
  category: 'refrigerated' | 'non-refrigerated';
  short_description: string;
  is_active: boolean;
  created_at: string;
  image_count?: number;
}

export default function MachinesListPage() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [filteredMachines, setFilteredMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; machine: Machine | null }>({
    isOpen: false,
    machine: null
  });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchMachines();
  }, []);

  useEffect(() => {
    filterMachines();
  }, [machines, selectedCategory]);

  const fetchMachines = async () => {
    try {
      const response = await fetch('/api/admin/machines', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch machines');
      }

      const data = await response.json();
      setMachines(data.data || []);
    } catch (error: any) {
      console.error('Failed to fetch machines:', error);
      setError(error.message || 'Failed to load machines');
    } finally {
      setLoading(false);
    }
  };

  const filterMachines = () => {
    if (selectedCategory === 'all') {
      setFilteredMachines(machines);
    } else {
      setFilteredMachines(machines.filter(m => m.category === selectedCategory));
    }
  };

  const handleDelete = async () => {
    if (!deleteDialog.machine) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/machines/${deleteDialog.machine.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete machine');
      }

      // Remove from local state
      setMachines(machines.filter(m => m.id !== deleteDialog.machine?.id));
      setDeleteDialog({ isOpen: false, machine: null });
    } catch (error: any) {
      console.error('Failed to delete machine:', error);
      alert(error.message || 'Failed to delete machine');
    } finally {
      setDeleting(false);
    }
  };

  const columns: Column<Machine>[] = [
    {
      key: 'name',
      label: 'Machine Name',
      sortable: true,
      render: (machine) => (
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <p className="font-medium text-[#F5F5F5]">{machine.name}</p>
            <p className="text-xs text-[#A5ACAF]">{machine.slug}</p>
          </div>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (machine) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          machine.category === 'refrigerated'
            ? 'bg-blue-500/20 text-blue-400'
            : 'bg-purple-500/20 text-purple-400'
        }`}>
          {machine.category === 'refrigerated' ? 'Refrigerated' : 'Non-Refrigerated'}
        </span>
      )
    },
    {
      key: 'short_description',
      label: 'Description',
      render: (machine) => (
        <p className="text-sm text-[#A5ACAF] line-clamp-2 max-w-xs">
          {machine.short_description}
        </p>
      )
    },
    {
      key: 'is_active',
      label: 'Status',
      sortable: true,
      render: (machine) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          machine.is_active
            ? 'bg-green-500/20 text-green-400'
            : 'bg-red-500/20 text-red-400'
        }`}>
          {machine.is_active ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (machine) => (
        <div className="flex items-center space-x-2">
          <Link
            href={`/vending-machines/${machine.slug}`}
            target="_blank"
            className="p-2 hover:bg-[#222222] rounded-lg transition-colors"
            title="View Public Page"
          >
            <EyeIcon className="w-4 h-4 text-[#A5ACAF]" />
          </Link>
          <Link
            href={`/admin/machines/${machine.id}`}
            className="p-2 hover:bg-[#222222] rounded-lg transition-colors"
            title="Edit"
          >
            <EditIcon className="w-4 h-4 text-[#FD5A1E]" />
          </Link>
          <button
            onClick={() => setDeleteDialog({ isOpen: true, machine })}
            className="p-2 hover:bg-[#222222] rounded-lg transition-colors"
            title="Delete"
          >
            <TrashIcon className="w-4 h-4 text-red-500" />
          </button>
        </div>
      )
    }
  ];

  if (loading) {
    return <LoadingSpinner text="Loading machines..." />;
  }

  if (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500 rounded-lg">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#F5F5F5]">Vending Machines</h1>
          <p className="text-[#A5ACAF] mt-2">
            Manage your vending machine inventory
          </p>
        </div>
        <Link
          href="/admin/machines/new"
          className="flex items-center space-x-2 px-4 py-2 bg-[#FD5A1E] hover:bg-[#ff6b2e] text-white rounded-lg transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Add Machine</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 bg-[#111111] border border-[#333333] rounded-lg p-4">
        <FilterIcon className="w-5 h-5 text-[#A5ACAF]" />
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#FD5A1E] text-white'
                : 'bg-[#222222] text-[#A5ACAF] hover:bg-[#333333]'
            }`}
          >
            All ({machines.length})
          </button>
          <button
            onClick={() => setSelectedCategory('refrigerated')}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              selectedCategory === 'refrigerated'
                ? 'bg-[#FD5A1E] text-white'
                : 'bg-[#222222] text-[#A5ACAF] hover:bg-[#333333]'
            }`}
          >
            Refrigerated ({machines.filter(m => m.category === 'refrigerated').length})
          </button>
          <button
            onClick={() => setSelectedCategory('non-refrigerated')}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              selectedCategory === 'non-refrigerated'
                ? 'bg-[#FD5A1E] text-white'
                : 'bg-[#222222] text-[#A5ACAF] hover:bg-[#333333]'
            }`}
          >
            Non-Refrigerated ({machines.filter(m => m.category === 'non-refrigerated').length})
          </button>
        </div>
      </div>

      {/* Machines Table */}
      <DataTable
        columns={columns}
        data={filteredMachines}
        keyExtractor={(machine) => machine.id}
        searchable
        searchPlaceholder="Search machines..."
        emptyMessage="No machines found. Add your first machine to get started."
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, machine: null })}
        onConfirm={handleDelete}
        title="Delete Machine"
        message={`Are you sure you want to delete "${deleteDialog.machine?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={deleting}
      />
    </div>
  );
}
