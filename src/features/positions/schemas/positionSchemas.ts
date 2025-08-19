import { z } from "zod";

export const createPositionSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  organisationUnitId: z.string().uuid(),
});
export type CreatePositionForm = z.infer<typeof createPositionSchema>;

export const updatePositionSchema = createPositionSchema.partial();
export type UpdatePositionForm = z.infer<typeof updatePositionSchema>;

export const assignUserToPositionSchema = z.object({
  userId: z.string().uuid(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
export type AssignUserToPositionForm = z.infer<typeof assignUserToPositionSchema>;

export const updateOccupancySchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  originalStartDate: z.string().optional(),
});
export type UpdateOccupancyForm = z.infer<typeof updateOccupancySchema>;
