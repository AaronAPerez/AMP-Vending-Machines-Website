// app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PackageIcon, ShoppingBagIcon, MailIcon, TrendingUpIcon, PlusIcon } from 'lucide-react';
import LoadingSpinner from '@/components/admin/shared/LoadingSpinner';

interface DashboardStats {
  machines: { total: number; active: number };
  products: { total: number; popular: number };
  contacts: { total: number; new: number };
  activity: Array<{
    id: string;
    action: string;
    resource: string;
    timestamp: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch data from all APIs in parallel
      const [machinesRes, productsRes, contactsRes, activityRes] = await Promise.all([
        fetch('/api/admin/machines', { credentials: 'include' }),
        fetch('/api/admin/products', { credentials: 'include' }),
        fetch('/api/admin/contacts', { credentials: 'include' }),
        fetch('/api/admin/activity?limit=5', { credentials: 'include' }).catch(() => null)
      ]);

      if (!machinesRes.ok || !productsRes.ok || !contactsRes.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const [machinesData, productsData, contactsData, activityData] = await Promise.all([
        machinesRes.json(),
        productsRes.json(),
        contactsRes.json(),
        activityRes ? activityRes.json() : { data: [] }
      ]);

      setStats({
        machines: {
          total: machinesData.data?.length || 0,
          active: machinesData.data?.filter((m: any) => m.is_active).length || 0
        },
        products: {
          total: productsData.data?.length || 0,
          popular: productsData.data?.filter((p: any) => p.is_popular).length || 0
        },
        contacts: {
          total: contactsData.data?.length || 0,
          new: contactsData.data?.filter((c: any) => c.status === 'new').length || 0
        },
        activity: activityData.data || []
      });
    } catch (error: any) {
      console.error('Failed to fetch dashboard data:', error);
      setError(error.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  if (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500 rounded-lg">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Vending Machines',
      value: stats?.machines.total || 0,
      subtitle: `${stats?.machines.active || 0} active`,
      icon: PackageIcon,
      color: 'bg-blue-500',
      href: '/admin/machines'
    },
    {
      title: 'Products',
      value: stats?.products.total || 0,
      subtitle: `${stats?.products.popular || 0} popular items`,
      icon: ShoppingBagIcon,
      color: 'bg-green-500',
      href: '/admin/products'
    },
    {
      title: 'Contact Inquiries',
      value: stats?.contacts.total || 0,
      subtitle: `${stats?.contacts.new || 0} new`,
      icon: MailIcon,
      color: 'bg-purple-500',
      href: '/admin/contacts'
    },
    {
      title: 'Recent Activity',
      value: stats?.activity.length || 0,
      subtitle: 'events logged',
      icon: TrendingUpIcon,
      color: 'bg-orange-500',
      href: '/admin'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#F5F5F5]">Dashboard Overview</h1>
          <p className="text-[#A5ACAF] mt-2">
            Monitor and manage your vending business
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            href={stat.href}
            className="bg-[#111111] rounded-lg p-6 border border-[#333333] hover:border-[#666666] transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${stat.color} rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-[#A5ACAF] mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-[#F5F5F5] mb-1">{stat.value}</p>
            <p className="text-xs text-[#A5ACAF]">{stat.subtitle}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/machines/new"
          className="bg-[#111111] rounded-lg p-6 border border-[#333333] hover:border-[#FD5A1E] transition-colors group"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#FD5A1E]/10 rounded-lg group-hover:bg-[#FD5A1E]/20 transition-colors">
              <PackageIcon className="w-6 h-6 text-[#FD5A1E]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#F5F5F5]">Add Machine</h3>
              <p className="text-sm text-[#A5ACAF]">Register new vending machine</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/products"
          className="bg-[#111111] rounded-lg p-6 border border-[#333333] hover:border-[#FD5A1E] transition-colors group"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#FD5A1E]/10 rounded-lg group-hover:bg-[#FD5A1E]/20 transition-colors">
              <ShoppingBagIcon className="w-6 h-6 text-[#FD5A1E]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#F5F5F5]">Manage Products</h3>
              <p className="text-sm text-[#A5ACAF]">Update product catalog</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/contacts"
          className="bg-[#111111] rounded-lg p-6 border border-[#333333] hover:border-[#FD5A1E] transition-colors group"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#FD5A1E]/10 rounded-lg group-hover:bg-[#FD5A1E]/20 transition-colors">
              <MailIcon className="w-6 h-6 text-[#FD5A1E]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#F5F5F5]">View Contacts</h3>
              <p className="text-sm text-[#A5ACAF]">Respond to inquiries</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      {stats?.activity && stats.activity.length > 0 && (
        <div className="bg-[#111111] rounded-lg p-6 border border-[#333333]">
          <h3 className="text-lg font-semibold text-[#F5F5F5] mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {stats.activity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-2 border-b border-[#333333] last:border-0">
                <div>
                  <p className="text-[#F5F5F5] font-medium">{activity.action}</p>
                  <p className="text-[#A5ACAF] text-sm">{activity.resource}</p>
                </div>
                <span className="text-[#A5ACAF] text-sm">
                  {new Date(activity.timestamp).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}