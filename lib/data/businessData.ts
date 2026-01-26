/**
 * AMP Vending Business Data - SEO Optimized
 * 
 * Build Process Documentation:
 * 1. Centralized business information for consistency across all platforms
 * 2. SEO-optimized descriptions with target keywords
 * 3. Structured data compatible with Google Business Profile
 * 4. Type-safe business information management
 * 5. Easy maintenance and updates for business details
 */

import { z } from 'zod';

/**
 * Business Address Schema for type safety and validation
 */
export const BusinessAddressSchema = z.object({
  streetAddress: z.string(),
  suite: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});

/**
 * Business Contact Schema
 */
export const BusinessContactSchema = z.object({
  phone: z.string(),
  email: z.string().email(),
  website: z.string().url(),
});

/**
 * Business Hours Schema
 */
export const BusinessHoursSchema = z.object({
  monday: z.object({ open: z.string(), close: z.string() }),
  tuesday: z.object({ open: z.string(), close: z.string() }),
  wednesday: z.object({ open: z.string(), close: z.string() }),
  thursday: z.object({ open: z.string(), close: z.string() }),
  friday: z.object({ open: z.string(), close: z.string() }),
  saturday: z.object({ open: z.string(), close: z.string() }),
  sunday: z.object({ open: z.string(), close: z.string() }),
});

/**
 * Service Area Schema for local SEO
 */
export const ServiceAreaSchema = z.object({
  primary: z.string(),
  secondary: z.array(z.string()),
  radius: z.number(), // in miles
});

/**
 * Business Service Schema for Google Business Profile
 */
export const BusinessServiceSchema = z.object({
  name: z.string(),
  description: z.string(),
  keywords: z.array(z.string()),
  category: z.enum(['installation', 'maintenance', 'equipment', 'consultation']),
  featured: z.boolean().default(false),
});

// Type definitions
export type BusinessAddress = z.infer<typeof BusinessAddressSchema>;
export type BusinessContact = z.infer<typeof BusinessContactSchema>;
export type BusinessHours = z.infer<typeof BusinessHoursSchema>;
export type ServiceArea = z.infer<typeof ServiceAreaSchema>;
export type BusinessService = z.infer<typeof BusinessServiceSchema>;

/**
 * Core Business Information - Single Source of Truth
 */
export const AMP_VENDING_BUSINESS_INFO = {
  // Basic Business Details
  name: "AMP Vending",
  legalName: "AMP Design and Consulting",
  slogan: "Premium Vending Solutions for Modern Workplaces",
  
  // SEO-Optimized Business Description for Google Business Profile
  description: `Professional commercial vending machine solutions for offices, schools, and businesses throughout Central California. AMP Vending provides state-of-the-art touchscreen vending machines with complete installation, maintenance, and restocking services. Serving Modesto, Stockton, Turlock, and surrounding areas with refrigerated and snack vending machines featuring contactless payment technology. Contact us for free consultations on workplace vending solutions that enhance employee satisfaction and convenience.`,
  
  // Short description for citations and directories
  shortDescription: `Commercial vending machines with professional installation and maintenance service throughout Central California. Touchscreen technology, contactless payments, 50+ product options.`,
  
  // Address Information
  address: {
    streetAddress: "4120 Dale Rd",
    suite: "ste j8 1005",
    city: "Modesto",
    state: "CA",
    zipCode: "95354",
    country: "United States",
    coordinates: {
      latitude: 37.6390972,
      longitude: -120.9968782,
    },
  } as BusinessAddress,
  
  // Contact Information
  contact: {
    phone: "(209) 403-5450",
    email: "ampdesignandconsulting@gmail.com",
    website: "https://www.ampvendingmachines.com",
  } as BusinessContact,
  
  // Business Hours
  hours: {
    monday: { open: "08:00", close: "20:00" },
    tuesday: { open: "08:00", close: "20:00" },
    wednesday: { open: "08:00", close: "20:00" },
    thursday: { open: "08:00", close: "20:00" },
    friday: { open: "08:00", close: "20:00" },
    saturday: { open: "08:00", close: "20:00" },
    sunday: { open: "08:00", close: "20:00" },
  } as BusinessHours,
  
  // Service Area for Local SEO - Complete Coverage
  // NOTE: Full city list with coordinates managed in lib/data/comprehensiveServiceAreas.ts
  serviceArea: {
    primary: "Modesto, CA",
    secondary: [
      // Stanislaus County (All Incorporated Cities)
      "Turlock, CA",
      "Ceres, CA",
      "Riverbank, CA",
      "Oakdale, CA",
      "Patterson, CA",
      "Waterford, CA",
      "Hughson, CA",
      "Newman, CA",
      // Stanislaus County (Major Unincorporated)
      "Salida, CA",
      "Denair, CA",
      "Empire, CA",
      "Keyes, CA",
      "Del Rio, CA",
      "Hickman, CA",

      // San Joaquin County (All Incorporated Cities)
      "Stockton, CA",
      "Tracy, CA",
      "Manteca, CA",
      "Lodi, CA",
      "Ripon, CA",
      "Lathrop, CA",
      "Escalon, CA",
      // San Joaquin County (Major Unincorporated)
      "Mountain House, CA",
      "French Camp, CA",
      "Country Club, CA",
      "Woodbridge, CA",
      "Lockeford, CA",

      // Adjacent Counties
      "Merced, CA",
    ],
    radius: 60, // miles from Modesto
  } as ServiceArea,
} as const;

/**
 * SEO-Optimized Services for Google Business Profile
 * Each service targets specific keywords for local search optimization
 */
export const AMP_VENDING_SERVICES: BusinessService[] = [
  {
    name: "Commercial Vending Machine Installation",
    description: "Professional installation of touchscreen vending machines for offices and businesses throughout Central California. Our certified technicians ensure proper setup, configuration, and employee training for optimal performance.",
    keywords: [
      "commercial vending machine installation",
      "office vending machine setup", 
      "business vending installation Modesto",
      "professional vending machine service"
    ],
    category: "installation",
    featured: true,
  },
  {
    name: "Refrigerated Vending Machines",
    description: "Energy-efficient refrigerated vending machines for beverages and fresh food items. Features touchscreen interface, contactless payments, and smart inventory management for workplace convenience.",
    keywords: [
      "refrigerated vending machines",
      "beverage vending machines Central California",
      "office refrigerated vending Modesto",
      "fresh food vending machines"
    ],
    category: "equipment",
    featured: true,
  },
  {
    name: "Snack Vending Machines with Touchscreen Technology",
    description: "High-capacity snack vending machines featuring 21.5-inch HD touchscreen displays and modern payment systems. Perfect for offices, schools, and commercial facilities with 50+ product options.",
    keywords: [
      "touchscreen snack vending machines",
      "office snack machines Modesto",
      "commercial snack vending Central California",
      "modern vending machine technology"
    ],
    category: "equipment",
    featured: true,
  },
  {
    name: "Complete Vending Machine Maintenance Service",
    description: "Comprehensive maintenance and restocking services for commercial vending machines. Includes regular cleaning, inventory management, repair services, and 24/7 technical support throughout Central California.",
    keywords: [
      "vending machine maintenance",
      "vending machine repair Modesto",
      "commercial vending service Central California",
      "vending machine restocking"
    ],
    category: "maintenance",
    featured: false,
  },
  {
    name: "Office Break Room Vending Solutions",
    description: "Complete workplace refreshment solutions designed to enhance employee satisfaction and productivity. Custom product selection, professional installation, and ongoing maintenance for businesses of all sizes.",
    keywords: [
      "office break room solutions",
      "workplace vending machines",
      "employee refreshment services Modesto",
      "business vending solutions"
    ],
    category: "consultation",
    featured: false,
  },
  {
    name: "Free Vending Machine Consultation",
    description: "Complimentary workplace assessment and vending machine recommendations. Our experts analyze your location, foot traffic, and employee preferences to suggest optimal vending solutions for your business.",
    keywords: [
      "free vending machine consultation",
      "vending machine assessment Modesto",
      "commercial vending consultation Central California",
      "workplace vending evaluation"
    ],
    category: "consultation",
    featured: true,
  },
];

/**
 * Google Business Profile Categories
 * Primary and secondary categories for optimal local search visibility
 */
export const GOOGLE_BUSINESS_CATEGORIES = {
  primary: "Vending Machine Supplier",
  secondary: [
    "Commercial Equipment Supplier",
    "Business Service",
    "Equipment Supplier",
    "Refreshment Stand",
  ],
} as const;

/**
 * Business Attributes for Google Business Profile
 * These enhance local search visibility and customer trust
 */
export const BUSINESS_ATTRIBUTES = {
  // Accessibility
  wheelchairAccessible: true,
  
  // Payment Methods
  acceptsCreditCards: true,
  acceptsDebitCards: true,
  acceptsCash: true,
  acceptsContactlessPayment: true,
  acceptsApplePay: true,
  acceptsGooglePay: true,
  
  // Service Features
  freeEstimates: true,
  licensedAndInsured: true,
  locallyOwned: true,
  professionalService: true,
  emergencyService: false,
  
  // Technology Features
  hasWiFi: false, // Update if applicable
  hasParking: true,
  
  // Special Features
  customInstallation: true,
  maintenanceIncluded: true,
  warrantyService: true,
} as const;

/**
 * Utility Functions for Business Data
 */

/**
 * Get formatted business address for citations
 */
export function getFormattedAddress(includeCoordinates: boolean = false): string {
  const { address } = AMP_VENDING_BUSINESS_INFO;
  const formatted = `${address.streetAddress}${address.suite ? ` ${address.suite}` : ''}, ${address.city}, ${address.state} ${address.zipCode}`;
  
  if (includeCoordinates) {
    return `${formatted} (${address.coordinates.latitude}, ${address.coordinates.longitude})`;
  }
  
  return formatted;
}

/**
 * Get business hours in Google Business Profile format
 */
export function getFormattedBusinessHours(): Record<string, string> {
  const { hours } = AMP_VENDING_BUSINESS_INFO;
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour || '0');
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };
  
  return {
    monday: `${formatTime(hours.monday.open)} - ${formatTime(hours.monday.close)}`,
    tuesday: `${formatTime(hours.tuesday.open)} - ${formatTime(hours.tuesday.close)}`,
    wednesday: `${formatTime(hours.wednesday.open)} - ${formatTime(hours.wednesday.close)}`,
    thursday: `${formatTime(hours.thursday.open)} - ${formatTime(hours.thursday.close)}`,
    friday: `${formatTime(hours.friday.open)} - ${formatTime(hours.friday.close)}`,
    saturday: `${formatTime(hours.saturday.open)} - ${formatTime(hours.saturday.close)}`,
    sunday: `${formatTime(hours.sunday.open)} - ${formatTime(hours.sunday.close)}`,
  };
}

/**
 * Get service area list for local SEO
 */
export function getServiceAreaList(): string[] {
  const { serviceArea } = AMP_VENDING_BUSINESS_INFO;
  return [serviceArea.primary, ...serviceArea.secondary];
}

/**
 * Get primary keywords for SEO optimization
 */
export function getPrimaryKeywords(): string[] {
  return [
    "commercial vending machines Modesto",
    "office vending machines Central California",
    "touchscreen vending machines",
    "refrigerated vending machines",
    "professional vending installation",
    "workplace vending solutions",
    "business vending service Modesto",
    "vending machine maintenance Central California",
  ];
}

/**
 * Get long-tail keywords for content optimization
 */
export function getLongTailKeywords(): string[] {
  return [
    "commercial vending machine installation Modesto CA",
    "office break room vending solutions Central California",
    "touchscreen snack vending machines for businesses",
    "refrigerated beverage vending machines with contactless payment",
    "professional vending machine service Stockton Turlock",
    "workplace refreshment solutions employee satisfaction",
    "commercial vending equipment supplier Central Valley",
    "business vending machine consultation free estimate",
  ];
}

/**
 * Generate structured data for Google Business Profile
 */
export function generateBusinessStructuredData() {
  const business = AMP_VENDING_BUSINESS_INFO;
  
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.name,
    "description": business.description,
    "url": business.contact.website,
    "telephone": business.contact.phone,
    "email": business.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `${business.address.streetAddress}${business.address.suite ? ` ${business.address.suite}` : ''}`,
      "addressLocality": business.address.city,
      "addressRegion": business.address.state,
      "postalCode": business.address.zipCode,
      "addressCountry": business.address.country,
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": business.address.coordinates.latitude,
      "longitude": business.address.coordinates.longitude,
    },
    "openingHours": [
      "Mo-Su 08:00-20:00"
    ],
    "areaServed": getServiceAreaList(),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Commercial Vending Machine Services",
      "itemListElement": AMP_VENDING_SERVICES.filter(service => service.featured).map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description,
        },
      })),
    },
    "priceRange": "$$",
    "paymentAccepted": [
      "Cash",
      "Credit Card", 
      "Debit Card",
      "Contactless Payment",
      "Apple Pay",
      "Google Pay"
    ],
  };
}

export default AMP_VENDING_BUSINESS_INFO;