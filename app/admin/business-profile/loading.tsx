/**
 * Loading component for Business Profile page
 */

export default function BusinessProfileLoading() {
  return (
    <div className="min-h-screen bg-[#000000] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-[#4d4d4d]/30 rounded-lg w-64 mb-4 animate-pulse" />
          <div className="h-5 bg-[#4d4d4d]/20 rounded w-96 animate-pulse" />
        </div>

        {/* Form skeleton */}
        <div className="bg-[#111111] rounded-xl p-8 border border-[#333333]">
          <div className="space-y-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-4 bg-[#4d4d4d]/30 rounded w-32 animate-pulse" />
                <div className="h-10 bg-[#4d4d4d]/20 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
