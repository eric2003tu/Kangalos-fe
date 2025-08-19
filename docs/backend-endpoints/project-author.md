# Project Author Endpoint Documentation

This document details the Project Author module using the same format as `example.md` for quick frontend reference.

---

## 1. Overview

Project authors link users to projects with specific roles such as lead, co-author or supervisor. Endpoints allow managing these links.

---

## 2. Prisma Model

```prisma
model ProjectAuthor {
  id        String     @id @default(uuid()) @db.Uuid
  projectId String     @map("project_id") @db.Uuid
  userId    String     @map("user_id") @db.Uuid
  role      AuthorRole @default(CO_AUTHOR)
  createdAt DateTime   @default(now()) @map("created_at")
  updatedAt DateTime   @updatedAt @map("updated_at")

  project Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([projectId, userId])
  @@index([projectId])
  @@index([userId])
}
```

---

## 3. API Endpoints

### 3.1 Create Project Author
- **POST** `/project-author`
- **Body:** `CreateProjectAuthorDto`
- **Description:** Add an author to a project.

### 3.2 Get All Project Authors
- **GET** `/project-author`
- **Description:** List all project authors.

### 3.3 Get Project Author by ID
- **GET** `/project-author/:id`
- **Param:** `id` (UUID)
- **Description:** Retrieve a project author.

### 3.4 Update Project Author
- **PATCH** `/project-author/:id`
- **Param:** `id` (UUID)
- **Body:** `UpdateProjectAuthorDto`
- **Description:** Modify author details.

### 3.5 Delete Project Author
- **DELETE** `/project-author/:id`
- **Param:** `id` (UUID)
- **Description:** Remove an author from a project.

---

## 4. TypeScript DTOs

```typescript
// src/project-author/dto/create-project-author.dto.ts
export enum AuthorRole {
  LEAD = 'LEAD',
  CO_AUTHOR = 'CO_AUTHOR',
  SUPERVISOR = 'SUPERVISOR',
}

export class CreateProjectAuthorDto {
  projectId: string;
  userId: string;
  role?: AuthorRole;
}

// src/project-author/dto/update-project-author.dto.ts
export class UpdateProjectAuthorDto extends PartialType(CreateProjectAuthorDto) {}
```

---

## 5. Zod Schemas for Forms

```typescript
import { z } from 'zod';

export const createProjectAuthorSchema = z.object({
  projectId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.enum(['LEAD', 'CO_AUTHOR', 'SUPERVISOR']).optional(),
});
export type CreateProjectAuthorForm = z.infer<typeof createProjectAuthorSchema>;

export const updateProjectAuthorSchema = createProjectAuthorSchema.partial();
export type UpdateProjectAuthorForm = z.infer<typeof updateProjectAuthorSchema>;
```

---

## 6. Request and Response Interfaces

```typescript
export interface ProjectAuthor {
  id: string;
  projectId: string;
  userId: string;
  role: 'LEAD' | 'CO_AUTHOR' | 'SUPERVISOR';
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectAuthorRequest extends CreateProjectAuthorDto {}
export type CreateProjectAuthorResponse = ProjectAuthor;

export interface UpdateProjectAuthorRequest extends UpdateProjectAuthorDto {}
export type UpdateProjectAuthorResponse = ProjectAuthor;
```

---

## 7. Error Handling

```typescript
export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}
```

---

## 8. Changelog
- **2025-07-24:** Added project author documentation.
