# Project Report Endpoint Documentation

Documentation for the Project Report module following the pattern in `example.md`.

---

## 1. Overview

Project reports capture periodic updates about a project including funds used and narrative content. The API lets clients create, fetch, update and delete reports as well as query by submitter or reporting period.

---

## 2. Prisma Model

```prisma
model ProjectReport {
  id              String   @id @default(uuid()) @db.Uuid
  projectId       String   @map("project_id") @db.Uuid
  title           String
  reportingPeriod String?  @map("reporting_period")
  content         String?
  fundUsage       Decimal? @db.Decimal(12,2) @map("fund_usage")
  submittedAt     DateTime @default(now()) @map("submitted_at")
  submittedById   String   @map("submitted_by_id") @db.Uuid
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")

  project     Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  submittedBy User    @relation(fields: [submittedById], references: [id], onDelete: Cascade)
}
```

---

## 3. API Endpoints

### 3.1 Create Report
- **POST** `/project-reports`
- **Body:** `CreateProjectReportDto`
- **Description:** Create a new report record.

### 3.2 List Reports
- **GET** `/project-reports`
- **Query:** `QueryProjectReportDto`
- **Description:** Retrieve all reports with pagination and search.

### 3.3 Get Report
- **GET** `/project-reports/:id`
- **Param:** `id` (UUID)
- **Description:** Fetch a single report by ID.

### 3.4 Reports by Project
- **GET** `/project-reports/project/:projectId`
- **Param:** `projectId` (UUID)
- **Description:** List reports belonging to a project.

### 3.5 Update Report
- **PUT** `/project-reports/:id`
- **Body:** `UpdateProjectReportDto`
- **Description:** Update a report.

### 3.6 Patch Report
- **PATCH** `/project-reports/:id`
- **Description:** Partially update a report.

### 3.7 Delete Report
- **DELETE** `/project-reports/:id`
- **Description:** Remove a report.

### 3.8 Create for Project
- **POST** `/projects/:id/reports`
- **Body:** `CreateProjectReportWithoutProjectIdDto`
- **Description:** Shortcut to create a report for a given project.

### 3.9 Latest Project Report
- **GET** `/projects/:id/reports/latest`
- **Description:** Get the most recent report for a project.

### 3.10 Reports Summary
- **GET** `/projects/:id/reports/summary`
- **Description:** Summary metrics about reports for a project.

### 3.11 Reports by Submitter
- **GET** `/reports/by-submitter/:userId`
- **Param:** `userId` (UUID)
- **Description:** List reports submitted by a specific user.

### 3.12 Reports by Period
- **GET** `/reports/by-period/:period`
- **Description:** List reports for a reporting period.

### 3.13 Pending Reports
- **GET** `/reports/pending`
- **Description:** Reports awaiting review or approval.

---

## 4. TypeScript DTOs

```typescript
export class CreateProjectReportDto {
  projectId: string;
  title: string;
  reportingPeriod?: string;
  content?: string;
  fundUsage?: number;
  submittedById: string;
}

export class CreateProjectReportWithoutProjectIdDto extends OmitType(CreateProjectReportDto, ['projectId'] as const) {}

export class UpdateProjectReportDto extends PartialType(CreateProjectReportDto) {}

export class QueryProjectReportDto {
  page?: number;
  limit?: number;
  search?: string;
  projectId?: string;
  reportingPeriod?: string;
  sortBy?: string;
  sortOrder?: string;
}
```

---

## 5. Zod Schemas for Forms

```typescript
import { z } from 'zod';

export const createProjectReportSchema = z.object({
  projectId: z.string().uuid(),
  title: z.string().min(2).max(100),
  reportingPeriod: z.string().max(50).optional(),
  content: z.string().optional(),
  fundUsage: z.number().nonnegative().optional(),
  submittedById: z.string().uuid(),
});
export type CreateProjectReportForm = z.infer<typeof createProjectReportSchema>;

export const updateProjectReportSchema = createProjectReportSchema.partial();
export type UpdateProjectReportForm = z.infer<typeof updateProjectReportSchema>;
```

---

## 6. Request and Response Interfaces

```typescript
export interface ProjectReport {
  id: string;
  projectId: string;
  title: string;
  reportingPeriod?: string | null;
  content?: string | null;
  fundUsage?: number | null;
  submittedAt: string;
  submittedById: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectReportRequest extends CreateProjectReportDto {}
export type CreateProjectReportResponse = ProjectReport;

export interface UpdateProjectReportRequest extends UpdateProjectReportDto {}
export type UpdateProjectReportResponse = ProjectReport;

export interface QueryProjectReportRequest extends QueryProjectReportDto {}
export interface QueryProjectReportResponse {
  data: ProjectReport[];
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
- **2025-07-24:** Documented project report endpoints.
