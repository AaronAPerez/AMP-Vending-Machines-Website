/**
 * useBusinessProfile Hook - Google Business Profile Optimization
 * 
 * Build Process Documentation:
 * 1. Centralized business profile data management
 * 2. SEO-optimized content generation for Google Business Profile
 * 3. Automated structured data generation
 * 4. Performance tracking and analytics integration
 * 5. Type-safe business information handling
 */

import { useState, useEffect, useCallback } from 'react';
import { 
  AMP_VENDING_BUSINESS_INFO, 
  AMP_VENDING_SERVICES,
  getFormattedAddress,
  getFormattedBusinessHours,
  getServiceAreaList,
  getPrimaryKeywords,
  generateBusinessStructuredData,
  type BusinessService 
} from '@/lib/data/businessData';

/**
 * Google Business Profile Post Types
 */
export type GooglePostType = 'UPDATE' | 'EVENT' | 'OFFER' | 'PRODUCT';

/**
 * Google Business Profile Post Interface
 */
export interface GoogleBusinessPost {
  id: string;
  type: GooglePostType;
  title: string;
  description: string;
  image?: string;
  ctaButton: 'LEARN_MORE' | 'CALL_NOW' | 'ORDER_ONLINE' | 'SIGN_UP';
  targetKeywords: string[];
  publishDate: Date;
  expirationDate?: Date;
  isActive: boolean;
}

/**
 * Business Profile Metrics Interface
 */
export interface BusinessProfileMetrics {
  views: {
    searches: number;
    maps: number;
    total: number;
  };
  actions: {
    websiteClicks: number;
    phoneClicks: number;
    directionsRequests: number;
    total: number;
  };
  photos: {
    views: number;
    customerPhotos: number;
  };
  reviews: {
    count: number;
    averageRating: number;
    responseRate: number;
  };
}

/**
 * FAQ Entry Interface for Google Business Profile
 */
export interface BusinessFAQ {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  category: 'general' | 'pricing' | 'service' | 'installation' | 'maintenance';
  isPublished: boolean;
  lastUpdated: Date;
}

/**
 * Custom Hook for Google Business Profile Management
 */
export function useBusinessProfile() {
  // State management
  const [businessInfo] = useState(AMP_VENDING_BUSINESS_INFO);
  const [services] = useState(AMP_VENDING_SERVICES);
  const [posts, setPosts] = useState<GoogleBusinessPost[]>([]);
  const [faqs, setFaqs] = useState<BusinessFAQ[]>([]);
  const [metrics, setMetrics] = useState<BusinessProfileMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Generate SEO-optimized Google Business Posts
   */
  const generateSEOPosts = useCallback((): GoogleBusinessPost[] => {
    const currentDate = new Date();
    
    return [
      {
        id: 'touchscreen-machines-' + Date.now(),
        type: 'PRODUCT',
        title: 'Advanced Touchscreen Vending Machines Now Available',
        description: 'Upgrade your office with our latest commercial vending machines featuring 21.5" HD touchscreens and contactless payments. Professional installation included throughout Central California including Modesto, Stockton, and Fresno.',
        image: '/images/machines/amp-premium-touchscreen-vending-machine.png',
        ctaButton: 'LEARN_MORE',
        targetKeywords: [
          'touchscreen vending machines',
          'office vending Modesto',
          'commercial vending Central California'
        ],
        publishDate: currentDate,
        expirationDate: new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days
        isActive: true,
      },
      {
        id: 'professional-consultation-' + Date.now(),
        type: 'OFFER',
        title: 'Professional Commercial Vending Machine Consultation',
        description: 'Get a complimentary assessment for your workplace vending needs. Our experts will recommend the perfect commercial vending solution for your business in Central California. No obligation required.',
        image: '/images/consultation/amp-vending-consultation.jpg',
        ctaButton: 'CALL_NOW',
        targetKeywords: [
          'professional vending consultation',
          'commercial vending machines',
          'workplace vending solutions'
        ],
        publishDate: currentDate,
        isActive: true,
      },
      {
        id: 'refrigerated-machines-' + Date.now(),
        type: 'PRODUCT',
        title: 'Energy-Efficient Refrigerated Vending Machines',
        description: 'Keep beverages and fresh food perfectly chilled with our energy-efficient refrigerated vending machines. Features smart temperature control and modern payment systems for office convenience.',
        image: '/images/machines/amp-refrigerated-vending-machine.png',
        ctaButton: 'LEARN_MORE',
        targetKeywords: [
          'refrigerated vending machines',
          'beverage vending machines',
          'office refrigerated vending'
        ],
        publishDate: currentDate,
        expirationDate: new Date(currentDate.getTime() + 45 * 24 * 60 * 60 * 1000), // 45 days
        isActive: true,
      },
      {
        id: 'maintenance-service-' + Date.now(),
        type: 'UPDATE',
        title: 'Complete Maintenance Service Included',
        description: 'Every AMP Vending machine comes with comprehensive maintenance service including regular cleaning, restocking, repairs, and 24/7 technical support. Focus on your business while we handle your vending needs.',
        ctaButton: 'LEARN_MORE',
        targetKeywords: [
          'vending machine maintenance',
          'commercial vending service',
          'professional vending support'
        ],
        publishDate: currentDate,
        isActive: true,
      },
    ];
  }, []);

  /**
   * Generate SEO-optimized FAQs for Google Business Profile
   */
  const generateSEOFAQs = useCallback((): BusinessFAQ[] => {
    const currentDate = new Date();
    
    return [
      {
        id: 'commercial-machines-modesto',
        question: 'What types of commercial vending machines do you offer in Modesto?',
        answer: 'We provide refrigerated vending machines for beverages and fresh food, plus snack vending machines with touchscreen technology. All machines include professional installation and maintenance service throughout Central California including Modesto, Stockton, Fresno, and surrounding areas.',
        keywords: ['commercial vending machines Modesto', 'types of vending machines', 'Central California'],
        category: 'general',
        isPublished: true,
        lastUpdated: currentDate,
      },
      {
        id: 'service-area-coverage',
        question: 'Do you service vending machines in Stockton and Fresno?',
        answer: 'Yes! AMP Vending serves all of Central California including Stockton, Fresno, Merced, Turlock, Tracy, Manteca, and surrounding areas. We provide complete vending machine installation, maintenance, and restocking services with regular service routes throughout the region.',
        keywords: ['service area', 'Stockton vending machines', 'Fresno vending service'],
        category: 'service',
        isPublished: true,
        lastUpdated: currentDate,
      },
      {
        id: 'payment-methods-accepted',
        question: 'What payment methods do your vending machines accept?',
        answer: 'Our modern vending machines accept credit cards, debit cards, mobile payments (Apple Pay, Google Pay, Samsung Pay), and cash. All machines feature contactless payment technology for convenience and safety, plus advanced bill recycling systems for accurate change.',
        keywords: ['payment methods', 'contactless payments', 'mobile payments vending'],
        category: 'general',
        isPublished: true,
        lastUpdated: currentDate,
      },
      {
        id: 'installation-cost-pricing',
        question: 'How much does commercial vending machine installation cost?',
        answer: 'We provide professional consultations and competitive pricing for all commercial vending machine installations. Pricing varies based on machine type, location requirements, and service package. Contact us at (209) 403-5450 for a customized quote based on your specific business needs.',
        keywords: ['installation cost', 'vending machine pricing', 'professional consultation'],
        category: 'pricing',
        isPublished: true,
        lastUpdated: currentDate,
      },
      {
        id: 'touchscreen-technology-features',
        question: 'What are the benefits of touchscreen vending machines?',
        answer: 'Our touchscreen vending machines feature 21.5" HD displays with intuitive navigation, product images, nutritional information, and promotional capabilities. They offer enhanced user experience, reduced maintenance needs, and better sales analytics for optimizing product selection.',
        keywords: ['touchscreen vending machines', 'vending machine technology', 'HD touchscreen'],
        category: 'general',
        isPublished: true,
        lastUpdated: currentDate,
      },
      {
        id: 'maintenance-service-included',
        question: 'Is maintenance service included with vending machine installation?',
        answer: 'Yes! All AMP Vending installations include comprehensive maintenance service featuring regular cleaning, restocking, equipment repairs, software updates, and 24/7 technical support. We handle everything so you can focus on your business operations.',
        keywords: ['maintenance included', 'vending machine service', 'comprehensive support'],
        category: 'maintenance',
        isPublished: true,
        lastUpdated: currentDate,
      },
    ];
  }, []);

  /**
   * Get formatted business information for Google Business Profile
   */
  const getBusinessProfileData = useCallback(() => {
    return {
      name: businessInfo.name,
      description: businessInfo.description,
      shortDescription: businessInfo.shortDescription,
      address: getFormattedAddress(),
      coordinates: businessInfo.address.coordinates,
      phone: businessInfo.contact.phone,
      email: businessInfo.contact.email,
      website: businessInfo.contact.website,
      hours: getFormattedBusinessHours(),
      serviceArea: getServiceAreaList(),
      primaryKeywords: getPrimaryKeywords(),
      structuredData: generateBusinessStructuredData(),
    };
  }, [businessInfo]);

  /**
   * Get featured services for Google Business Profile
   */
  const getFeaturedServices = useCallback((): BusinessService[] => {
    return services.filter(service => service.featured);
  }, [services]);

  /**
   * Generate NAP (Name, Address, Phone) consistency data
   */
  const getNAPData = useCallback(() => {
    return {
      name: businessInfo.name,
      address: getFormattedAddress(),
      phone: businessInfo.contact.phone,
      // Formatted for citation consistency
      formatted: {
        citation: `${businessInfo.name}, ${getFormattedAddress()}, ${businessInfo.contact.phone}`,
        directory: {
          name: businessInfo.name,
          street: `${businessInfo.address.streetAddress}${businessInfo.address.suite ? ` ${businessInfo.address.suite}` : ''}`,
          city: businessInfo.address.city,
          state: businessInfo.address.state,
          zip: businessInfo.address.zipCode,
          phone: businessInfo.contact.phone,
        },
      },
    };
  }, [businessInfo]);

  /**
   * Track Google Business Profile performance
   */
  const trackBusinessProfilePerformance = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real implementation, this would connect to Google Business Profile API
      // For now, we'll simulate the data structure
      const mockMetrics: BusinessProfileMetrics = {
        views: {
          searches: 1250,
          maps: 890,
          total: 2140,
        },
        actions: {
          websiteClicks: 156,
          phoneClicks: 89,
          directionsRequests: 67,
          total: 312,
        },
        photos: {
          views: 2340,
          customerPhotos: 12,
        },
        reviews: {
          count: 47,
          averageRating: 4.8,
          responseRate: 95,
        },
      };
      
      setMetrics(mockMetrics);
    } catch (err) {
      setError('Failed to fetch business profile metrics');
      console.error('Business profile tracking error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Initialize Google Business Profile optimization
   */
  useEffect(() => {
    const initializePosts = generateSEOPosts();
    const initializeFAQs = generateSEOFAQs();
    
    setPosts(initializePosts);
    setFaqs(initializeFAQs);
    
    // Track initial metrics
    trackBusinessProfilePerformance();
  }, [generateSEOPosts, generateSEOFAQs, trackBusinessProfilePerformance]);

  /**
   * Generate weekly Google Business Profile content
   */
  const generateWeeklyContent = useCallback(() => {
    const weeklyPosts = generateSEOPosts();
    setPosts(prevPosts => [...prevPosts, ...weeklyPosts]);
  }, [generateSEOPosts]);

  /**
   * Update FAQ content
   */
  const updateFAQ = useCallback((faqId: string, updates: Partial<BusinessFAQ>) => {
    setFaqs(prevFaqs => 
      prevFaqs.map(faq => 
        faq.id === faqId 
          ? { ...faq, ...updates, lastUpdated: new Date() }
          : faq
      )
    );
  }, []);

  /**
   * Add new FAQ entry
   */
  const addFAQ = useCallback((newFAQ: Omit<BusinessFAQ, 'id' | 'lastUpdated'>) => {
    const faq: BusinessFAQ = {
      ...newFAQ,
      id: 'faq-' + Date.now(),
      lastUpdated: new Date(),
    };
    setFaqs(prevFaqs => [...prevFaqs, faq]);
  }, []);

  return {
    // Business information
    businessInfo: getBusinessProfileData(),
    services: getFeaturedServices(),
    napData: getNAPData(),
    
    // Content management
    posts,
    faqs,
    generateWeeklyContent,
    updateFAQ,
    addFAQ,
    
    // Performance tracking
    metrics,
    trackBusinessProfilePerformance,
    
    // State
    isLoading,
    error,
    
    // Utility functions
    generateSEOPosts,
    generateSEOFAQs,
  };
}

export default useBusinessProfile;