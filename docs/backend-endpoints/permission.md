# Permission Endpoint Documentation

This file documents the Permission module following `example.md` for consistency and easy frontend integration.

---

## 1. Overview

Permissions represent discrete actions that can be granted to roles. The API supports CRUD operations and simple pagination.

---

## 2. Prisma Model

```prisma
model Permission {
  id          String   @id @default(uuid()) @db.Uuid
  code        String   @unique
  description String?
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  rolePermissions RolePermission[]
}
```

---

## 3. API Endpoints

### 3.1 Create Permission
- **POST** `/permissions`
- **Body:** `CreatePermissionDto`
- **Description:** Add a new permission.

### 3.2 Get All Permissions
- **GET** `/permissions`
- **Query:** `QueryPermissionDto`
- **Description:** List permissions with pagination and search.

### 3.3 Get Permission by ID
- **GET** `/permissions/:id`
- **Param:** `id` (UUID)
- **Description:** Retrieve a permission.

### 3.4 Update Permission
- **PATCH** `/permissions/:id`
- **Param:** `id` (UUID)
- **Body:** `UpdatePermissionDto`
- **Description:** Modify a permission.

### 3.5 Delete Permission
- **DELETE** `/permissions/:id`
- **Param:** `id` (UUID)
- **Description:** Remove a permission.

---

## 4. TypeScript DTOs

```typescript
// src/permission/dto/create-permission.dto.ts
export class CreatePermissionDto {
  code: string;
  description?: string;
}

// src/permission/dto/update-permission.dto.ts
export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}

// src/permission/dto/query-permission.dto.ts
export class QueryPermissionDto {
  search?: string;
  page?: number;
  limit?: number;
}
```

---

## 5. Zod Schemas for Forms

```typescript
import { z } from 'zod';

export const createPermissionSchema = z.object({
  code: z.string().min(1),
  description: z.string().optional(),
});
export type CreatePermissionForm = z.infer<typeof createPermissionSchema>;

export const updatePermissionSchema = createPermissionSchema.partial();
export type UpdatePermissionForm = z.infer<typeof updatePermissionSchema>;
```

---

## 6. Request and Response Interfaces

```typescript
export interface Permission {
  id: string;
  code: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePermissionRequest extends CreatePermissionDto {}
export type CreatePermissionResponse = Permission;

export interface UpdatePermissionRequest extends UpdatePermissionDto {}
export type UpdatePermissionResponse = Permission;

export interface QueryPermissionRequest extends QueryPermissionDto {}
export interface QueryPermissionResponse {
  data: Permission[];
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
- **2025-07-24:** Added permission documentation.
