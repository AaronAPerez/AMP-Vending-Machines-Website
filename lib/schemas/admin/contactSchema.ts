import { z } from 'zod';

/**
 * Validation schemas for contact submission management
 * Used in admin API endpoints for managing contact inquiries
 */

/**
 * Contact submission status enum
 */
export const contactStatusSchema = z.enum([
  'new',
  'in_progress',
  'resolved',
  'archived'
], {
  errorMap: () => ({ message: 'Invalid contact status' })
});

/**
 * Update contact submission schema
 */
export const updateContactSchema = z.object({
  status: contactStatusSchema.optional(),

  assignedTo: z.string()
    .uuid('Invalid admin user ID')
    .optional()
    .nullable(),

  notes: z.string()
    .max(2000, 'Notes are too long')
    .optional()
    .nullable()
});

/**
 * Respond to contact schema
 */
export const respondToContactSchema = z.object({
  response: z.string()
    .min(10, 'Response must be at least 10 characters')
    .max(5000, 'Response is too long'),

  markAsResolved: z.boolean().default(false)
});

/**
 * Contact query filters schema
 */
export const contactFiltersSchema = z.object({
  status: contactStatusSchema.optional(),
  assignedTo: z.string().uuid('Invalid admin user ID').optional(),
  search: z.string().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  limit: z.number().int().min(1).max(100).default(50).optional(),
  offset: z.number().int().min(0).default(0).optional()
});

/**
 * Type exports for TypeScript
 */
export type ContactStatus = z.infer<typeof contactStatusSchema>;
export type UpdateContactInput = z.infer<typeof updateContactSchema>;
export type RespondToContactInput = z.infer<typeof respondToContactSchema>;
export type ContactFilters = z.infer<typeof contactFiltersSchema>;
