import { z } from 'zod';

/**
 * Validation schemas for SEO settings
 * Used in admin API endpoints for managing SEO metadata
 */

/**
 * Create/Update SEO settings validation schema
 */
export const seoSettingsSchema = z.object({
  pagePath: z.string()
    .min(1, 'Page path is required')
    .max(200, 'Page path is too long')
    .regex(/^\//, 'Page path must start with /')
    .optional(), // Optional for updates

  title: z.string()
    .max(60, 'Title should be 60 characters or less for optimal SEO')
    .optional()
    .nullable(),

  metaDescription: z.string()
    .max(160, 'Meta description should be 160 characters or less for optimal SEO')
    .optional()
    .nullable(),

  ogTitle: z.string()
    .max(60, 'OG title should be 60 characters or less')
    .optional()
    .nullable(),

  ogDescription: z.string()
    .max(200, 'OG description should be 200 characters or less')
    .optional()
    .nullable(),

  ogImage: z.string()
    .url('Invalid OG image URL')
    .optional()
    .nullable(),

  keywords: z.array(z.string())
    .max(50, 'Maximum 50 keywords allowed')
    .optional()
    .nullable(),

  structuredData: z.record(z.any())
    .optional()
    .nullable()
});

/**
 * Create SEO settings (requires pagePath)
 */
export const createSeoSettingsSchema = seoSettingsSchema.extend({
  pagePath: z.string()
    .min(1, 'Page path is required')
    .max(200, 'Page path is too long')
    .regex(/^\//, 'Page path must start with /')
});

/**
 * Update SEO settings (pagePath optional, determined by route param)
 */
export const updateSeoSettingsSchema = seoSettingsSchema;

/**
 * SEO query filters schema
 */
export const seoFiltersSchema = z.object({
  search: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(50).optional(),
  offset: z.number().int().min(0).default(0).optional()
});

/**
 * Type exports for TypeScript
 */
export type SeoSettings = z.infer<typeof seoSettingsSchema>;
export type CreateSeoSettingsInput = z.infer<typeof createSeoSettingsSchema>;
export type UpdateSeoSettingsInput = z.infer<typeof updateSeoSettingsSchema>;
export type SeoFilters = z.infer<typeof seoFiltersSchema>;
