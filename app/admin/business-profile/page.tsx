/**
 * Business Profile Page - Fixed to Prevent Circular Dependencies
 * 
 * Build Process Documentation:
 * 1. Implements proper component isolation to prevent infinite recursion
 * 2. Uses static imports instead of circular dynamic imports
 * 3. Includes proper error boundaries and loading states
 * 4. Follows Next.js 15+ best practices for client components
 * 5. Prevents maximum call stack errors with proper component structure
 */

'use client';

import { useState, useEffect, Suspense } from 'react';
import { Metadata, Viewport } from 'next';

// Static imports to prevent circular dependencies
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  Star,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Edit,
  Save,
  X
} from 'lucide-react';

/**
 * Business profile data interface
 */
interface BusinessProfile {
  id: string;
  name: string;
  legalName: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  hours: {
    [key: string]: {
      open: string;
      close: string;
      isOpen: boolean;
    };
  };
  rating: number;
  reviewCount: number;
  categories: string[];
  services: string[];
  socialMedia: {
    [platform: string]: string;
  };
  lastUpdated: Date;
}

/**
 * Custom hook for client-side safety
 */
function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Custom hook for business profile data
 */
function useBusinessProfile() {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simulate API call - replace with actual API
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockProfile: BusinessProfile = {
          id: 'amp-vending-001',
          name: 'AMP Vending',
          legalName: 'AMP Design and Consulting LLC',
          description: 'Professional vending machine solutions with 21.5-inch touchscreen technology and comprehensive service packages for workplaces in Central California.',
          address: {
            street: '4120 Dale Rd ste j8 1005',
            city: 'Modesto',
            state: 'CA',
            zipCode: '95354',
            country: 'United States'
          },
          contact: {
            phone: '(209) 403-5450',
            email: 'ampdesignandconsulting@gmail.com',
            website: 'https://www.ampvendingmachines.com'
          },
          hours: {
            monday: { open: '08:00', close: '20:00', isOpen: true },
            tuesday: { open: '08:00', close: '20:00', isOpen: true },
            wednesday: { open: '08:00', close: '20:00', isOpen: true },
            thursday: { open: '08:00', close: '20:00', isOpen: true },
            friday: { open: '08:00', close: '20:00', isOpen: true },
            saturday: { open: '08:00', close: '20:00', isOpen: true },
            sunday: { open: '08:00', close: '20:00', isOpen: true }
          },
          rating: 4.8,
          reviewCount: 47,
          categories: ['Vending Machine Supplier', 'Business Service', 'Equipment Supplier'],
          services: [
            'Commercial Vending Machine Installation',
            'Refrigerated Vending Machines',
            'Snack Vending Machines',
            'Complete Maintenance Service',
            'Office Break Room Solutions',
            'Free Consultation'
          ],
          socialMedia: {
            // Add when available
          },
          lastUpdated: new Date()
        };

        setProfile(mockProfile);
      } catch (err) {
        setError('Failed to load business profile');
        console.error('Business profile load error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const updateProfile = async (updates: Partial<BusinessProfile>) => {
    if (!profile) return;

    try {
      setIsLoading(true);
      
      // Simulate API update
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedProfile = {
        ...profile,
        ...updates,
        lastUpdated: new Date()
      };
      
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update business profile');
      console.error('Business profile update error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    isLoading,
    error,
    isEditing,
    setIsEditing,
    updateProfile
  };
}

/**
 * Loading skeleton component
 */
function BusinessProfileSkeleton() {
  return (
    <div className="min-h-screen bg-[#000000] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-[#4d4d4d]/30 rounded-lg w-64 mb-4 animate-pulse" />
          <div className="h-5 bg-[#4d4d4d]/20 rounded w-96 animate-pulse" />
        </div>

        {/* Profile card skeleton */}
        <div className="bg-[#111111] rounded-xl p-8 border border-[#333333] mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="h-8 bg-[#4d4d4d]/30 rounded w-48 mb-4 animate-pulse" />
              <div className="h-4 bg-[#4d4d4d]/20 rounded w-full mb-2 animate-pulse" />
              <div className="h-4 bg-[#4d4d4d]/20 rounded w-3/4 animate-pulse" />
            </div>
            <div className="h-10 bg-[#4d4d4d]/20 rounded w-24 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-4 bg-[#4d4d4d]/20 rounded w-20 animate-pulse" />
                <div className="h-6 bg-[#4d4d4d]/30 rounded w-full animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Error component
 */
function BusinessProfileError({ 
  error, 
  onRetry 
}: { 
  error: string; 
  onRetry: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#F5F5F5] mb-2">
            Profile Load Error
          </h2>
          <p className="text-red-400 mb-4 text-sm">{error}</p>
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-[#FD5A1E] text-[#000000] rounded-lg hover:bg-[#FD5A1E]/90 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Main Business Profile Component
 */
function BusinessProfileContent() {
  const { profile, isLoading, error, isEditing, setIsEditing, updateProfile } = useBusinessProfile();

  if (error) {
    return (
      <BusinessProfileError 
        error={error} 
        onRetry={() => window.location.reload()} 
      />
    );
  }

  if (isLoading || !profile) {
    return <BusinessProfileSkeleton />;
  }

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-[#000000] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#F5F5F5] mb-2">
              Business Profile
            </h1>
            <p className="text-[#A5ACAF]">
              Manage your Google Business Profile information
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                isEditing
                  ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                  : 'bg-[#FD5A1E] text-[#000000] hover:bg-[#FD5A1E]/90'
              }`}
            >
              {isEditing ? (
                <>
                  <X size={16} className="mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </>
              )}
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-[#111111] rounded-xl p-8 border border-[#333333] mb-8">
          {/* Business Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <Building2 className="w-8 h-8 text-[#FD5A1E] mr-3" />
                <div>
                  <h2 className="text-2xl font-bold text-[#F5F5F5]">
                    {profile.name}
                  </h2>
                  <p className="text-[#A5ACAF] text-sm">
                    {profile.legalName}
                  </p>
                </div>
              </div>
              
              <p className="text-[#F5F5F5] leading-relaxed mb-4">
                {profile.description}
              </p>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="text-[#F5F5F5] font-medium">
                    {profile.rating}
                  </span>
                  <span className="text-[#A5ACAF] ml-1">
                    ({profile.reviewCount} reviews)
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {profile.categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#FD5A1E]/10 text-[#FD5A1E] text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center text-green-400 mb-2">
                <CheckCircle size={16} className="mr-1" />
                <span className="text-sm font-medium">Verified</span>
              </div>
              <p className="text-[#A5ACAF] text-xs">
                Updated: {profile.lastUpdated.toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#F5F5F5] flex items-center">
                <MapPin className="w-5 h-5 text-[#FD5A1E] mr-2" />
                Address
              </h3>
              <div className="bg-[#000000]/50 p-4 rounded-lg">
                <p className="text-[#F5F5F5]">
                  {profile.address.street}
                </p>
                <p className="text-[#F5F5F5]">
                  {profile.address.city}, {profile.address.state} {profile.address.zipCode}
                </p>
                <p className="text-[#A5ACAF]">
                  {profile.address.country}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#F5F5F5]">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-[#FD5A1E] mr-3" />
                  <span className="text-[#F5F5F5]">{profile.contact.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-[#FD5A1E] mr-3" />
                  <span className="text-[#F5F5F5]">{profile.contact.email}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 text-[#FD5A1E] mr-3" />
                  <a 
                    href={profile.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FD5A1E] hover:text-[#FD5A1E]/80 transition-colors"
                  >
                    {profile.contact.website}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-[#F5F5F5] flex items-center mb-4">
              <Clock className="w-5 h-5 text-[#FD5A1E] mr-2" />
              Business Hours
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(profile.hours).map(([day, hours]) => (
                <div key={day} className="bg-[#000000]/50 p-3 rounded-lg">
                  <p className="text-[#F5F5F5] font-medium capitalize mb-1">
                    {day}
                  </p>
                  {hours.isOpen ? (
                    <p className="text-[#A5ACAF] text-sm">
                      {formatTime(hours.open)} - {formatTime(hours.close)}
                    </p>
                  ) : (
                    <p className="text-red-400 text-sm">Closed</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-[#F5F5F5] mb-4">
              Services Offered
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {profile.services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-[#000000]/50 rounded-lg"
                >
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                  <span className="text-[#F5F5F5] text-sm">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-[#111111] rounded-lg border border-[#333333] hover:border-[#FD5A1E]/30 transition-all text-center">
            <TrendingUp className="w-6 h-6 text-[#FD5A1E] mx-auto mb-2" />
            <span className="text-[#F5F5F5] text-sm font-medium">Analytics</span>
          </button>
          
          <button className="p-4 bg-[#111111] rounded-lg border border-[#333333] hover:border-[#FD5A1E]/30 transition-all text-center">
            <Users className="w-6 h-6 text-[#FD5A1E] mx-auto mb-2" />
            <span className="text-[#F5F5F5] text-sm font-medium">Reviews</span>
          </button>
          
          <button className="p-4 bg-[#111111] rounded-lg border border-[#333333] hover:border-[#FD5A1E]/30 transition-all text-center">
            <Award className="w-6 h-6 text-[#FD5A1E] mx-auto mb-2" />
            <span className="text-[#F5F5F5] text-sm font-medium">Posts</span>
          </button>
          
          <button className="p-4 bg-[#111111] rounded-lg border border-[#333333] hover:border-[#FD5A1E]/30 transition-all text-center">
            <RefreshCw className="w-6 h-6 text-[#FD5A1E] mx-auto mb-2" />
            <span className="text-[#F5F5F5] text-sm font-medium">Sync</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Main Business Profile Page Component
 */
export default function BusinessProfilePage() {
  const isClient = useIsClient();

  if (!isClient) {
    return <BusinessProfileSkeleton />;
  }

  return (
    <Suspense fallback={<BusinessProfileSkeleton />}>
      <BusinessProfileContent />
    </Suspense>
  );
}