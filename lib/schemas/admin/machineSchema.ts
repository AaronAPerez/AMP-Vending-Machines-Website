import { z } from 'zod';

/**
 * Validation schemas for vending machine data
 * Used in admin API endpoints for creating/updating machines
 */

// Feature item schema
const featureItemSchema = z.object({
  title: z.string().min(1, 'Feature title is required').max(100),
  description: z.string().min(1, 'Feature description is required').max(500),
  icon: z.string().optional()
});

// Specification item schema
const specificationItemSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  value: z.union([
    z.string(),
    z.array(z.string())
  ])
});

// Specification group schema
const specificationGroupSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  items: z.array(specificationItemSchema).min(1, 'At least one specification item is required')
});

// Dimension item schema
const dimensionItemSchema = z.object({
  label: z.string().min(1, 'Dimension label is required'),
  value: z.string().min(1, 'Dimension value is required')
});

// Related machine schema
const relatedMachineSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string()
});

/**
 * Create machine validation schema
 * All fields required for new machines
 */
export const createMachineSchema = z.object({
  slug: z.string()
    .min(5, 'Slug must be at least 5 characters')
    .max(100, 'Slug is too long')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),

  name: z.string()
    .min(5, 'Name must be at least 5 characters')
    .max(200, 'Name is too long'),

  category: z.enum(['refrigerated', 'non-refrigerated'], {
    errorMap: () => ({ message: 'Category must be either "refrigerated" or "non-refrigerated"' })
  }),

  shortDescription: z.string()
    .min(20, 'Short description must be at least 20 characters')
    .max(300, 'Short description is too long'),

  description: z.string()
    .min(100, 'Description must be at least 100 characters')
    .max(5000, 'Description is too long'),

  seoTitle: z.string()
    .max(60, 'SEO title should be 60 characters or less')
    .optional()
    .nullable(),

  metaDescription: z.string()
    .max(160, 'Meta description should be 160 characters or less')
    .optional()
    .nullable(),

  dimensions: z.array(dimensionItemSchema)
    .min(1, 'At least one dimension is required'),

  specifications: z.array(specificationGroupSchema)
    .min(1, 'At least one specification group is required'),

  features: z.array(featureItemSchema)
    .min(1, 'At least one feature is required')
    .max(20, 'Maximum 20 features allowed'),

  productOptions: z.array(z.string())
    .min(1, 'At least one product option is required'),

  bestFor: z.array(z.string())
    .min(1, 'At least one "best for" item is required'),

  highlights: z.array(z.string())
    .max(10, 'Maximum 10 highlights allowed')
    .optional()
    .nullable(),

  keywords: z.array(z.string())
    .max(50, 'Maximum 50 keywords allowed')
    .optional()
    .nullable(),

  localKeywords: z.array(z.string())
    .max(50, 'Maximum 50 local keywords allowed')
    .optional()
    .nullable(),

  businessKeywords: z.array(z.string())
    .max(50, 'Maximum 50 business keywords allowed')
    .optional()
    .nullable(),

  isActive: z.boolean().default(true),

  displayOrder: z.number().int().min(0).default(0)
});

/**
 * Update machine validation schema
 * All fields optional for updates
 */
export const updateMachineSchema = createMachineSchema.partial();

/**
 * Machine image validation schema
 */
export const machineImageSchema = z.object({
  machineId: z.string().uuid('Invalid machine ID'),
  altText: z.string()
    .min(10, 'Alt text must be at least 10 characters')
    .max(200, 'Alt text is too long'),
  displayOrder: z.number().int().min(0).default(0),
  isPrimary: z.boolean().default(false)
});

/**
 * Update machine image schema
 */
export const updateMachineImageSchema = z.object({
  altText: z.string()
    .min(10, 'Alt text must be at least 10 characters')
    .max(200, 'Alt text is too long')
    .optional(),
  displayOrder: z.number().int().min(0).optional(),
  isPrimary: z.boolean().optional()
});

/**
 * Reorder images schema
 */
export const reorderImagesSchema = z.object({
  machineId: z.string().uuid('Invalid machine ID'),
  imageOrder: z.array(z.string().uuid('Invalid image ID'))
    .min(1, 'At least one image ID required')
});

/**
 * Machine query filters schema
 */
export const machineFiltersSchema = z.object({
  category: z.enum(['refrigerated', 'non-refrigerated']).optional(),
  active: z.enum(['true', 'false']).optional(),
  search: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(50).optional(),
  offset: z.number().int().min(0).default(0).optional()
});

/**
 * Type exports for TypeScript
 */
export type CreateMachineInput = z.infer<typeof createMachineSchema>;
export type UpdateMachineInput = z.infer<typeof updateMachineSchema>;
export type MachineImageInput = z.infer<typeof machineImageSchema>;
export type UpdateMachineImageInput = z.infer<typeof updateMachineImageSchema>;
export type ReorderImagesInput = z.infer<typeof reorderImagesSchema>;
export type MachineFilters = z.infer<typeof machineFiltersSchema>;
