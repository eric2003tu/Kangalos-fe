# Project Stakeholder Endpoint Documentation

This file documents endpoints for the Project Stakeholders module, formatted after `example.md` for consistency.

---

## 1. Overview

Stakeholders represent organisations or people involved in a project. The API allows attaching stakeholders with a role, listing them and removing or updating assignments.

---

## 2. Prisma Model

```prisma
model ProjectStakeholder {
  projectId     String          @map("project_id") @db.Uuid
  stakeholderId String          @map("stakeholder_id") @db.Uuid
  role          StakeholderRole @default(BENEFICIARY)
  createdAt     DateTime        @default(now()) @map("created_at")
  updatedAt     DateTime        @updatedAt @map("updated_at")

  project     Project     @relation(fields: [projectId], references: [id], onDelete: Cascade)
  stakeholder Stakeholder @relation(fields: [stakeholderId], references: [id], onDelete: Cascade)

  @@id([projectId, stakeholderId])
}
```

---

## 3. API Endpoints

### 3.1 List Stakeholders
- **GET** `/project-stakeholders`
- **Description:** Retrieve all project stakeholder records.

### 3.2 Get Stakeholders of Project
- **GET** `/projects/:id/stakeholders`
- **Param:** `id` (UUID)
- **Description:** List stakeholders assigned to a project.

### 3.3 Add Stakeholder to Project
- **POST** `/projects/:id/stakeholders`
- **Param:** `id` (UUID)
- **Body:** `CreateProjectStakeholderDto`
- **Description:** Assign a stakeholder to a project.

### 3.4 Update Stakeholder Role
- **PUT** `/projects/:id/stakeholders/:stakeholderId`
- **Params:** `id`, `stakeholderId` (UUID)
- **Body:** `UpdateProjectStakeholderDto`
- **Description:** Change stakeholder role within the project.

### 3.5 Remove Stakeholder
- **DELETE** `/projects/:id/stakeholders/:stakeholderId`
- **Description:** Detach a stakeholder from a project.

---

## 4. TypeScript DTOs & Enums

```typescript
export enum StakeholderRole {
  OWNER = 'OWNER',
  PARTNER = 'PARTNER',
  SPONSOR = 'SPONSOR',
  REGULATOR = 'REGULATOR',
  BENEFICIARY = 'BENEFICIARY',
}

export class CreateProjectStakeholderDto {
  stakeholderId: string;
  role?: StakeholderRole;
}

export class UpdateProjectStakeholderDto extends PartialType(CreateProjectStakeholderDto) {}
```

---

## 5. Zod Schemas for Forms

```typescript
import { z } from 'zod';

export const createProjectStakeholderSchema = z.object({
  stakeholderId: z.string().uuid(),
  role: z.enum(['OWNER', 'PARTNER', 'SPONSOR', 'REGULATOR', 'BENEFICIARY']).optional(),
});
export type CreateProjectStakeholderForm = z.infer<typeof createProjectStakeholderSchema>;

export const updateProjectStakeholderSchema = createProjectStakeholderSchema.partial();
export type UpdateProjectStakeholderForm = z.infer<typeof updateProjectStakeholderSchema>;
```

---

## 6. Request and Response Interfaces

```typescript
export interface ProjectStakeholder {
  projectId: string;
  stakeholderId: string;
  role: 'OWNER' | 'PARTNER' | 'SPONSOR' | 'REGULATOR' | 'BENEFICIARY';
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectStakeholderRequest extends CreateProjectStakeholderDto {}
export type CreateProjectStakeholderResponse = ProjectStakeholder;

export interface UpdateProjectStakeholderRequest extends UpdateProjectStakeholderDto {}
export type UpdateProjectStakeholderResponse = ProjectStakeholder;
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
- **2025-07-24:** Wrote project stakeholder documentation.
