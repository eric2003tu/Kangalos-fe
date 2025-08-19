# User Roles Endpoint Documentation

This document explains the User Roles module, following the same layout as `example.md` for consistent frontend usage.

---

## 1. Overview

User roles connect users with roles for access control. The API lets you assign roles, list role assignments and remove them.

---

## 2. Prisma Model

```prisma
model UserRole {
  userId    String   @map("user_id") @db.Uuid
  roleId    String   @map("role_id") @db.Uuid
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  role Role @relation(fields: [roleId], references: [id], onDelete: Cascade)

  @@id([userId, roleId])
  @@index([userId])
  @@index([roleId])
  @@map("user_role")
}
```

---

## 3. API Endpoints

### 3.1 Assign Role
- **POST** `/user-roles`
- **Body:** `CreateUserRoleDto`
- **Description:** Attach a role to a user.

### 3.2 Get All Assignments
- **GET** `/user-roles`
- **Query:** `GetUserRolesDto`
- **Description:** List user-role assignments.

### 3.3 Get Roles for User
- **GET** `/user-roles/user/:userId`
- **Param:** `userId` (UUID)
- **Query:** `GetUserRolesDto`
- **Description:** List roles assigned to a user.

### 3.4 Get Users for Role
- **GET** `/user-roles/role/:roleId`
- **Param:** `roleId` (UUID)
- **Query:** `GetUserRolesDto`
- **Description:** List users that have a specific role.

### 3.5 Remove Role
- **DELETE** `/user-roles/:userId/:roleId`
- **Params:** `userId`, `roleId`
- **Description:** Remove a role from a user.

---

## 4. TypeScript DTOs

```typescript
export class CreateUserRoleDto {
  userId: string;
  roleId: string;
}

export class GetUserRolesDto {
  userId?: string;
  roleId?: string;
  search?: string;
  sortBy?: 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
```

---

## 5. Zod Schemas for Forms

```typescript
import { z } from 'zod';

export const createUserRoleSchema = z.object({
  userId: z.string().uuid(),
  roleId: z.string().uuid(),
});
export type CreateUserRoleForm = z.infer<typeof createUserRoleSchema>;
```

---

## 6. Request and Response Interfaces

```typescript
export interface UserRole {
  userId: string;
  roleId: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
  };
  role?: {
    id: string;
    name: string;
    organisationUnitId?: string | null;
  };
}

export interface CreateUserRoleRequest extends CreateUserRoleDto {}
export type CreateUserRoleResponse = UserRole;

export interface GetUserRolesRequest extends GetUserRolesDto {}
export interface GetUserRolesResponse {
  data: UserRole[];
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
- **2025-07-24:** Added user-roles documentation.
