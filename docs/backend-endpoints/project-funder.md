# Project Funder Endpoint Documentation

This guide documents the Project Funder module in the same style as `example.md`.

---

## 1. Overview

Project funders link funder entities with projects along with optional funding amounts. Endpoints enable creating, updating and deleting these links as well as listing them with pagination.

---

## 2. Prisma Model

```prisma
model ProjectFunder {
  projectId String   @map("project_id") @db.Uuid
  funderId  String   @map("funder_id") @db.Uuid
  amount    Decimal? @db.Decimal(12,2)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  project Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  funder  Funder  @relation(fields: [funderId], references: [id], onDelete: Cascade)

  @@id([projectId, funderId])
}
```

---

## 3. API Endpoints

### 3.1 Create Project Funder
- **POST** `/project-funder`
- **Body:** `CreateProjectFunderDto`
- **Description:** Link a funder to a project.

### 3.2 List Project Funders
- **GET** `/project-funder`
- **Query:** `QueryProjectFunderDto`
- **Description:** Retrieve project funder records with filters.

### 3.3 Get Project Funder
- **GET** `/project-funder/:projectId/:funderId`
- **Params:** `projectId`, `funderId` (UUID)
- **Description:** Fetch a single funder link.

### 3.4 Update Project Funder
- **PATCH** `/project-funder/:projectId/:funderId`
- **Body:** `UpdateProjectFunderDto`
- **Description:** Modify funding amount or related IDs.

### 3.5 Delete Project Funder
- **DELETE** `/project-funder/:projectId/:funderId`
- **Description:** Remove the link between a project and a funder.

---

## 4. TypeScript DTOs

```typescript
export class CreateProjectFunderDto {
  projectId: string;
  funderId: string;
  amount?: number;
}

export class UpdateProjectFunderDto extends PartialType(CreateProjectFunderDto) {}

export class QueryProjectFunderDto {
  page?: number;
  limit?: number;
  projectId?: string;
  funderId?: string;
  sortBy?: string;
  sortOrder?: string;
}
```

---

## 5. Zod Schemas for Forms

```typescript
import { z } from 'zod';

export const createProjectFunderSchema = z.object({
  projectId: z.string().uuid(),
  funderId: z.string().uuid(),
  amount: z.number().nonnegative().optional(),
});
export type CreateProjectFunderForm = z.infer<typeof createProjectFunderSchema>;

export const updateProjectFunderSchema = createProjectFunderSchema.partial();
export type UpdateProjectFunderForm = z.infer<typeof updateProjectFunderSchema>;
```

---

## 6. Request and Response Interfaces

```typescript
export interface ProjectFunder {
  projectId: string;
  funderId: string;
  amount?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectFunderRequest extends CreateProjectFunderDto {}
export type CreateProjectFunderResponse = ProjectFunder;

export interface UpdateProjectFunderRequest extends UpdateProjectFunderDto {}
export type UpdateProjectFunderResponse = ProjectFunder;

export interface QueryProjectFunderRequest extends QueryProjectFunderDto {}
export interface QueryProjectFunderResponse {
  data: ProjectFunder[];
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

```typescript
export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}
```

---

## 8. Changelog
- **2025-07-24:** Added project funder documentation.
