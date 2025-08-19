# Projects Endpoint Documentation

This section describes the main Projects module for the API. It mirrors the formatting of `example.md` for easy frontend consumption.

---

## 1. Overview

Projects are the core entity of the system representing research or innovation initiatives. Endpoints allow creation, searching, updating and deletion of projects.

---

## 2. Prisma Model

```prisma
model Project {
  id                 String        @id @default(uuid()) @db.Uuid
  title              String
  titleNorm          String        @map("title_norm")
  abstract           String?
  projectType        String        @map("project_type")
  year               Int
  status             ProjectStatus @default(PENDING)
  submittedAt        DateTime      @default(now()) @map("submitted_at")
  innovationField    String?       @map("innovation_field")
  expectedIp         IpType?       @map("expected_ip")
  progressPercent    Decimal?      @db.Decimal(5,2) @map("progress_percent")
  organisationUnitId String        @map("organisation_unit_id") @db.Uuid
  createdAt          DateTime      @default(now()) @map("created_at")
  updatedAt          DateTime      @updatedAt @map("updated_at")
}
```

---

## 3. API Endpoints

### 3.1 Create Project
- **POST** `/projects/project`
- **Body:** `createProjectDto`
- **Description:** Create a new project record.

### 3.2 List Projects
- **GET** `/projects`
- **Query:** `QueryProject`
- **Description:** Retrieve projects with pagination, search and sorting.

### 3.3 Search Projects
- **GET** `/projects/search`
- **Query:** `QueryProject`
- **Description:** Alias of list endpoint allowing advanced searches.

### 3.4 Get Project
- **GET** `/projects/:id`
- **Param:** `id` (UUID)
- **Description:** Fetch project details by ID.

### 3.5 Update Project
- **PATCH** `/projects/:id`
- **Body:** `UpdateProjectDto`
- **Description:** Update a project's attributes.

### 3.6 Delete Project
- **DELETE** `/projects/:id`
- **Description:** Remove a project from the system.

---

## 4. TypeScript DTOs & Enums

```typescript
export enum ProjectStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  FUNDED = 'FUNDED',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
}

export enum IpType {
  PATENT = 'PATENT',
  UTILITY_MODEL = 'UTILITY_MODEL',
  COPYRIGHT = 'COPYRIGHT',
  TRADEMARK = 'TRADEMARK',
  NONE = 'NONE',
}

export class createProjectDto {
  title: string;
  titleNorm: string;
  projectType: string;
  year: number;
  organisationUnitId: string;
  abstract?: string;
  innovationField?: string;
  expectedIp?: IpType;
  progressPercent?: number;
  status?: ProjectStatus;
  submittedAt?: string;
}

export class UpdateProjectDto extends PartialType(createProjectDto) {}

export class QueryProject {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  organisationUnitId?: string;
  status?: ProjectStatus;
  year?: number;
  projectType?: string;
  authorId?: string;
}
```

---

## 5. Zod Schemas for Forms

```typescript
import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(1),
  titleNorm: z.string().min(1),
  projectType: z.string().min(1),
  year: z.number().int(),
  organisationUnitId: z.string().uuid(),
  abstract: z.string().optional(),
  innovationField: z.string().optional(),
  expectedIp: z.enum(['PATENT', 'UTILITY_MODEL', 'COPYRIGHT', 'TRADEMARK', 'NONE']).optional(),
  progressPercent: z.number().min(0).max(100).optional(),
  status: z.enum(['PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'FUNDED', 'COMPLETED', 'ARCHIVED']).optional(),
  submittedAt: z.string().optional(),
});
export type CreateProjectForm = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = createProjectSchema.partial();
export type UpdateProjectForm = z.infer<typeof updateProjectSchema>;
```

---

## 6. Request and Response Interfaces

```typescript
export interface Project {
  id: string;
  title: string;
  titleNorm: string;
  abstract?: string | null;
  projectType: string;
  year: number;
  status: ProjectStatus;
  submittedAt: string;
  innovationField?: string | null;
  expectedIp?: IpType | null;
  progressPercent?: number | null;
  organisationUnitId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest extends createProjectDto {}
export type CreateProjectResponse = Project;

export interface UpdateProjectRequest extends UpdateProjectDto {}
export type UpdateProjectResponse = Project;

export interface QueryProjectRequest extends QueryProject {}
export interface QueryProjectResponse {
  data: Project[];
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
- **2025-07-24:** Added projects endpoint documentation.
