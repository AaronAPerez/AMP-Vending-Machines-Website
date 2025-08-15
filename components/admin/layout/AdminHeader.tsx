// components/admin/layout/AdminHeader.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRightIcon } from 'lucide-react';



export default function AdminHeader() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-[#111111] border-b border-[#333333] px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F5F5F5]">Admin Dashboard</h1>
          <p className="text-sm text-[#A5ACAF]">Manage your vending business</p>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#222222] transition-colors"
          >
            <div className="w-8 h-8 bg-[#FD5A1E] rounded-full flex items-center justify-center">
              <span className="text-[#000000] font-bold text-sm">A</span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-[#F5F5F5]">Administrator</p>
              <p className="text-xs text-[#A5ACAF]">Super Admin</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#222222] rounded-lg shadow-xl border border-[#333333] py-2 z-50">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-[#333333] hover:text-red-300 transition-colors"
              >
                <ArrowRightIcon className="w-4 h-4 mr-3" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}