import Link from 'next/link';
import { MachineData } from '@/lib/data/vendingMachineData';

export default function Breadcrumbs({ machine }: { machine: MachineData }) {

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Enhanced Breadcrumb Navigation */}
      <nav className="bg-[#000000]/80 backdrop-blur-sm border-b border-[#333333] sticky top-0 z-40" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ol className="flex items-center text-sm text-[#A5ACAF] space-x-2">
            <li>
              <Link
                href="/"
                className="hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
              >
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/vending-machines"
                className="hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
              >
                Vending Machines
              </Link>
            </li>
            <li>/</li>
            <li className="text-[#F5F5F5] font-medium truncate max-w-xs" aria-current="page">
              {machine.name}
            </li>
          </ol>
        </div>
      </nav>
    </div>
  );
}