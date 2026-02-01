import { z } from 'zod';

/**
 * Validation schemas for service area data
 * Used in admin API endpoints for creating/updating service areas
 */

/**
 * Service area type enum
 */
export const serviceAreaTypeSchema = z.enum([
  'incorporated',
  'unincorporated'
], {
  errorMap: () => ({ message: 'Type must be either "incorporated" or "unincorporated"' })
});

/**
 * Create service area validation schema
 */
export const createServiceAreaSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),

  slug: z.string()
    .min(2, 'Slug must be at least 2 characters')
    .max(100, 'Slug is too long')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),

  county: z.string()
    .min(2, 'County name is required')
    .max(100, 'County name is too long'),

  type: serviceAreaTypeSchema,

  latitude: z.number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),

  longitude: z.number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180'),

  population: z.number()
    .int('Population must be a whole number')
    .min(0, 'Population cannot be negative')
    .optional()
    .nullable(),

  seoPriority: z.number()
    .min(0, 'SEO priority must be between 0 and 1')
    .max(1, 'SEO priority must be between 0 and 1')
    .default(0.7),

  keywords: z.array(z.string())
    .max(50, 'Maximum 50 keywords allowed')
    .optional()
    .nullable(),

  description: z.string()
    .max(500, 'Description is too long')
    .optional()
    .nullable(),

  isActive: z.boolean().default(true)
});

/**
 * Update service area validation schema
 */
export const updateServiceAreaSchema = createServiceAreaSchema.partial();

/**
 * Service area query filters schema
 */
export const serviceAreaFiltersSchema = z.object({
  county: z.string().optional(),
  type: serviceAreaTypeSchema.optional(),
  active: z.enum(['true', 'false']).optional(),
  search: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(50).optional(),
  offset: z.number().int().min(0).default(0).optional()
});

/**
 * Type exports for TypeScript
 */
export type ServiceAreaType = z.infer<typeof serviceAreaTypeSchema>;
export type CreateServiceAreaInput = z.infer<typeof createServiceAreaSchema>;
export type UpdateServiceAreaInput = z.infer<typeof updateServiceAreaSchema>;
export type ServiceAreaFilters = z.infer<typeof serviceAreaFiltersSchema>;
