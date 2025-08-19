import { z } from "zod";

export const createProjectEvaluationSchema = z.object({
  projectId: z.string().uuid(),
  evaluatorId: z.string().uuid(),
  score: z.number().int().min(0).max(100),
  comments: z.string().optional(),
  status: z.enum(["PENDING", "COMPLETED"]).optional(),
});
export type CreateProjectEvaluationForm = z.infer<typeof createProjectEvaluationSchema>;

export const updateProjectEvaluationSchema = createProjectEvaluationSchema.partial();
export type UpdateProjectEvaluationForm = z.infer<typeof updateProjectEvaluationSchema>;
