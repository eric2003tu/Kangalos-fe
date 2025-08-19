import { z } from 'zod';

export const createUserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  userType: z.enum(['ORGANISATION', 'STUDENT', 'STAFF', 'INDIVIDUAL']),
});
export type CreateUserForm = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUserSchema.partial().extend({
  password: z.string().min(8).optional(),
});
export type UpdateUserForm = z.infer<typeof updateUserSchema>;

export const assignRoleToUserSchema = z.object({
  roleId: z.string().uuid(),
});
export type AssignRoleToUserForm = z.infer<typeof assignRoleToUserSchema>;
