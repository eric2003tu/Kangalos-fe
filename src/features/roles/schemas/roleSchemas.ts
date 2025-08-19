import { z } from 'zod';

export const createRoleSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  organisationUnitId: z.string().uuid().optional(),
});
export type CreateRoleForm = z.infer<typeof createRoleSchema>;

export const updateRoleSchema = createRoleSchema.partial();
export type UpdateRoleForm = z.infer<typeof updateRoleSchema>;

export const queryRoleSchema = z.object({
  organisationUnitId: z.string().uuid().optional(),
  search: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).default(10),
});
export type QueryRoleForm = z.infer<typeof queryRoleSchema>;

export const assignPermissionSchema = z.object({
  permissionId: z.string().uuid(),
});
export type AssignPermissionForm = z.infer<typeof assignPermissionSchema>;
