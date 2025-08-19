import { z } from "zod";

export const createProjectStakeholderSchema = z.object({
  stakeholderId: z.string().uuid(),
  role: z
    .enum(["OWNER", "PARTNER", "SPONSOR", "REGULATOR", "BENEFICIARY"])
    .optional(),
});
export type CreateProjectStakeholderForm = z.infer<typeof createProjectStakeholderSchema>;

export const updateProjectStakeholderSchema = createProjectStakeholderSchema.partial();
export type UpdateProjectStakeholderForm = z.infer<typeof updateProjectStakeholderSchema>;
