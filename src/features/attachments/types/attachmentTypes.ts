export interface Attachment {
  id: string;
  projectId?: string | null;
  uploaderId: string;
  filename: string;
  url: string;
  fileType?: string | null;
  fileSize?: number | null;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAttachmentRequest {
  projectId?: string;
  uploaderId: string;
  filename: string;
  url: string;
  fileType?: string;
  fileSize?: number;
  metadata?: Record<string, unknown>;
}
export type CreateAttachmentResponse = Attachment;

export interface UpdateAttachmentRequest {
  projectId?: string;
  uploaderId?: string;
  filename?: string;
  url?: string;
  fileType?: string;
  fileSize?: number;
  metadata?: Record<string, unknown>;
}
export type UpdateAttachmentResponse = Attachment;

export interface QueryAttachmentsRequest {
  page?: number;
  limit?: number;
  search?: string;
  projectId?: string;
  uploaderId?: string;
}

export interface QueryAttachmentsResponse {
  data: Attachment[];
  meta: {
    pagination: {
      total: number;
      count: number;
      perPage: number;
      currentPage: number;
      totalPages: number;
      links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
      };
    };
  };
}
