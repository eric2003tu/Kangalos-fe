# Project Evaluation Endpoint Documentation

This document provides an overview of the Project Evaluation module. It follows the same structure as `example.md` for straightforward frontend integration.

---

## 1. Overview

Project evaluations record reviewer feedback on projects. They store scores, comments and status indicators for each evaluator. The API allows creating evaluations, listing them by project or evaluator, updating records and generating summary statistics.

---

## 2. Prisma Model

```prisma
model ProjectEvaluation {
  id          String           @id @default(uuid()) @db.Uuid
  projectId   String           @map("project_id") @db.Uuid
  evaluatorId String           @map("evaluator_id") @db.Uuid
  score       Int
  comments    String?
  status      EvaluationStatus @default(PENDING)
  createdAt   DateTime         @default(now()) @map("created_at")
  updatedAt   DateTime         @updatedAt @map("updated_at")

  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  evaluator User    @relation(fields: [evaluatorId], references: [id], onDelete: Cascade)
}
```

---

## 3. API Endpoints

### 3.1 List Evaluations
- **GET** `/project-evaluations`
- **Query:** `QueryProjectEvaluationDto`
- **Description:** Retrieve evaluations with pagination and filtering.

### 3.2 Get Evaluation
- **GET** `/project-evaluations/:id`
- **Param:** `id` (UUID)
- **Description:** Fetch a single evaluation by ID.

### 3.3 Create Evaluation
- **POST** `/project-evaluations`
- **Body:** `CreateProjectEvaluationDto`
- **Description:** Create a new evaluation.

### 3.4 Update Evaluation
- **PUT** `/project-evaluations/:id`
- **Param:** `id` (UUID)
- **Body:** `UpdateProjectEvaluationDto`
- **Description:** Replace an evaluation record.

### 3.5 Delete Evaluation
- **DELETE** `/project-evaluations/:id`
- **Param:** `id` (UUID)
- **Description:** Remove an evaluation.

### 3.6 Project Evaluations
- **GET** `/projects/:id/evaluations`
- **Param:** `id` (UUID)
- **Description:** List evaluations for a project.

### 3.7 Create for Project
- **POST** `/projects/:id/evaluations`
- **Param:** `id` (UUID)
- **Body:** `CreateProjectEvaluationDto`
- **Description:** Create an evaluation linked to the project ID.

### 3.8 Evaluation Summary
- **GET** `/projects/:id/evaluations/summary`
- **Param:** `id` (UUID)
- **Description:** Get average score and pending count for a project.

### 3.9 Evaluations by Evaluator
- **GET** `/evaluators/:userId/evaluations`
- **Param:** `userId` (UUID)
- **Description:** List evaluations done by a particular user.

### 3.10 Pending Evaluations
- **GET** `/evaluations/pending`
- **Description:** Fetch all evaluations that are still pending.

---

## 4. TypeScript DTOs & Enums

```typescript
export enum EvaluationStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export class CreateProjectEvaluationDto {
  projectId: string;
  evaluatorId: string;
  score: number;
  comments?: string;
  status?: EvaluationStatus;
}

export class UpdateProjectEvaluationDto extends PartialType(CreateProjectEvaluationDto) {}

export class QueryProjectEvaluationDto {
  page?: number;
  limit?: number;
  projectId?: string;
  evaluatorId?: string;
  status?: EvaluationStatus;
}
```

---

## 5. Zod Schemas for Forms

```typescript
import { z } from 'zod';

export const createProjectEvaluationSchema = z.object({
  projectId: z.string().uuid(),
  evaluatorId: z.string().uuid(),
  score: z.number().int().min(0).max(100),
  comments: z.string().optional(),
  status: z.enum(['PENDING', 'COMPLETED']).optional(),
});
export type CreateProjectEvaluationForm = z.infer<typeof createProjectEvaluationSchema>;

export const updateProjectEvaluationSchema = createProjectEvaluationSchema.partial();
export type UpdateProjectEvaluationForm = z.infer<typeof updateProjectEvaluationSchema>;
```

---

## 6. Request and Response Interfaces

```typescript
export interface ProjectEvaluation {
  id: string;
  projectId: string;
  evaluatorId: string;
  score: number;
  comments?: string | null;
  status: 'PENDING' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectEvaluationRequest extends CreateProjectEvaluationDto {}
export type CreateProjectEvaluationResponse = ProjectEvaluation;

export interface UpdateProjectEvaluationRequest extends UpdateProjectEvaluationDto {}
export type UpdateProjectEvaluationResponse = ProjectEvaluation;

export interface QueryProjectEvaluationRequest extends QueryProjectEvaluationDto {}
export interface QueryProjectEvaluationResponse {
  data: ProjectEvaluation[];
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
- **2025-07-24:** Initial project evaluation documentation.
