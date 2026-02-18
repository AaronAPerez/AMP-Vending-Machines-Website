// components/admin/layout/AdminHeader.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LogOutIcon, UserIcon } from 'lucide-react';

interface AdminUser {
  email: string;
  name: string;
  role: string;
  avatar_url?: string;
}

interface AdminHeaderProps {
  user: AdminUser | null;
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Get page title from pathname
  const getPageTitle = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 1 && segments[0] === 'admin') return 'Dashboard';
    if (segments.length > 1) {
      const page = segments[1];
      return page.charAt(0).toUpperCase() + page.slice(1).replace(/-/g, ' ');
    }
    return 'Dashboard';
  };

  // Get user initials
  const getUserInitials = () => {
    if (user?.name) {
      return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'A';
  };

  return (
    <header className="bg-[#111111] border-b border-[#333333] px-6 py-2 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F5F5F5]">{getPageTitle()}</h1>
          <p className="text-sm text-[#A5ACAF]">Manage your vending business</p>
        </div>

        {/* User Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#222222] transition-colors"
          >
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 bg-[#FD5A1E] rounded-full flex items-center justify-center">
                <span className="text-[#000000] font-bold text-sm">{getUserInitials()}</span>
              </div>
            )}
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-[#F5F5F5]">
                {user?.name || user?.email || 'Administrator'}
              </p>
              <p className="text-xs text-[#A5ACAF]">
                {user?.role ? user.role.replace('_', ' ').toUpperCase() : 'Admin'}
              </p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#222222] rounded-lg shadow-xl border border-[#333333] overflow-hidden z-50">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-[#333333]">
                <p className="text-sm font-medium text-[#F5F5F5]">
                  {user?.name || 'Administrator'}
                </p>
                <p className="text-xs text-[#A5ACAF] truncate">
                  {user?.email || 'admin@ampvendingmachines.com'}
                </p>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    router.push('/admin/settings');
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-[#F5F5F5] hover:bg-[#333333] transition-colors"
                >
                  <UserIcon className="w-4 h-4 mr-3" />
                  Profile Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-[#333333] hover:text-red-300 transition-colors"
                >
                  <LogOutIcon className="w-4 h-4 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}