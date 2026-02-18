import { z } from 'zod';

/**
 * Validation schemas for product data
 * Used in admin API endpoints for creating/updating products
 */

/**
 * Product category enum
 */
export const productCategorySchema = z.enum([
  'chips',
  'candy',
  'protein',
  'pastries',
  'nuts',
  'snacks',
  'beverages',
  'energy',
  'healthy'
], {
  errorMap: () => ({ message: 'Invalid product category' })
});

/**
 * Create product validation schema
 */
export const createProductSchema = z.object({
  slug: z.string()
    .min(2, 'Slug must be at least 2 characters')
    .max(100, 'Slug is too long')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),

  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),

  category: productCategorySchema,

  imagePath: z.string()
    .optional()
    .nullable(),

  imageUrl: z.string()
    .url('Invalid image URL')
    .optional()
    .nullable(),

  isPopular: z.boolean().default(false),

  isHealthy: z.boolean().default(false),

  details: z.string()
    .max(500, 'Details are too long')
    .optional()
    .nullable(),

  isActive: z.boolean().default(true),

  displayOrder: z.number().int().min(0).default(0)
});

/**
 * Update product validation schema
 */
export const updateProductSchema = createProductSchema.partial();

/**
 * Bulk update products schema
 */
export const bulkUpdateProductsSchema = z.object({
  products: z.array(
    z.object({
      id: z.string().uuid('Invalid product ID'),
      displayOrder: z.number().int().min(0).optional(),
      isActive: z.boolean().optional(),
      isPopular: z.boolean().optional(),
      isHealthy: z.boolean().optional()
    })
  ).min(1, 'At least one product required')
});

/**
 * Product query filters schema
 */
export const productFiltersSchema = z.object({
  category: productCategorySchema.optional(),
  active: z.enum(['true', 'false']).optional(),
  popular: z.enum(['true', 'false']).optional(),
  healthy: z.enum(['true', 'false']).optional(),
  search: z.string().optional(),
  limit: z.number().int().min(1).max(200).default(100).optional(),
  offset: z.number().int().min(0).default(0).optional()
});

/**
 * Type exports for TypeScript
 */
export type ProductCategory = z.infer<typeof productCategorySchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type BulkUpdateProductsInput = z.infer<typeof bulkUpdateProductsSchema>;
export type ProductFilters = z.infer<typeof productFiltersSchema>;
