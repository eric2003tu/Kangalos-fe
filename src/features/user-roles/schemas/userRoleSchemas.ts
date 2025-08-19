import { z } from 'zod';

export const createUserRoleSchema = z.object({
  userId: z.string().uuid(),
  roleId: z.string().uuid(),
});
export type CreateUserRoleForm = z.infer<typeof createUserRoleSchema>;
