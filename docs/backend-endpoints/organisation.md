# Organisation Unit Endpoint Documentation

This document provides a reference for all Organisation Unit endpoints in the Kangalos API. It mirrors the style of `example.md` for consistent frontend integration.

---

## 1. Overview

Organisation Units represent the hierarchical structure of the university. The API allows full CRUD operations, tree queries and fetching related entities such as positions, users, projects and stakeholders.

---

## 2. Prisma Model

```prisma
model OrganisationUnit {
  id        String    @id @default(uuid()) @db.Uuid
  parentId  String?   @map("parent_id") @db.Uuid
  name      String
  code      String?   @unique
  createdAt DateTime  @default(now()) @map("created_at")
  updatedAt DateTime  @updatedAt @map("updated_at")

  parent   OrganisationUnit?  @relation("OrganisationUnitParent", fields: [parentId], references: [id], onDelete: Cascade)
  children OrganisationUnit[] @relation("OrganisationUnitParent")
  positions    Position[]
  roles        Role[]
  projects     Project[]
  stakeholders Stakeholder[]
}
```

---

## 3. API Endpoints

### 3.1 Create Organisation Unit
- **POST** `/organisation-unit`
- **Body:** `CreateOrganisationUnitDto`
- **Description:** Create a new unit.

### 3.2 Get All Organisation Units
- **GET** `/organisation-unit`
- **Query:** `QueryOrganisationUnitDto`
- **Description:** List units with pagination and filters.

### 3.3 Get Organisation Unit Tree
- **GET** `/organisation-unit/tree`
- **Query:** `includePositions?: boolean`
- **Description:** Return the unit hierarchy.

### 3.4 Get Organisation Unit by ID
- **GET** `/organisation-unit/:id`
- **Param:** `id` (UUID)
- **Description:** Retrieve a single unit.

### 3.5 Patch Organisation Unit
- **PATCH** `/organisation-unit/:id`
- **Param:** `id` (UUID)
- **Body:** `UpdateOrganisationUnitDto`
- **Description:** Partially update a unit.

### 3.6 Delete Organisation Unit
- **DELETE** `/organisation-unit/:id`
- **Param:** `id` (UUID)
- **Description:** Remove a unit (fails if it has children).

### 3.7 Get Children of Organisation Unit
- **GET** `/organisation-unit/:id/children`
- **Param:** `id` (UUID)
- **Description:** List all child units.

### 3.8 Get Parent of Organisation Unit
- **GET** `/organisation-unit/:id/parent`
- **Param:** `id` (UUID)
- **Description:** Retrieve the parent unit.

### 3.9 Get Hierarchy of Organisation Unit
- **GET** `/organisation-unit/:id/hierarchy`
- **Param:** `id` (UUID)
- **Description:** Get full ancestral hierarchy.

### 3.10 Add Child Organisation Unit
- **POST** `/organisation-unit/:id/children`
- **Param:** `id` (UUID parent)
- **Body:** `CreateOrganisationUnitDto`
- **Description:** Create a child unit under a parent.

### 3.11 Get Positions in Organisation Unit
- **GET** `/organisation-unit/:id/positions`
- **Param:** `id` (UUID)
- **Description:** List all positions in the unit.

### 3.12 Get Users in Organisation Unit
- **GET** `/organisation-unit/:id/users`
- **Param:** `id` (UUID)
- **Query:** `GetOrgUnitUsersQueryDto`
- **Description:** List users assigned to the unit.

### 3.13 Get Projects in Organisation Unit
- **GET** `/organisation-unit/:id/projects`
- **Param:** `id` (UUID)
- **Query:** `GetOrgUnitProjectsQueryDto`
- **Description:** List projects belonging to the unit.

### 3.14 Get Stakeholders in Organisation Unit
- **GET** `/organisation-unit/:id/stakeholders`
- **Param:** `id` (UUID)
- **Query:** `GetOrgUnitStakeholdersQueryDto`
- **Description:** List stakeholders related to the unit.

---

## 4. TypeScript DTOs

```typescript
// src/organisation/dto/create-organisation-unit.dto.ts
export class CreateOrganisationUnitDto {
  name: string;
  code?: string;
  parentId?: string;
}

// src/organisation/dto/update-organisation-unit.dto.ts
export class UpdateOrganisationUnitDto extends PartialType(CreateOrganisationUnitDto) {}

// src/organisation/dto/query-organisation-unit.dto.ts
export class QueryOrganisationUnitDto {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  parentId?: string;
  includePositions?: boolean;
}

// src/organisation/dto/get-org-unit-users-query.dto.ts
export class GetOrgUnitUsersQueryDto extends QueryUserDto {
  currentOnly?: boolean;
}
```

---

## 5. Zod Schemas for Forms

```typescript
import { z } from 'zod';

export const createOrganisationUnitSchema = z.object({
  name: z.string().min(1),
  code: z.string().optional(),
  parentId: z.string().uuid().optional(),
});
export type CreateOrganisationUnitForm = z.infer<typeof createOrganisationUnitSchema>;

export const updateOrganisationUnitSchema = createOrganisationUnitSchema.partial();
export type UpdateOrganisationUnitForm = z.infer<typeof updateOrganisationUnitSchema>;
```

---

## 6. Request and Response Interfaces

```typescript
export interface OrganisationUnit {
  id: string;
  parentId?: string | null;
  name: string;
  code?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrganisationUnitRequest extends CreateOrganisationUnitDto {}
export type CreateOrganisationUnitResponse = OrganisationUnit;

export interface UpdateOrganisationUnitRequest extends UpdateOrganisationUnitDto {}
export type UpdateOrganisationUnitResponse = OrganisationUnit;

export interface QueryOrganisationUnitRequest extends QueryOrganisationUnitDto {}
export interface QueryOrganisationUnitResponse {
  data: OrganisationUnit[];
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
- **2025-07-24:** Added organisation unit documentation.
