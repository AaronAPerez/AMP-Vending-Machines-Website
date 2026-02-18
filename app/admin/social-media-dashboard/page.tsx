import SocialMediaDashboard from '@/components/admin/SocialMediaDashboard';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Social Media Test Suite | Goldmine Admin',
  description: 'Test social media automation with real project data'
};

export default function SocialMediaTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-white p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">🧪 Social Media Test Environment</h1>
          <p className="text-blue-100 mt-1">
            Testing automation with your actual project data • No real posts will be published
          </p>
        </div>
      </div>
      <SocialMediaDashboard/>
    </div>
  );
}