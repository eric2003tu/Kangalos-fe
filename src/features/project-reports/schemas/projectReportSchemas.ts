import { z } from "zod";

export const createProjectReportSchema = z.object({
  projectId: z.string().uuid(),
  title: z.string().min(2).max(100),
  reportingPeriod: z.string().max(50).optional(),
  content: z.string().optional(),
  fundUsage: z.number().nonnegative().optional(),
  submittedById: z.string().uuid(),
});
export type CreateProjectReportForm = z.infer<typeof createProjectReportSchema>;

export const updateProjectReportSchema = createProjectReportSchema.partial();
export type UpdateProjectReportForm = z.infer<typeof updateProjectReportSchema>;
