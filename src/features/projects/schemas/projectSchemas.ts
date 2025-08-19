import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(1),
  titleNorm: z.string().min(1),
  projectType: z.string().min(1),
  year: z.number().int(),
  organisationUnitId: z.string().uuid(),
  abstract: z.string().optional(),
  innovationField: z.string().optional(),
  expectedIp: z
    .enum(['PATENT', 'UTILITY_MODEL', 'COPYRIGHT', 'TRADEMARK', 'NONE'])
    .optional(),
  progressPercent: z.number().min(0).max(100).optional(),
  status: z
    .enum([
      'PENDING',
      'UNDER_REVIEW',
      'APPROVED',
      'REJECTED',
      'FUNDED',
      'COMPLETED',
      'ARCHIVED',
    ])
    .optional(),
  submittedAt: z.string().optional(),
});
export type CreateProjectForm = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = createProjectSchema.partial();
export type UpdateProjectForm = z.infer<typeof updateProjectSchema>;
