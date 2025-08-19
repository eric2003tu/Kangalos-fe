import { z } from "zod";

export const createAttachmentSchema = z.object({
  projectId: z.string().uuid().optional(),
  uploaderId: z.string().uuid(),
  filename: z.string().min(1),
  url: z.string().url(),
  fileType: z.string().optional(),
  fileSize: z.number().int().nonnegative().optional(),
  metadata: z.record(z.any()).optional(),
});
export type CreateAttachmentForm = z.infer<typeof createAttachmentSchema>;

export const updateAttachmentSchema = createAttachmentSchema.partial();
export type UpdateAttachmentForm = z.infer<typeof updateAttachmentSchema>;
