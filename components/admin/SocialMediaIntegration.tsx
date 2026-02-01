'use client';

import { useState } from 'react';
import SocialMediaDashboard from '@/components/admin/SocialMediaDashboard';

export default function AdminSocialMedia() {
  const [isAutomationEnabled, setIsAutomationEnabled] = useState(false);
  const [lastGeneration, setLastGeneration] = useState<Date | null>(null);

  const triggerContentGeneration = async () => {
    try {
      const response = await fetch('/api/social-media/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        setLastGeneration(new Date());
        // Refresh dashboard
      }
    } catch (error) {
      console.error('Failed to generate content:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Social Media Automation
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <button
              onClick={triggerContentGeneration}
              className="w-full py-3 px-4 bg-gold-400 hover:bg-gold-500 text-white rounded-lg transition-colors"
            >
              Generate Content Now
            </button>
            {lastGeneration && (
              <p className="text-sm text-gray-500 mt-2">
                Last generated: {lastGeneration.toLocaleString()}
              </p>
            )}
          </div>
          
          <div className="text-center">
            <label className="flex items-center justify-center">
              <input
                type="checkbox"
                checked={isAutomationEnabled}
                onChange={(e) => setIsAutomationEnabled(e.target.checked)}
                className="mr-2"
              />
              <span>Enable Weekly Auto-Generation</span>
            </label>
            <p className="text-sm text-gray-500 mt-2">
              Automatically generate content every Monday
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">89%</div>
            <p className="text-sm text-gray-500">Average Engagement Rate</p>
          </div>
        </div>
      </div>
      
      <SocialMediaDashboard />
    </div>
  );
}