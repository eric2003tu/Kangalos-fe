# Position Endpoint Documentation

This document describes the Position module endpoints and DTOs, formatted according to `example.md` for smooth frontend work.

---

## 1. Overview

Positions define jobs within organisation units. Users can be assigned to positions with time ranges. The API exposes CRUD operations and occupancy management.

---

## 2. Prisma Model

```prisma
model Position {
  id                 String           @id @default(uuid()) @db.Uuid
  organisationUnitId String           @map("organisation_unit_id") @db.Uuid
  title              String
  description        String?
  createdAt          DateTime         @default(now()) @map("created_at")
  updatedAt          DateTime         @updatedAt @map("updated_at")

  organisationUnit OrganisationUnit @relation(fields: [organisationUnitId], references: [id], onDelete: Cascade)
  userPositions    UserPosition[]
}
```

---

## 3. API Endpoints

### 3.1 Create Position
- **POST** `/positions`
- **Body:** `CreatePositionDto`
- **Description:** Create a new job position.

### 3.2 Get All Positions
- **GET** `/positions`
- **Query:** `QueryPositionDto`
- **Description:** List positions with pagination and filters.

### 3.3 Get Position by ID
- **GET** `/positions/:id`
- **Param:** `id` (UUID)
- **Description:** Retrieve a single position.

### 3.4 Patch Position
- **PATCH** `/positions/:id`
- **Param:** `id` (UUID)
- **Body:** `UpdatePositionDto`
- **Description:** Partially update a position.

### 3.5 Update Position
- **PUT** `/positions/:id`
- **Param:** `id` (UUID)
- **Body:** `UpdatePositionDto`
- **Description:** Fully update a position record.

### 3.6 Delete Position
- **DELETE** `/positions/:id`
- **Param:** `id` (UUID)
- **Description:** Remove a position.

### 3.7 Get Occupants
- **GET** `/positions/:id/occupants`
- **Param:** `id` (UUID)
- **Query:** `GetPositionOccupantsDto`
- **Description:** List users assigned to the position.

### 3.8 Assign User to Position
- **POST** `/positions/:id/occupants`
- **Param:** `id` (UUID)
- **Body:** `AssignUserToPositionDto`
- **Description:** Assign a user to this position.

### 3.9 Update Occupancy
- **PUT** `/positions/:id/occupants/:userId`
- **Params:** `id` (UUID), `userId` (UUID)
- **Body:** `UpdatePositionOccupancyDto`
- **Description:** Edit an existing assignment.

### 3.10 Remove Occupancy
- **DELETE** `/positions/:id/occupants/:userId`
- **Params:** `id` (UUID), `userId` (UUID)
- **Description:** Remove a user from the position.

---

## 4. TypeScript DTOs

```typescript
// src/position/dto/create-position.dto.ts
export class CreatePositionDto {
  title: string;
  description?: string;
  organisationUnitId: string;
}

// src/position/dto/update-position.dto.ts
export class UpdatePositionDto extends PartialType(CreatePositionDto) {}

// src/position/dto/query-position.dto.ts
export class QueryPositionDto {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  organisationUnitId?: string;
}

// src/position/dto/assign-user-to-position.dto.ts
export class AssignUserToPositionDto {
  userId: string;
  startDate?: string;
  endDate?: string;
}

// src/position/dto/update-position-occupancy.dto.ts
export class UpdatePositionOccupancyDto {
  startDate?: string;
  endDate?: string;
  originalStartDate?: string;
}

// src/position/dto/get-position-occupants.dto.ts
export class GetPositionOccupantsDto extends QueryUserDto {
  currentOnly?: boolean;
}
```

---

## 5. Zod Schemas for Forms

```typescript
import { z } from 'zod';

export const createPositionSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  organisationUnitId: z.string().uuid(),
});
export type CreatePositionForm = z.infer<typeof createPositionSchema>;

export const updatePositionSchema = createPositionSchema.partial();
export type UpdatePositionForm = z.infer<typeof updatePositionSchema>;

export const assignUserToPositionSchema = z.object({
  userId: z.string().uuid(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
export type AssignUserToPositionForm = z.infer<typeof assignUserToPositionSchema>;

export const updateOccupancySchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  originalStartDate: z.string().optional(),
});
export type UpdateOccupancyForm = z.infer<typeof updateOccupancySchema>;
```

---

## 6. Request and Response Interfaces

```typescript
export interface Position {
  id: string;
  organisationUnitId: string;
  title: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePositionRequest extends CreatePositionDto {}
export type CreatePositionResponse = Position;

export interface UpdatePositionRequest extends UpdatePositionDto {}
export type UpdatePositionResponse = Position;

export interface QueryPositionRequest extends QueryPositionDto {}
export interface QueryPositionResponse {
  data: Position[];
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
- **2025-07-24:** Added position documentation.
