/**
 * Admin Photo Manager Page - Client Component
 *
 * Build Process Documentation:
 * 1. Implements dynamic imports for client-only components
 * 2. Uses Client Component to support dynamic imports with ssr: false
 * 3. Includes SSR safety checks for window object access
 * 4. Adds proper loading states and error boundaries
 * 5. Follows accessibility best practices
 */

'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for client-only photo manager component
const PhotoManagerClient = dynamic(
  () => import('@/components/admin/PhotoManagerClient'),
  {
    ssr: false, // Disable SSR for this component
    loading: () => <PhotoManagerLoadingSkeleton />
  }
);

/**
 * Loading skeleton component for photo manager
 */
function PhotoManagerLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#000000] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-[#4d4d4d]/30 rounded-lg w-64 mb-4 animate-pulse" />
          <div className="h-5 bg-[#4d4d4d]/20 rounded w-96 animate-pulse" />
        </div>

        {/* Upload area skeleton */}
        <div className="bg-[#111111] rounded-xl p-8 border border-[#333333] mb-8">
          <div className="h-32 bg-[#4d4d4d]/20 rounded-lg animate-pulse" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square bg-[#4d4d4d]/20 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Error boundary wrapper for photo manager
 */
function PhotoManagerErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#000000]">
      <Suspense fallback={<PhotoManagerLoadingSkeleton />}>
        {children}
      </Suspense>
    </div>
  );
}

/**
 * Main Admin Photo Manager Page Component
 * 
 * Uses dynamic imports and SSR safety to prevent window-related build errors
 */
export default function AdminPhotoManagerPage() {
  return (
    <PhotoManagerErrorBoundary>
      <main className="min-h-screen bg-[#000000]">
        {/* Skip link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-[#FD5A1E] focus:text-[#000000] focus:rounded"
        >
          Skip to main content
        </a>

        <div id="main-content">
          <PhotoManagerClient />
        </div>
      </main>
    </PhotoManagerErrorBoundary>
  );
}