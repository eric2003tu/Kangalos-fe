import { z } from 'zod';

export const createStartupSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  projectId: z.string().uuid(),
  year: z.number().int().min(1900),
  registered: z.boolean().optional(),
});
export type CreateStartupForm = z.infer<typeof createStartupSchema>;

export const updateStartupSchema = createStartupSchema.partial();
export type UpdateStartupForm = z.infer<typeof updateStartupSchema>;
