import { z } from "zod";

export const createPermissionSchema = z.object({
  code: z.string().min(1),
  description: z.string().optional(),
});
export type CreatePermissionForm = z.infer<typeof createPermissionSchema>;

export const updatePermissionSchema = createPermissionSchema.partial();
export type UpdatePermissionForm = z.infer<typeof updatePermissionSchema>;
