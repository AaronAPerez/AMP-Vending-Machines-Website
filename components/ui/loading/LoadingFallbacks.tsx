import React from "react";

/**
 * Section Loading Fallback
 * Maintains layout structure while loading
 */
export const SectionLoadingFallback = React.memo(() => (
  <div className="py-16 px-4" role="status" aria-label="Loading section">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-32 h-8 bg-[#333333] rounded-full mx-auto mb-6 animate-pulse" />
        <div className="w-96 h-12 bg-[#333333] rounded mx-auto mb-6 animate-pulse" />
        <div className="w-64 h-6 bg-[#333333] rounded mx-auto animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-[#333333] h-64 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  </div>
));

SectionLoadingFallback.displayName = 'SectionLoadingFallback';

/**
 * Form Loading Fallback
 * Mimics form structure for better UX
 */
export const FormLoadingFallback = React.memo(() => (
  <div className="bg-[#000000] text-[#F5F5F5] p-6 rounded-lg border border-[#a4acac] bg-[#4d4d4d]/30">
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 text-center">
        <div className="w-48 h-8 bg-[#333333] rounded mx-auto mb-4 animate-pulse" />
        <div className="w-64 h-6 bg-[#333333] rounded mx-auto animate-pulse" />
      </div>
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="w-24 h-5 bg-[#333333] rounded animate-pulse" />
            <div className="w-full h-12 bg-[#333333] rounded animate-pulse" />
          </div>
        ))}
        <div className="w-full h-12 bg-[#FD5A1E]/20 rounded animate-pulse" />
      </div>
    </div>
  </div>
));

FormLoadingFallback.displayName = 'FormLoadingFallback';
