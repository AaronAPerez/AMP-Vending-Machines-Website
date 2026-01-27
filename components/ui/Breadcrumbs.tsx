import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav
      className={`bg-[#000000]/80 backdrop-blur-sm border-b border-[#333333] relative z-40 ${className}`}
      aria-label="Breadcrumb"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <ol className="flex items-center flex-wrap gap-2 text-sm relative z-40">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;

            return (
              <li key={index} className="flex items-center gap-2 relative z-40">
                {index > 0 && (
                  <ChevronRight
                    className="w-4 h-4 text-[#4d4d4d]"
                    aria-hidden="true"
                  />
                )}

                {isLast ? (
                  <span
                    className="text-[#F5F5F5] font-medium truncate max-w-[200px] sm:max-w-xs md:max-w-md"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : item.href ? (
                  <Link
                    href={item.href}
                    className="text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E] flex items-center gap-1.5 relative z-40 cursor-pointer"
                  >
                    {isFirst && (
                      <Home className="w-4 h-4" aria-hidden="true" />
                    )}
                    <span className="hidden sm:inline">{item.label}</span>
                    {isFirst && <span className="sm:hidden">Home</span>}
                  </Link>
                ) : (
                  <span className="text-[#A5ACAF]">{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
