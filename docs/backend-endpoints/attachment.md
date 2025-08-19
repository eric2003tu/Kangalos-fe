# Attachment Endpoint Documentation

This document details the endpoints, DTOs, and frontend integration notes for the Attachment module. It follows the template in `example.md`.

---

## 1. Overview

The Attachment API manages file uploads associated with projects and provides metadata retrieval. Endpoints allow creating, listing, updating and deleting attachments, as well as fetching download URLs and metadata.

---

## 2. Prisma Model

```prisma
model Attachment {
  id         String   @id @default(uuid()) @db.Uuid
  projectId  String?  @map("project_id") @db.Uuid
  uploaderId String   @map("uploader_id") @db.Uuid
  filename   String
  url        String
  fileType   String?  @map("file_type")
  fileSize   Int?     @map("file_size")
  metadata   Json?
  createdAt  DateTime @default(now()) @map("created_at")
  updatedAt  DateTime @updatedAt @map("updated_at")

  project  Project? @relation(fields: [projectId], references: [id], onDelete: Cascade)
  uploader User     @relation("UserAttachments", fields: [uploaderId], references: [id], onDelete: Cascade)

  @@index([projectId])
  @@index([uploaderId])
  @@map("attachment")
}
```

---

## 3. API Endpoints

### 3.1 Create Attachment
- **POST** `/attachments`
- **Body:** `CreateAttachmentDto`
- **Description:** Upload a new attachment.

### 3.2 Get All Attachments
- **GET** `/attachments`
- **Query:** `QueryAttachmentDto`
- **Description:** Retrieve attachments with pagination and filters.

### 3.3 Get Attachment by ID
- **GET** `/attachments/:id`
- **Param:** `id` (UUID)
- **Description:** Retrieve a single attachment.

### 3.4 Update Attachment
- **PUT** `/attachments/:id`
- **Param:** `id` (UUID)
- **Body:** `UpdateAttachmentDto`
- **Description:** Update attachment details.

### 3.5 Delete Attachment
- **DELETE** `/attachments/:id`
- **Param:** `id` (UUID)
- **Description:** Remove an attachment.

### 3.6 Get Download URL
- **GET** `/attachments/:id/download`
- **Param:** `id` (UUID)
- **Description:** Get a direct download URL for the file.

### 3.7 Get Attachment Metadata
- **GET** `/attachments/:id/metadata`
- **Param:** `id` (UUID)
- **Description:** Retrieve attachment metadata.

### 3.8 Attachments by Project
- **GET** `/attachments/by-project/:projectId`
- **Param:** `projectId` (UUID)
- **Description:** List attachments for a specific project.

### 3.9 Attachments by Uploader
- **GET** `/attachments/by-uploader/:userId`
- **Param:** `userId` (UUID)
- **Description:** List attachments uploaded by a user.

---

## 4. TypeScript DTOs

```typescript
// src/attachment/dto/create-attachment.dto.ts
export class CreateAttachmentDto {
  projectId?: string; // optional project ID
  uploaderId: string; // ID of the uploading user
  filename: string;   // original file name
  url: string;        // storage URL
  fileType?: string;  // MIME type
  fileSize?: number;  // size in bytes
  metadata?: Record<string, any>; // arbitrary metadata
}

// src/attachment/dto/update-attachment.dto.ts
export class UpdateAttachmentDto extends PartialType(CreateAttachmentDto) {}

// src/attachment/dto/query-attachment.dto.ts
export class QueryAttachmentDto {
  page?: number;
  limit?: number;
  search?: string;
  projectId?: string;
  uploaderId?: string;
}
```

---

## 5. Zod Schemas for Forms

```typescript
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
```

---

## 6. Request and Response Interfaces

```typescript
export interface Attachment {
  id: string;
  projectId?: string | null;
  uploaderId: string;
  filename: string;
  url: string;
  fileType?: string | null;
  fileSize?: number | null;
  metadata?: Record<string, any> | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAttachmentRequest extends CreateAttachmentDto {}
export type CreateAttachmentResponse = Attachment;

export interface UpdateAttachmentRequest extends UpdateAttachmentDto {}
export type UpdateAttachmentResponse = Attachment;

export interface QueryAttachmentsRequest extends QueryAttachmentDto {}
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
```

---

## 7. Error Handling

Errors follow the standard API error structure:

```typescript
export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}
```

---

## 8. Changelog
- **2025-07-24:** Initial attachment documentation added.
