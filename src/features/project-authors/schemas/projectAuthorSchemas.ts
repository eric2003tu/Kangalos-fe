import { z } from "zod";

export const createProjectAuthorSchema = z.object({
  projectId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.enum(["LEAD", "CO_AUTHOR", "SUPERVISOR"]).optional(),
});
export type CreateProjectAuthorForm = z.infer<typeof createProjectAuthorSchema>;

export const updateProjectAuthorSchema = createProjectAuthorSchema.partial();
export type UpdateProjectAuthorForm = z.infer<typeof updateProjectAuthorSchema>;
