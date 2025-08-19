# Stakeholder Endpoint Documentation

This document covers the Stakeholder module following the format used in `example.md`.

---

## 1. Overview

Stakeholders represent organisations or individuals involved in projects. Endpoints provide CRUD operations and utilities to query by type or organisation unit.

---

## 2. Prisma Model

```prisma
model Stakeholder {
  id              String  @id @default(uuid()) @db.Uuid
  name            String
  stakeholderType String  @map("stakeholder_type")
  contactEmail    String? @map("contact_email")
  contactPhone    String? @map("contact_phone")
  organisationUnitId String? @map("organisation_unit_id") @db.Uuid
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")

  organisationUnit  OrganisationUnit? @relation(fields: [organisationUnitId], references: [id], onDelete: SetNull)
  stakeholderUsers  StakeholderUser[]
  projectStakeholders ProjectStakeholder[]

  @@index([organisationUnitId])
  @@map("stakeholder")
}
```

---

## 3. API Endpoints

### 3.1 Create Stakeholder
- **POST** `/stakeholder`
- **Body:** `CreateStakeholderDto`
- **Description:** Add a new stakeholder.

### 3.2 Get All Stakeholders
- **GET** `/stakeholder`
- **Query:** `QueryStakeholderDto`
- **Description:** List stakeholders with pagination and search.

### 3.3 Get Stakeholders by Type
- **GET** `/stakeholder/by-type/:stakeholderType`
- **Param:** `stakeholderType` (string)
- **Description:** Filter stakeholders by type.

### 3.4 Get Stakeholders by Organisation Unit
- **GET** `/stakeholder/by-org-unit/:orgUnitId`
- **Param:** `orgUnitId` (UUID)
- **Description:** List stakeholders linked to an organisation unit.

### 3.5 Get Projects for Stakeholder
- **GET** `/stakeholder/:id/projects`
- **Param:** `id` (UUID)
- **Description:** Retrieve projects associated with a stakeholder.

### 3.6 Get Stakeholder by ID
- **GET** `/stakeholder/:id`
- **Param:** `id` (UUID)
- **Description:** Retrieve stakeholder details.

### 3.7 Update Stakeholder
- **PUT** `/stakeholder/:id`
- **Param:** `id` (UUID)
- **Body:** `UpdateStakeholderDto`
- **Description:** Update a stakeholder completely.

### 3.8 Patch Stakeholder
- **PATCH** `/stakeholder/:id`
- **Param:** `id` (UUID)
- **Body:** `UpdateStakeholderDto`
- **Description:** Partially update a stakeholder.

### 3.9 Delete Stakeholder
- **DELETE** `/stakeholder/:id`
- **Param:** `id` (UUID)
- **Description:** Delete a stakeholder.

---

## 4. TypeScript DTOs

```typescript
// src/stakeholder/dto/create-stakeholder.dto.ts
export class CreateStakeholderDto {
  name: string;
  stakeholderType: string;
  contactEmail?: string;
  contactPhone?: string;
}

// src/stakeholder/dto/update-stakeholder.dto.ts
export class UpdateStakeholderDto extends PartialType(CreateStakeholderDto) {}

// src/stakeholder/dto/query-stakeholder.dto.ts
export class QueryStakeholderDto {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  organisationUnitId?: string;
}
```

---

## 5. Zod Schemas for Forms

```typescript
import { z } from "zod";

export const createStakeholderSchema = z.object({
  name: z.string().min(2).max(100),
  stakeholderType: z.string().min(2).max(50),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
});
export type CreateStakeholderForm = z.infer<typeof createStakeholderSchema>;

export const updateStakeholderSchema = createStakeholderSchema.partial();
export type UpdateStakeholderForm = z.infer<typeof updateStakeholderSchema>;

export const queryStakeholderSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).default(10),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  organisationUnitId: z.string().uuid().optional(),
});
export type QueryStakeholderForm = z.infer<typeof queryStakeholderSchema>;
```

---

## 6. Request and Response Interfaces

```typescript
export interface Stakeholder {
  id: string;
  name: string;
  stakeholderType: string;
  contactEmail?: string | null;
  contactPhone?: string | null;
  organisationUnitId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStakeholderRequest extends CreateStakeholderDto {}
export type CreateStakeholderResponse = Stakeholder;

export interface UpdateStakeholderRequest extends UpdateStakeholderDto {}
export type UpdateStakeholderResponse = Stakeholder;

export interface StakeholderListResponse {
  data: Stakeholder[];
  meta: Record<string, any>;
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
- **2025-07-24:** Added stakeholder documentation.
