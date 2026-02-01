'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,
  Target,
  TrendingUp,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Share,
  Settings,
  Plus,
  Send,
  Facebook,
  Instagram,
  BarChart3,
  CheckCircle,
} from 'lucide-react';

// Types for social media management
interface SocialPost {
  id: string;
  platform: 'facebook' | 'instagram' | 'both';
  content: string;
  media?: string[];
  hashtags: string[];
  scheduledFor: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    reach: number;
  };
}

interface ContentTemplate {
  id: string;
  name: string;
  template: string;
  hashtags: string[];
  category: 'project' | 'service' | 'testimonial' | 'safety' | 'company';
}

// Mock data for demonstration
const mockPosts: SocialPost[] = [
  {
    id: '1',
    platform: 'both',
    content: '🚧 PROJECT SPOTLIGHT 🚧\n\nAdvanced Infrastructure Project - San Jose, CA\n\n✅ Communications Infrastructure completed\n✅ 25,000 sq ft\n✅ Delivered on time & budget\n\nAnother successful project showcasing our expertise in modern infrastructure development.',
    media: ['/public/images/projects/Bodega-Bay-CA/Bulldozer.jpg'],
    hashtags: ['#Construction', '#Infrastructure', '#SanJose', '#Communications'],
    scheduledFor: new Date(Date.now() + 86400000), // Tomorrow
    status: 'scheduled',
    engagement: {
      likes: 45,
      comments: 12,
      shares: 8,
      reach: 1250
    }
  },
  {
    id: '2',
    platform: 'instagram',
    content: '💡 DID YOU KNOW?\n\nFiber Optic Installation is one of our core specialties at Goldmine Communications & Construction.\n\n🔧 What we offer:\n• Network Infrastructure\n• 5G Solutions\n• Data Center Construction',
    hashtags: ['#FiberOptics', '#Communications', '#BayArea', '#Technology'],
    scheduledFor: new Date(Date.now() + 172800000), // Day after tomorrow
    status: 'draft'
  }
];

const contentTemplates: ContentTemplate[] = [
  {
    id: 'project-showcase',
    name: 'Project Showcase',
    template: '🚧 PROJECT SPOTLIGHT 🚧\n\n{projectName} - {location}\n\n✅ {serviceType} completed\n✅ {projectSize}\n✅ Delivered on time & budget\n\n{description}',
    hashtags: ['#Construction', '#Infrastructure', '#SanJose', '#BayArea'],
    category: 'project'
  },
  {
    id: 'service-highlight',
    name: 'Service Highlight',
    template: '💡 DID YOU KNOW?\n\n{serviceName} is one of our core specialties.\n\n🔧 What we offer:\n{serviceFeatures}\n\n📈 Why choose us:\n✓ Licensed & Insured (Lic #1099543)\n✓ 15+ years experience',
    hashtags: ['#ConstructionServices', '#Communications', '#Licensed'],
    category: 'service'
  },
  {
    id: 'safety-first',
    name: 'Safety Focus',
    template: '🦺 SAFETY FIRST, ALWAYS 🦺\n\nAt Goldmine Communications & Construction, safety isn\'t just a priority - it\'s our foundation.\n\nOur commitment:\n✅ Zero tolerance safety policy\n✅ Regular training & certification',
    hashtags: ['#SafetyFirst', '#WorkplaceSafety', '#Construction', '#Team'],
    category: 'safety'
  }
];

const SocialMediaDashboard = () => {
  const [posts, setPosts] = useState<SocialPost[]>(mockPosts);
  const [selectedTab, setSelectedTab] = useState<'schedule' | 'analytics' | 'templates' | 'settings'>('schedule');
  const [newPost, setNewPost] = useState<Partial<SocialPost>>({
    platform: 'both',
    content: '',
    hashtags: [],
    scheduledFor: new Date(Date.now() + 86400000) // Default to tomorrow
  });

  // Analytics data
  const analyticsData = {
    totalPosts: 45,
    totalReach: 12500,
    totalEngagement: 980,
    followersGrowth: 15.2,
    bestPerformingPost: 'Infrastructure Project Spotlight',
    optimalPostTime: 'Tuesday 10:00 AM'
  };

  // Post scheduling component
  const PostScheduler = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Content Schedule</h3>
        <button className="inline-flex items-center px-4 py-2 bg-gold-400 hover:bg-gold-500 text-white rounded-lg transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </button>
      </div>

      {/* Calendar view */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-7 gap-4 mb-6">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="text-center font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}
          {/* Calendar days would be generated here */}
          {Array.from({ length: 35 }, (_, i) => (
            <div 
              key={i} 
              className="aspect-square border border-gray-500 rounded-lg p-2 hover:bg-gray-100 cursor-pointer"
            >
              <div className="text-sm text-gray-900">{((i % 31) + 1)}</div>
              {/* Show scheduled posts */}
              {i === 5 && (
                <div className="mt-1">
                  <div className="w-full h-2 bg-blue-400 rounded-full mb-1"></div>
                  <div className="w-full h-2 bg-pink-400 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming posts list */}
      <div className="bg-gray-200 rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-semibold mb-4">Upcoming Posts</h4>
        <div className="space-y-4">
          {posts.filter(post => post.status === 'scheduled' || post.status === 'draft').map(post => (
            <div key={post.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {(post.platform === 'facebook' || post.platform === 'both') && (
                        <Facebook className="w-4 h-4 text-blue-600" />
                      )}
                      {(post.platform === 'instagram' || post.platform === 'both') && (
                        <Instagram className="w-4 h-4 text-pink-600" />
                      )}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.status === 'scheduled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status === 'scheduled' ? (
                        <>
                          <Clock className="w-3 h-3 inline mr-1" />
                          Scheduled
                        </>
                      ) : (
                        'Draft'
                      )}
                    </span>
                    <span className="text-sm text-gray-500">
                      {post.scheduledFor.toLocaleDateString()} at {post.scheduledFor.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  <p className="text-gray-900 text-sm leading-relaxed mb-2">
                    {post.content.substring(0, 150)}...
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {post.hashtags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                    {post.hashtags.length > 3 && (
                      <span className="text-xs text-gray-500">+{post.hashtags.length - 3} more</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Analytics component
  const AnalyticsDashboard = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Performance Analytics</h3>
      
      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-200 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Reach</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalReach.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+{analyticsData.followersGrowth}% this month</span>
          </div>
        </div>

        <div className="bg-gray-200 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Engagement</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalEngagement}</p>
            </div>
            <div className="p-3 bg-pink-100 rounded-lg">
              <Heart className="w-6 h-6 text-pink-600" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-500">Across all platforms</span>
          </div>
        </div>

        <div className="bg-gray-200 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Posts Published</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalPosts}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-500">This quarter</span>
          </div>
        </div>

        <div className="bg-gray-200 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Optimal Time</p>
              <p className="text-lg font-bold text-gray-900">{analyticsData.optimalPostTime}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-500">Best engagement time</span>
          </div>
        </div>
      </div>

      {/* Performance chart placeholder */}
      <div className="bg-gray-200 rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-semibold mb-4">Engagement Over Time</h4>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Analytics chart would be rendered here</p>
            <p className="text-sm text-gray-400">Integration with Chart.js or similar library</p>
          </div>
        </div>
      </div>

      {/* Top performing posts */}
      <div className="bg-gray-200 rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-semibold mb-4">Top Performing Posts</h4>
        <div className="space-y-4">
          {posts.filter(post => post.engagement).map(post => (
            <div key={post.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-900 text-sm leading-relaxed mb-2">
                    {post.content.substring(0, 100)}...
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {post.engagement?.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {post.engagement?.comments}
                    </span>
                    <span className="flex items-center gap-1">
                      <Share className="w-4 h-4" />
                      {post.engagement?.shares}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {post.engagement?.reach}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Content templates component
  const ContentTemplates = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Content Templates</h3>
        <button className="inline-flex items-center px-4 py-2 bg-gold-400 hover:bg-gold-500 text-white rounded-lg transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          New Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contentTemplates.map(template => (
          <div key={template.id} className="bg-gray-200 rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{template.name}</h4>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                  template.category === 'project' ? 'bg-blue-100 text-blue-800' :
                  template.category === 'service' ? 'bg-green-100 text-green-800' :
                  template.category === 'safety' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {template.category}
                </span>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-700 font-mono leading-relaxed">
                {template.template.substring(0, 200)}...
              </p>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {template.hashtags.slice(0, 4).map(tag => (
                <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            
            <button className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
              Use Template
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Settings component
  const SocialSettings = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Social Media Settings</h3>
      
      {/* Account connections */}
      <div className="bg-gray-200 rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-semibold mb-4">Connected Accounts</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Facebook className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Facebook Page</p>
                <p className="text-sm text-gray-500">Goldmine Communications & Construction</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-green-600">Connected</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Instagram className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Instagram Business</p>
                <p className="text-sm text-gray-500">@goldminecomm</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-green-600">Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Audience targeting settings */}
      <div className="bg-gray-200 rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-semibold mb-4">Audience Targeting</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Geographic Locations
            </label>
            <div className="space-y-2">
              {['San Jose, CA', 'Bay Area', 'Northern California', 'Silicon Valley'].map(location => (
                <label key={location} className="flex items-center">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-gold-400 focus:ring-gold-400" />
                  <span className="ml-2 text-sm text-gray-700">{location}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Interests
            </label>
            <div className="space-y-2">
              {['Construction', 'Commercial Real Estate', 'Telecommunications', 'Facility Management'].map(interest => (
                <label key={interest} className="flex items-center">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-gold-400 focus:ring-gold-400" />
                  <span className="ml-2 text-sm text-gray-700">{interest}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Posting schedule settings */}
      <div className="bg-gray-200 rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-semibold mb-4">Optimal Posting Times</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { day: 'Monday', time: '9:00 AM', engagement: '72%' },
            { day: 'Tuesday', time: '10:00 AM', engagement: '89%' },
            { day: 'Wednesday', time: '2:00 PM', engagement: '84%' },
            { day: 'Thursday', time: '9:00 AM', engagement: '81%' }
          ].map(slot => (
            <div key={slot.day} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-900">{slot.day}</p>
              <p className="text-sm text-gray-600">{slot.time}</p>
              <p className="text-xs text-green-600 mt-1">{slot.engagement} avg engagement</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-300 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Social Media Management</h1>
          <p className="text-gray-600">
            Manage your social media presence and grow your audience with targeted content
          </p>
        </div>

        {/* Navigation tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-200 p-1 rounded-lg shadow-sm border border-gray-200">
          {[
            { id: 'schedule', label: 'Content Schedule', icon: Calendar },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'templates', label: 'Templates', icon: Target },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTab === tab.id
                  ? 'bg-gold-400 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {selectedTab === 'schedule' && <PostScheduler />}
          {selectedTab === 'analytics' && <AnalyticsDashboard />}
          {selectedTab === 'templates' && <ContentTemplates />}
          {selectedTab === 'settings' && <SocialSettings />}
        </motion.div>
      </div>
    </div>
  );
};

export default SocialMediaDashboard;