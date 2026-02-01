import { z } from 'zod';

/**
 * Validation schemas for business information
 * Used in admin API endpoints for updating business details
 */

/**
 * Business hours schema
 */
export const businessHoursSchema = z.object({
  monday: z.string(),
  tuesday: z.string(),
  wednesday: z.string(),
  thursday: z.string(),
  friday: z.string(),
  saturday: z.string(),
  sunday: z.string()
});

/**
 * Update business info validation schema
 */
export const updateBusinessInfoSchema = z.object({
  businessName: z.string()
    .min(2, 'Business name is required')
    .max(200, 'Business name is too long')
    .optional(),

  legalName: z.string()
    .min(2, 'Legal name is required')
    .max(200, 'Legal name is too long')
    .optional(),

  slogan: z.string()
    .max(200, 'Slogan is too long')
    .optional()
    .nullable(),

  description: z.string()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description is too long')
    .optional(),

  shortDescription: z.string()
    .max(500, 'Short description is too long')
    .optional()
    .nullable(),

  phone: z.string()
    .regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number format')
    .optional(),

  email: z.string()
    .email('Invalid email address')
    .optional(),

  website: z.string()
    .url('Invalid website URL')
    .optional(),

  streetAddress: z.string()
    .min(5, 'Street address is required')
    .max(200, 'Street address is too long')
    .optional(),

  suite: z.string()
    .max(50, 'Suite is too long')
    .optional()
    .nullable(),

  city: z.string()
    .min(2, 'City is required')
    .max(100, 'City is too long')
    .optional(),

  state: z.string()
    .length(2, 'State must be 2 characters (e.g., CA)')
    .regex(/^[A-Z]{2}$/, 'State must be uppercase (e.g., CA)')
    .optional(),

  zipCode: z.string()
    .regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format')
    .optional(),

  country: z.string()
    .default('USA')
    .optional(),

  latitude: z.number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90')
    .optional()
    .nullable(),

  longitude: z.number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180')
    .optional()
    .nullable(),

  businessHours: businessHoursSchema.optional(),

  facebookUrl: z.string()
    .url('Invalid Facebook URL')
    .optional()
    .nullable(),

  instagramUrl: z.string()
    .url('Invalid Instagram URL')
    .optional()
    .nullable(),

  linkedinUrl: z.string()
    .url('Invalid LinkedIn URL')
    .optional()
    .nullable()
});

/**
 * Type exports for TypeScript
 */
export type BusinessHours = z.infer<typeof businessHoursSchema>;
export type UpdateBusinessInfoInput = z.infer<typeof updateBusinessInfoSchema>;
