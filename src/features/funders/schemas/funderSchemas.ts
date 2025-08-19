import { z } from "zod";

export const createFunderSchema = z.object({
  name: z.string().min(2).max(100),
  funderType: z.string().min(2).max(50),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
});
export type CreateFunderForm = z.infer<typeof createFunderSchema>;

export const updateFunderSchema = createFunderSchema.partial();
export type UpdateFunderForm = z.infer<typeof updateFunderSchema>;
