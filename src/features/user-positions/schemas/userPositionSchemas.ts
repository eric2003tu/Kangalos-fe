import { z } from 'zod';

export const createUserPositionSchema = z.object({
  userId: z.string().uuid(),
  positionId: z.string().uuid(),
  startDate: z.string().date().optional(), // Changed from datetime() to date()
  endDate: z.string().date().optional(),   // Changed from datetime() to date()
});
export type CreateUserPositionForm = z.infer<typeof createUserPositionSchema>;

export const updateUserPositionSchema = createUserPositionSchema.partial();
export type UpdateUserPositionForm = z.infer<typeof updateUserPositionSchema>;
