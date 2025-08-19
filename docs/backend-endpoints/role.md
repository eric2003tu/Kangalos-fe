# Role Endpoint Documentation

This file documents the Role module in the Kangalos backend. It follows the structure of `example.md` for consistency.

---

## 1. Overview

Roles group permissions and are assigned to users. Endpoints allow creating roles, listing them by organisation unit, managing attached permissions and removing roles.

---

## 2. Prisma Model

```prisma
model Role {
  id                 String           @id @default(uuid()) @db.Uuid
  name               String
  description        String?
  organisationUnitId String?          @map("organisation_unit_id") @db.Uuid
  createdAt          DateTime         @default(now()) @map("created_at")
  updatedAt          DateTime         @updatedAt @map("updated_at")

  organisationUnit OrganisationUnit? @relation(fields: [organisationUnitId], references: [id], onDelete: Cascade)
  rolePermissions  RolePermission[]
  userRoles        UserRole[]

  @@unique([organisationUnitId, name])
  @@index([organisationUnitId])
  @@map("role")
}

model RolePermission {
  roleId       String   @map("role_id") @db.Uuid
  permissionId String   @map("permission_id") @db.Uuid
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  role       Role       @relation(fields: [roleId], references: [id], onDelete: Cascade)
  permission Permission @relation(fields: [permissionId], references: [id], onDelete: Cascade)

  @@id([roleId, permissionId])
  @@index([roleId])
  @@index([permissionId])
  @@map("role_permission")
}
```

---

## 3. API Endpoints

### 3.1 Create Role
- **POST** `/roles`
- **Body:** `CreateRoleDto`
- **Description:** Create a new role within an organisation unit.

### 3.2 Get All Roles
- **GET** `/roles`
- **Query:** `QueryRoleDto`
- **Description:** List roles with pagination, optional search and organisation filter.

### 3.3 Get Role by ID
- **GET** `/roles/:id`
- **Param:** `id` (UUID)
- **Description:** Retrieve a single role.

### 3.4 Update Role
- **PATCH** `/roles/:id`
- **Param:** `id` (UUID)
- **Body:** `UpdateRoleDto`
- **Description:** Partially update a role.

### 3.5 Delete Role
- **DELETE** `/roles/:id`
- **Param:** `id` (UUID)
- **Description:** Delete a role by ID.

### 3.6 Get Role Permissions
- **GET** `/roles/:id/permissions`
- **Param:** `id` (UUID)
- **Description:** List permissions assigned to a role.

### 3.7 Assign Permission to Role
- **POST** `/roles/:id/permissions`
- **Param:** `id` (UUID)
- **Body:** `AssignPermissionToRoleDto`
- **Description:** Attach a permission to a role.

### 3.8 Remove Permission from Role
- **DELETE** `/roles/:id/permissions/:permissionId`
- **Params:** `id` (role UUID), `permissionId` (UUID)
- **Description:** Detach a permission from a role.

---

## 4. TypeScript DTOs

```typescript
// src/role/dto/create-role.dto.ts
export class CreateRoleDto {
  name: string;
  description?: string;
  organisationUnitId?: string;
}

// src/role/dto/update-role.dto.ts
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}

// src/role/dto/query-role.dto.ts
export class QueryRoleDto {
  organisationUnitId?: string;
  search?: string;
  page?: number;
  limit?: number;
}

// src/role/dto/assign-permission-to-role.dto.ts
export class AssignPermissionToRoleDto {
  permissionId: string;
}
```

---

## 5. Zod Schemas for Forms

```typescript
import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  organisationUnitId: z.string().uuid().optional(),
});
export type CreateRoleForm = z.infer<typeof createRoleSchema>;

export const updateRoleSchema = createRoleSchema.partial();
export type UpdateRoleForm = z.infer<typeof updateRoleSchema>;

export const queryRoleSchema = z.object({
  organisationUnitId: z.string().uuid().optional(),
  search: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).default(10),
});
export type QueryRoleForm = z.infer<typeof queryRoleSchema>;

export const assignPermissionSchema = z.object({
  permissionId: z.string().uuid(),
});
export type AssignPermissionForm = z.infer<typeof assignPermissionSchema>;
```

---

## 6. Request and Response Interfaces

```typescript
export interface Role {
  id: string;
  name: string;
  description?: string | null;
  organisationUnitId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoleRequest extends CreateRoleDto {}
export type CreateRoleResponse = Role;

export interface UpdateRoleRequest extends UpdateRoleDto {}
export type UpdateRoleResponse = Role;

export interface RoleListResponse {
  data: Role[];
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
- **2025-07-24:** Added role documentation.
