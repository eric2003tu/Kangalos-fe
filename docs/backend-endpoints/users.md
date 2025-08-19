# Users Endpoint Documentation

This document covers the Users module using the structure of `example.md`. It focuses on DTO definitions and response types for frontend integration.

---

## 1. Overview

The Users API manages application users. Endpoints provide CRUD operations, search capabilities, authentication helpers for the current user and access to user roles and positions.

---

## 2. Prisma Model (excerpt)

```prisma
model User {
  id         String   @id @default(uuid()) @db.Uuid
  firstName  String?  @map("first_name")
  lastName   String?  @map("last_name")
  username   String?  @unique
  userType   UserType @map("user_type")
  email      String?  @unique
  phone      String?  @unique
  password   String?
  isVerified Boolean  @default(false) @map("is_verified")
  createdAt  DateTime @default(now()) @map("created_at")
  updatedAt  DateTime @updatedAt @map("updated_at")

  userPositions UserPosition[]
  userRoles     UserRole[]
  projectAuthors ProjectAuthor[]
}
```

---

## 3. API Endpoints

### 3.1 Create User
- **POST** `/users`
- **Body:** `CreateUserDto`
- **Description:** Register a new user. An email to create a password is sent automatically.

### 3.2 Get Users
- **GET** `/users`
- **Query:** `SearchUserDto`
- **Description:** List users with pagination and filters.

### 3.3 Search Users
- **GET** `/users/search`
- **Query:** `SearchUserDto`
- **Description:** Alias for `/users` supporting advanced search.

### 3.4 Get Users by Type
- **GET** `/users/by-type/:userType`
- **Param:** `userType` (`STUDENT` | `STAFF` | `INDIVIDUAL` | `ORGANISATION`)
- **Query:** `SearchUserDto`
- **Description:** Filter users by type.

### 3.5 Get Users by Organisation Unit
- **GET** `/users/by-org-unit/:orgUnitId`
- **Param:** `orgUnitId` (UUID)
- **Query:** `SearchUserDto`
- **Description:** Filter users by organisation unit.

### 3.6 Get Current User
- **GET** `/users/me`
- **Headers:** `Authorization: Bearer <token>`
- **Description:** Retrieve the currently authenticated user.

### 3.7 Update Current User
- **PUT** `/users/me`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `UpdateUserDto`
- **Description:** Update the authenticated user.

### 3.8 Get User by ID
- **GET** `/users/:id`
- **Param:** `id` (UUID)
- **Description:** Retrieve a single user.

### 3.9 Update User
- **PATCH** `/users/:id`
- **Param:** `id` (UUID)
- **Body:** `UpdateUserDto`
- **Description:** Update user details.

### 3.10 Delete User
- **DELETE** `/users/:id`
- **Param:** `id` (UUID)
- **Description:** Remove a user record.

### 3.11 Get User Roles
- **GET** `/users/:id/roles`
- **Param:** `id` (UUID)
- **Description:** List roles assigned to a user.

### 3.12 Assign Role to User
- **POST** `/users/:id/roles`
- **Param:** `id` (UUID)
- **Body:** `AssignRoleToUserDto`
- **Description:** Add a role to a user.

### 3.13 Remove Role from User
- **DELETE** `/users/:id/roles/:roleId`
- **Params:** `id`, `roleId`
- **Description:** Remove a role assignment.

### 3.14 Get User Positions
- **GET** `/users/:id/positions`
- **Param:** `id` (UUID)
- **Query:** `GetUserPositionsDto`
- **Description:** Retrieve positions held by a user.

### 3.15 Get User Projects
- **GET** `/users/:id/projects`
- **Param:** `id` (UUID)
- **Description:** Retrieve projects authored by a user.

---

## 4. TypeScript DTOs

```typescript
export class CreateUserDto {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  userType: 'ORGANISATION' | 'STUDENT' | 'STAFF' | 'INDIVIDUAL';
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  password?: string;
}

export class AssignRoleToUserDto {
  roleId: string;
}

export class SearchUserDto extends QueryUserDto {
  userType?: 'STUDENT' | 'STAFF' | 'INDIVIDUAL' | 'ORGANISATION';
  organisationUnitId?: string;
}
```

---

## 5. Zod Schemas for Forms

```typescript
import { z } from 'zod';

export const createUserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  userType: z.enum(['ORGANISATION', 'STUDENT', 'STAFF', 'INDIVIDUAL']),
});
export type CreateUserForm = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUserSchema.partial().extend({
  password: z.string().min(8).optional(),
});
export type UpdateUserForm = z.infer<typeof updateUserSchema>;

export const assignRoleToUserSchema = z.object({
  roleId: z.string().uuid(),
});
export type AssignRoleToUserForm = z.infer<typeof assignRoleToUserSchema>;
```

---

## 6. Request and Response Interfaces

```typescript
export interface User {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  email?: string | null;
  phone?: string | null;
  userType: 'ORGANISATION' | 'STUDENT' | 'STAFF' | 'INDIVIDUAL';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest extends CreateUserDto {}
export type CreateUserResponse = User;

export interface UpdateUserRequest extends UpdateUserDto {}
export type UpdateUserResponse = User;

export interface SearchUserRequest extends SearchUserDto {}
export interface SearchUserResponse {
  data: User[];
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
- **2025-07-24:** Added users documentation.
