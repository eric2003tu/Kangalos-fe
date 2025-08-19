import { z } from 'zod';

export const createStakeholderSchema = z.object({
  name: z.string().min(2).max(100),
  stakeholderType: z.string().min(2).max(50),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
});
export type CreateStakeholderForm = z.infer<typeof createStakeholderSchema>;

export const updateStakeholderSchema = createStakeholderSchema.partial();
export type UpdateStakeholderForm = z.infer<typeof updateStakeholderSchema>;

export const queryStakeholderSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).default(10),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  organisationUnitId: z.string().uuid().optional(),
});
export type QueryStakeholderForm = z.infer<typeof queryStakeholderSchema>;
