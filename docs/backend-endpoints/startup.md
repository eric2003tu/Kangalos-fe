# Startup Endpoint Documentation

This file documents the Startup module following the format of `example.md` for easy frontend integration.

---

## 1. Overview

Startups are commercial spin-offs created from projects. The API allows creating, listing, updating and deleting startups as well as fetching by project or year.

---

## 2. Prisma Model

```prisma
model Startup {
  id          String   @id @default(uuid()) @db.Uuid
  projectId   String   @unique @map("project_id") @db.Uuid
  name        String
  description String?
  year        Int
  registered  Boolean  @default(false)
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  // Relations
  project Project @relation(fields: [projectId], references: [id], onDelete: Cascade)

  @@index([projectId])
  @@map("startup")
}
```

---

## 3. API Endpoints

### 3.1 Create Startup
- **POST** `/startups`
- **Body:** `CreateStartupDto`
- **Description:** Register a new startup.

### 3.2 List Startups
- **GET** `/startups`
- **Query:** `QueryStartupDto`
- **Description:** Get paginated list of startups.

### 3.3 Get Startup by ID
- **GET** `/startups/:id`
- **Param:** `id` (UUID)
- **Description:** Retrieve a single startup.

### 3.4 Update Startup
- **PUT** `/startups/:id`
- **Param:** `id` (UUID)
- **Body:** `UpdateStartupDto`
- **Description:** Update startup details.

### 3.5 Delete Startup
- **DELETE** `/startups/:id`
- **Param:** `id` (UUID)
- **Description:** Remove a startup.

### 3.6 Get Startup by Project
- **GET** `/startups/by-project/:projectId`
- **Param:** `projectId` (UUID)
- **Description:** Fetch the startup linked to a project.

### 3.7 Get Registered Startups
- **GET** `/startups/registered`
- **Description:** List only registered startups.

### 3.8 Get Startups by Year
- **GET** `/startups/by-year/:year`
- **Param:** `year` (number)
- **Description:** List startups created in a given year.

---

## 4. TypeScript DTOs

```typescript
export class CreateStartupDto {
  name: string;
  description?: string;
  projectId: string;
  year: number;
  registered?: boolean;
}

export class UpdateStartupDto extends PartialType(CreateStartupDto) {}

export class QueryStartupDto {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'name' | 'year' | 'registered' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  projectId?: string;
  registered?: boolean;
  year?: number;
}
```

---

## 5. Zod Schemas for Forms

```typescript
import { z } from 'zod';

export const createStartupSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  projectId: z.string().uuid(),
  year: z.number().int().min(1900),
  registered: z.boolean().optional(),
});
export type CreateStartupForm = z.infer<typeof createStartupSchema>;

export const updateStartupSchema = createStartupSchema.partial();
export type UpdateStartupForm = z.infer<typeof updateStartupSchema>;
```

---

## 6. Request and Response Interfaces

```typescript
export interface Startup {
  id: string;
  projectId: string;
  name: string;
  description?: string | null;
  year: number;
  registered: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStartupRequest extends CreateStartupDto {}
export type CreateStartupResponse = Startup;

export interface UpdateStartupRequest extends UpdateStartupDto {}
export type UpdateStartupResponse = Startup;

export interface QueryStartupRequest extends QueryStartupDto {}
export interface QueryStartupResponse {
  data: Startup[];
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
- **2025-07-24:** Added startup documentation.
