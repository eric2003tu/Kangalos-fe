import { z } from "zod";

export const createOrganisationUnitSchema = z.object({
  name: z.string().min(1),
  code: z.string().optional(),
  parentId: z.string().uuid().optional(),
});
export type CreateOrganisationUnitForm = z.infer<typeof createOrganisationUnitSchema>;

export const updateOrganisationUnitSchema = createOrganisationUnitSchema.partial();
export type UpdateOrganisationUnitForm = z.infer<typeof updateOrganisationUnitSchema>;
