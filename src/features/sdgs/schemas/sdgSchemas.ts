import { z } from 'zod';

export const createProjectSdgSchema = z.object({
  sdgId: z.string().uuid(),
});
export type CreateProjectSdgForm = z.infer<typeof createProjectSdgSchema>;
