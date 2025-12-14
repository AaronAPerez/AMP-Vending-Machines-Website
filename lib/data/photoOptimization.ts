/**
 * Photo Optimization System for Google Business Profile
 * 
 * Build Process Documentation:
 * 1. SEO-optimized file naming conventions for maximum search visibility
 * 2. Structured photo categorization for Google Business Profile
 * 3. Automated image metadata generation with local keywords
 * 4. Performance optimization with Next.js Image component integration
 * 5. Accessibility compliance with descriptive alt text
 */

import { z } from 'zod';
import { AMP_VENDING_BUSINESS_INFO } from './businessData';

/**
 * Photo Category Enumeration for Google Business Profile
 */
export enum PhotoCategory {
  LOGO = 'logo',
  EXTERIOR = 'exterior', 
  INTERIOR = 'interior',
  PRODUCTS = 'products',
  TEAM = 'team',
  AT_WORK = 'at-work',
  ADDITIONAL = 'additional',
  COVER = 'cover',
}

/**
 * Photo Priority Levels for upload scheduling
 */
export enum PhotoPriority {
  CRITICAL = 'critical',
  HIGH = 'high', 
  MEDIUM = 'medium',
  LOW = 'low',
}

/**
 * Photo Schema for validation and type safety
 */
export const PhotoSchema = z.object({
  id: z.string(),
  filename: z.string(),
  originalFilename: z.string(),
  category: z.nativeEnum(PhotoCategory),
  priority: z.nativeEnum(PhotoPriority),
  title: z.string(),
  altText: z.string(),
  description: z.string(),
  keywords: z.array(z.string()),
  localKeywords: z.array(z.string()),
  dimensions: z.object({
    width: z.number(),
    height: z.number(),
  }),
  fileSize: z.number(), // in bytes
  format: z.enum(['jpg', 'jpeg', 'png', 'webp']),
  uploadDate: z.date(),
  isOptimized: z.boolean(),
  geoLocation: z.object({
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    address: z.string().optional(),
  }).optional(),
  tags: z.array(z.string()),
});

export type Photo = z.infer<typeof PhotoSchema>;

/**
 * Photo Requirements for Google Business Profile
 */
export const GOOGLE_BUSINESS_PHOTO_REQUIREMENTS = {
  logo: {
    minWidth: 250,
    minHeight: 250,
    aspectRatio: '1:1',
    maxFileSize: 5 * 1024 * 1024, // 5MB
    formats: ['jpg', 'jpeg', 'png'],
    description: 'Square logo image for business identification',
  },
  cover: {
    minWidth: 1024,
    minHeight: 576,
    aspectRatio: '16:9',
    maxFileSize: 5 * 1024 * 1024, // 5MB
    formats: ['jpg', 'jpeg', 'png'],
    description: 'Horizontal cover photo showcasing business',
  },
  general: {
    minWidth: 720,
    minHeight: 720,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    formats: ['jpg', 'jpeg', 'png'],
    description: 'General business photos',
  },
} as const;

/**
 * SEO-Optimized Photo Collection for AMP Vending
 */
export const AMP_VENDING_PHOTO_STRATEGY: Record<PhotoCategory, Photo[]> = {
  [PhotoCategory.LOGO]: [
    {
      id: 'amp-logo-square',
      filename: 'amp-vending-logo-commercial-vending-machines-modesto.jpg',
      originalFilename: 'AMP_logo.png',
      category: PhotoCategory.LOGO,
      priority: PhotoPriority.CRITICAL,
      title: 'AMP Vending Logo - Commercial Vending Machines Modesto',
      altText: 'AMP Vending logo for commercial vending machine services in Modesto California',
      description: 'Professional logo for AMP Vending, the leading commercial vending machine provider in Central California serving Modesto, Stockton, and Fresno.',
      keywords: [
        'AMP Vending logo',
        'commercial vending machines',
        'business logo',
        'vending company',
      ],
      localKeywords: [
        'vending machines Modesto',
        'commercial vending Central California',
        'AMP Vending Modesto CA',
      ],
      dimensions: { width: 400, height: 400 },
      fileSize: 45000,
      format: 'jpg',
      uploadDate: new Date(),
      isOptimized: true,
      tags: ['logo', 'branding', 'business'],
    },
  ],

  [PhotoCategory.EXTERIOR]: [
    {
      id: 'amp-office-exterior',
      filename: 'amp-vending-office-modesto-california-commercial-building.jpg',
      originalFilename: 'office-exterior.jpg',
      category: PhotoCategory.EXTERIOR,
      priority: PhotoPriority.HIGH,
      title: 'AMP Vending Office - Modesto California Business Location',
      altText: 'AMP Vending office building exterior in Modesto California for commercial vending machine services',
      description: 'Professional office location of AMP Vending in Modesto, California, serving Central California with commercial vending machine solutions.',
      keywords: [
        'office building',
        'business location',
        'professional office',
        'commercial building',
      ],
      localKeywords: [
        'Modesto business office',
        'Central California location',
        'Dale Road Modesto',
        'AMP Vending office',
      ],
      dimensions: { width: 1200, height: 800 },
      fileSize: 180000,
      format: 'jpg',
      uploadDate: new Date(),
      isOptimized: true,
      geoLocation: {
        latitude: AMP_VENDING_BUSINESS_INFO.address.coordinates.latitude,
        longitude: AMP_VENDING_BUSINESS_INFO.address.coordinates.longitude,
        address: `${AMP_VENDING_BUSINESS_INFO.address.streetAddress}, ${AMP_VENDING_BUSINESS_INFO.address.city}, ${AMP_VENDING_BUSINESS_INFO.address.state}`,
      },
      tags: ['exterior', 'office', 'location'],
    },
  ],

  [PhotoCategory.INTERIOR]: [
    {
      id: 'amp-office-interior',
      filename: 'amp-vending-office-interior-workspace-modesto-california.jpg',
      originalFilename: 'office-interior.jpg',
      category: PhotoCategory.INTERIOR,
      priority: PhotoPriority.MEDIUM,
      title: 'AMP Vending Office Interior - Professional Workspace Modesto',
      altText: 'Modern office interior workspace at AMP Vending in Modesto California',
      description: 'Professional workspace interior at AMP Vending featuring modern office design and equipment for managing commercial vending machine operations.',
      keywords: [
        'office interior',
        'professional workspace',
        'modern office',
        'business interior',
      ],
      localKeywords: [
        'Modesto office space',
        'professional workspace Central California',
        'AMP Vending interior',
      ],
      dimensions: { width: 1200, height: 900 },
      fileSize: 195000,
      format: 'jpg',
      uploadDate: new Date(),
      isOptimized: true,
      tags: ['interior', 'workspace', 'office'],
    },
  ],

  [PhotoCategory.PRODUCTS]: [
    {
      id: 'touchscreen-vending-machine',
      filename: 'touchscreen-vending-machine-commercial-office-central-california.jpg',
      originalFilename: 'amp-premium-touchscreen-vending-machine.png',
      category: PhotoCategory.PRODUCTS,
      priority: PhotoPriority.CRITICAL,
      title: 'Commercial Touchscreen Vending Machine - AMP Vending Central California',
      altText: 'Premium touchscreen vending machine with 21.5 inch display for offices and businesses in Central California',
      description: 'State-of-the-art commercial vending machine featuring 21.5-inch HD touchscreen technology, contactless payments, and 50+ product capacity for modern workplaces.',
      keywords: [
        'touchscreen vending machine',
        'commercial vending equipment',
        'modern vending machine',
        'office vending solution',
      ],
      localKeywords: [
        'vending machines Central California',
        'office vending Modesto',
        'commercial vending Stockton',
        'touchscreen vending Fresno',
      ],
      dimensions: { width: 800, height: 1200 },
      fileSize: 220000,
      format: 'jpg',
      uploadDate: new Date(),
      isOptimized: true,
      tags: ['product', 'vending machine', 'touchscreen'],
    },
    {
      id: 'refrigerated-vending-machine',
      filename: 'refrigerated-vending-machine-beverages-central-california-office.jpg',
      originalFilename: 'amp-refrigerated-vending-machine.png',
      category: PhotoCategory.PRODUCTS,
      priority: PhotoPriority.CRITICAL,
      title: 'Refrigerated Vending Machine - Beverage Solutions Central California',
      altText: 'Energy-efficient refrigerated vending machine for beverages and fresh food in Central California offices',
      description: 'Professional refrigerated vending machine with energy-efficient cooling system, perfect for beverages and fresh food items in office environments.',
      keywords: [
        'refrigerated vending machine',
        'beverage vending',
        'energy efficient vending',
        'fresh food vending',
      ],
      localKeywords: [
        'refrigerated vending Central California',
        'beverage machines Modesto',
        'office refrigerated vending',
        'fresh food vending Stockton',
      ],
      dimensions: { width: 800, height: 1200 },
      fileSize: 235000,
      format: 'jpg',
      uploadDate: new Date(),
      isOptimized: true,
      tags: ['product', 'refrigerated', 'beverages'],
    },
  ],

  [PhotoCategory.TEAM]: [
    {
      id: 'amp-vending-team',
      filename: 'amp-vending-professional-team-technicians-central-california.jpg',
      originalFilename: 'team-photo.jpg',
      category: PhotoCategory.TEAM,
      priority: PhotoPriority.HIGH,
      title: 'AMP Vending Professional Team - Central California Technicians',
      altText: 'Professional AMP Vending team of certified technicians serving Central California',
      description: 'Experienced team of certified vending machine technicians and customer service professionals serving businesses throughout Central California.',
      keywords: [
        'professional team',
        'certified technicians',
        'vending experts',
        'customer service team',
      ],
      localKeywords: [
        'Central California technicians',
        'Modesto service team',
        'local vending professionals',
        'AMP Vending staff',
      ],
      dimensions: { width: 1200, height: 800 },
      fileSize: 175000,
      format: 'jpg',
      uploadDate: new Date(),
      isOptimized: true,
      tags: ['team', 'professionals', 'technicians'],
    },
  ],

  [PhotoCategory.AT_WORK]: [
    {
      id: 'vending-machine-installation',
      filename: 'commercial-vending-machine-installation-process-modesto-california.jpg',
      originalFilename: 'installation-process.jpg',
      category: PhotoCategory.AT_WORK,
      priority: PhotoPriority.HIGH,
      title: 'Commercial Vending Machine Installation - Professional Service Modesto',
      altText: 'AMP Vending technician installing commercial vending machine in office building in Modesto California',
      description: 'Professional installation process of commercial vending machine by certified AMP Vending technicians in a modern office environment.',
      keywords: [
        'vending machine installation',
        'professional installation',
        'technician at work',
        'commercial installation',
      ],
      localKeywords: [
        'vending installation Modesto',
        'commercial installation Central California',
        'office vending setup',
        'professional service Modesto',
      ],
      dimensions: { width: 1200, height: 900 },
      fileSize: 210000,
      format: 'jpg',
      uploadDate: new Date(),
      isOptimized: true,
      tags: ['installation', 'service', 'work'],
    },
    {
      id: 'vending-machine-maintenance',
      filename: 'vending-machine-maintenance-service-central-california-office.jpg',
      originalFilename: 'maintenance-service.jpg',
      category: PhotoCategory.AT_WORK,
      priority: PhotoPriority.MEDIUM,
      title: 'Vending Machine Maintenance Service - Central California Support',
      altText: 'AMP Vending technician performing maintenance service on office vending machine in Central California',
      description: 'Comprehensive maintenance service being performed on commercial vending machine, ensuring optimal performance and customer satisfaction.',
      keywords: [
        'vending machine maintenance',
        'professional service',
        'technical support',
        'equipment maintenance',
      ],
      localKeywords: [
        'vending maintenance Central California',
        'service support Modesto',
        'commercial maintenance',
        'professional upkeep',
      ],
      dimensions: { width: 1200, height: 900 },
      fileSize: 190000,
      format: 'jpg',
      uploadDate: new Date(),
      isOptimized: true,
      tags: ['maintenance', 'service', 'support'],
    },
  ],

  [PhotoCategory.ADDITIONAL]: [
    {
      id: 'customer-location-office',
      filename: 'customer-office-location-vending-machine-central-california.jpg',
      originalFilename: 'customer-office.jpg',
      category: PhotoCategory.ADDITIONAL,
      priority: PhotoPriority.MEDIUM,
      title: 'Customer Office Location - Vending Machine Installation Central California',
      altText: 'Modern office break room with AMP Vending machine installation in Central California',
      description: 'Successful vending machine installation in customer office break room, showcasing how AMP Vending enhances workplace convenience.',
      keywords: [
        'customer location',
        'office break room',
        'workplace solution',
        'successful installation',
      ],
      localKeywords: [
        'office installation Central California',
        'break room vending',
        'workplace convenience',
        'customer satisfaction',
      ],
      dimensions: { width: 1200, height: 800 },
      fileSize: 165000,
      format: 'jpg',
      uploadDate: new Date(),
      isOptimized: true,
      tags: ['customer', 'office', 'installation'],
    },
  ],

  [PhotoCategory.COVER]: [
    {
      id: 'amp-vending-cover-photo',
      filename: 'amp-vending-commercial-machines-central-california-cover-photo.jpg',
      originalFilename: 'cover-photo.jpg',
      category: PhotoCategory.COVER,
      priority: PhotoPriority.CRITICAL,
      title: 'AMP Vending - Premier Commercial Vending Machines Central California',
      altText: 'AMP Vending commercial vending machines showcase for Central California businesses',
      description: 'Professional showcase of AMP Vending\'s commercial vending machine solutions, featuring modern touchscreen technology and comprehensive service offerings.',
      keywords: [
        'commercial vending machines',
        'business solutions',
        'professional equipment',
        'workplace technology',
      ],
      localKeywords: [
        'Central California vending',
        'Modesto commercial machines',
        'business vending solutions',
        'professional service',
      ],
      dimensions: { width: 1200, height: 675 },
      fileSize: 240000,
      format: 'jpg',
      uploadDate: new Date(),
      isOptimized: true,
      tags: ['cover', 'showcase', 'professional'],
    },
  ],
};

/**
 * Utility Functions for Photo Optimization
 */

/**
 * Generate SEO-optimized filename
 */
export function generateSEOFilename(
  category: PhotoCategory,
  description: string,
  location?: string
): string {
  const baseKeywords = [
    'amp-vending',
    'commercial-vending-machines',
  ];
  
  const locationKeyword = location || 'central-california';
  const cleanDescription = description
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');
  
  const filename = [
    ...baseKeywords,
    cleanDescription,
    locationKeyword,
    category ?? '',
  ].join('-');
  
  return `${filename}.jpg`;
}

/**
 * Generate comprehensive alt text with SEO keywords
 */
export function generateSEOAltText(
  photo: Partial<Photo>,
  includeLocation: boolean = true
): string {
  const baseAlt = photo.title || photo.description || '';
  const location = includeLocation ? ' in Central California' : '';
  const category = photo.category ? ` - ${photo.category.replace('-', ' ')}` : '';
  
  return `${baseAlt}${category}${location}`.trim();
}

/**
 * Get photos by category
 */
export function getPhotosByCategory(category: PhotoCategory): Photo[] {
  return AMP_VENDING_PHOTO_STRATEGY[category] || [];
}

/**
 * Get all photos sorted by priority
 */
export function getAllPhotosSortedByPriority(): Photo[] {
  const allPhotos = Object.values(AMP_VENDING_PHOTO_STRATEGY).flat();
  
  const priorityOrder = {
    [PhotoPriority.CRITICAL]: 0,
    [PhotoPriority.HIGH]: 1,
    [PhotoPriority.MEDIUM]: 2,
    [PhotoPriority.LOW]: 3,
  };
  
  return allPhotos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

/**
 * Get photos for Google Business Profile upload
 */
export function getGoogleBusinessPhotos(): {
  logo: Photo[];
  cover: Photo[];
  products: Photo[];
  team: Photo[];
  atWork: Photo[];
  additional: Photo[];
} {
  return {
    logo: getPhotosByCategory(PhotoCategory.LOGO),
    cover: getPhotosByCategory(PhotoCategory.COVER),
    products: getPhotosByCategory(PhotoCategory.PRODUCTS),
    team: getPhotosByCategory(PhotoCategory.TEAM),
    atWork: getPhotosByCategory(PhotoCategory.AT_WORK),
    additional: getPhotosByCategory(PhotoCategory.ADDITIONAL),
  };
}

/**
 * Validate photo for Google Business Profile requirements
 */
export function validatePhotoForGoogleBusiness(
  photo: Photo,
  category: keyof typeof GOOGLE_BUSINESS_PHOTO_REQUIREMENTS = 'general'
): { isValid: boolean; errors: string[] } {
  const requirements = GOOGLE_BUSINESS_PHOTO_REQUIREMENTS[category];
  const errors: string[] = [];
  
  // Check dimensions
  if (photo.dimensions.width < requirements.minWidth) {
    errors.push(`Width ${photo.dimensions.width}px is below minimum ${requirements.minWidth}px`);
  }
  
  if (photo.dimensions.height < requirements.minHeight) {
    errors.push(`Height ${photo.dimensions.height}px is below minimum ${requirements.minHeight}px`);
  }
  
  // Check file size
  if (photo.fileSize > requirements.maxFileSize) {
    const maxSizeMB = requirements.maxFileSize / (1024 * 1024);
    const currentSizeMB = photo.fileSize / (1024 * 1024);
    errors.push(`File size ${currentSizeMB.toFixed(1)}MB exceeds maximum ${maxSizeMB}MB`);
  }
  
  // Check format
  if (!requirements.formats.includes(photo.format as typeof requirements.formats[number])) {
    errors.push(`Format ${photo.format} not supported. Use: ${requirements.formats.join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Generate photo upload schedule for Google Business Profile
 */
export function generatePhotoUploadSchedule(): {
  week: number;
  photos: Photo[];
  category: string;
  priority: PhotoPriority;
}[] {
  const allPhotos = getAllPhotosSortedByPriority();
  const schedule: {
    week: number;
    photos: Photo[];
    category: string;
    priority: PhotoPriority;
  }[] = [];
  let week = 1;
  
  // Group photos by category and priority
  const photoGroups = allPhotos.reduce((acc, photo) => {
    const key = `${photo.category}-${photo.priority}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(photo);
    return acc;
  }, {} as Record<string, Photo[]>);
  
  // Schedule uploads over multiple weeks
  Object.entries(photoGroups).forEach(([key, photos], index) => {
    const [category, priority] = key.split('-');
    schedule.push({
      week: week + Math.floor(index / 2), // 2 categories per week
      photos,
      category : 'general',
      priority: priority as PhotoPriority,
    });
  });
  
  return schedule;
}

export default AMP_VENDING_PHOTO_STRATEGY;