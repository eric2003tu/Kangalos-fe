# Funder Endpoint Documentation

This document outlines the Funder module's endpoints and TypeScript interfaces. It is formatted like `example.md` for easy reference.

---

## 1. Overview

The Funder API manages organisations or individuals providing funding for projects. It supports CRUD operations with pagination and search capabilities.

---

## 2. Prisma Model

```prisma
model Funder {
  id           String    @id @default(uuid()) @db.Uuid
  name         String    @unique
  funderType   String    @map("funder_type")
  contactEmail String?   @map("contact_email")
  contactPhone String?   @map("contact_phone")
  createdAt    DateTime  @default(now()) @map("created_at")
  updatedAt    DateTime  @updatedAt @map("updated_at")

  // Relations
  projectFunders ProjectFunder[]

  @@map("funder")
}
```

---

## 3. API Endpoints

### 3.1 Create Funder
- **POST** `/funder`
- **Body:** `CreateFunderDto`
- **Description:** Add a new funder.

### 3.2 Get All Funders
- **GET** `/funder`
- **Query:** `QueryFunderDto`
- **Description:** Retrieve funders with pagination and filtering.

### 3.3 Get Funder by ID
- **GET** `/funder/:id`
- **Param:** `id` (UUID)
- **Description:** Retrieve a single funder.

### 3.4 Update Funder
- **PUT** `/funder/:id`
- **Param:** `id` (UUID)
- **Body:** `UpdateFunderDto`
- **Description:** Update a funder record.

### 3.5 Patch Funder
- **PATCH** `/funder/:id`
- **Param:** `id` (UUID)
- **Body:** `UpdateFunderDto`
- **Description:** Partially update a funder record.

### 3.6 Delete Funder
- **DELETE** `/funder/:id`
- **Param:** `id` (UUID)
- **Description:** Delete a funder.

---

## 4. TypeScript DTOs

```typescript
// src/funder/dto/create-funder.dto.ts
export class CreateFunderDto {
  name: string;
  funderType: string;
  contactEmail?: string;
  contactPhone?: string;
}

// src/funder/dto/update-funder.dto.ts
export class UpdateFunderDto extends PartialType(CreateFunderDto) {}

// src/funder/dto/query-funder.dto.ts
export class QueryFunderDto {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
```

---

## 5. Zod Schemas for Forms

```typescript
import { z } from "zod";

export const createFunderSchema = z.object({
  name: z.string().min(2).max(100),
  funderType: z.string().min(2).max(50),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
});
export type CreateFunderForm = z.infer<typeof createFunderSchema>;

export const updateFunderSchema = createFunderSchema.partial();
export type UpdateFunderForm = z.infer<typeof updateFunderSchema>;
```

---

## 6. Request and Response Interfaces

```typescript
export interface Funder {
  id: string;
  name: string;
  funderType: string;
  contactEmail?: string | null;
  contactPhone?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFunderRequest extends CreateFunderDto {}
export type CreateFunderResponse = Funder;

export interface UpdateFunderRequest extends UpdateFunderDto {}
export type UpdateFunderResponse = Funder;

export interface QueryFunderRequest extends QueryFunderDto {}
export interface QueryFunderResponse {
  data: Funder[];
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
- **2025-07-24:** Initial funder documentation added.
