'use client';

import { BuildingIcon, ChartBarIcon, CogIcon, HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Business Profile', href: '/admin/business-profile', icon: BuildingIcon },
  { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/admin/settings', icon: CogIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-[#111111] border-r border-[#333333] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#333333]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#FD5A1E] rounded-lg flex items-center justify-center">
            <span className="text-[#000000] font-bold text-sm">A</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#F5F5F5]">AMP Vending</h1>
            <p className="text-xs text-[#A5ACAF]">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#FD5A1E] text-[#000000]'
                      : 'text-[#A5ACAF] hover:bg-[#222222] hover:text-[#F5F5F5]'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#333333]">
        <p className="text-xs text-[#A5ACAF] text-center">
          AMP Vending Admin v1.0
        </p>
      </div>
    </div>
  );
}
