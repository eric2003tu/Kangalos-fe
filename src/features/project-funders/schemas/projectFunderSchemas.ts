import { z } from "zod";

export const createProjectFunderSchema = z.object({
  projectId: z.string().uuid(),
  funderId: z.string().uuid(),
  amount: z.number().nonnegative().optional(),
});
export type CreateProjectFunderForm = z.infer<typeof createProjectFunderSchema>;

export const updateProjectFunderSchema = createProjectFunderSchema.partial();
export type UpdateProjectFunderForm = z.infer<typeof updateProjectFunderSchema>;
