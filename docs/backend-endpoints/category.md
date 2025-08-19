# Category Endpoint Documentation

This document describes the Category module endpoints and related DTOs. It mirrors the style of `example.md` for consistency.

---

## 1. Overview

The Category API manages hierarchical categories used to organise projects. It allows CRUD operations, retrieving parent/child relationships and generating a tree structure.

---

## 2. Prisma Model

```prisma
model Category {
  id          String     @id @default(uuid()) @db.Uuid
  parentId    String?    @map("parent_id") @db.Uuid
  name        String
  description String?
  createdAt   DateTime   @default(now()) @map("created_at")
  updatedAt   DateTime   @updatedAt @map("updated_at")

  // Self-referential relationship
  parent   Category?  @relation("CategoryParent", fields: [parentId], references: [id], onDelete: Cascade)
  children Category[] @relation("CategoryParent")

  // Relations
  projectCategories ProjectCategory[]

  @@unique([parentId, name])
  @@index([parentId])
  @@map("category")
}
```

---

## 3. API Endpoints

### 3.1 Get All Categories
- **GET** `/categories`
- **Description:** Retrieve all categories.

### 3.2 Get Category Tree
- **GET** `/categories/tree`
- **Description:** Return the full category tree structure.

### 3.3 Get Category by ID
- **GET** `/categories/:id`
- **Param:** `id` (UUID)
- **Description:** Retrieve a single category.

### 3.4 Create Category
- **POST** `/categories`
- **Body:** `CreateCategoryDto`
- **Description:** Create a new category.

### 3.5 Update Category
- **PUT** `/categories/:id`
- **Param:** `id` (UUID)
- **Body:** `UpdateCategoryDto`
- **Description:** Update a category.

### 3.6 Delete Category
- **DELETE** `/categories/:id`
- **Param:** `id` (UUID)
- **Description:** Delete a category.

### 3.7 Get Children of Category
- **GET** `/categories/:id/children`
- **Param:** `id` (UUID)
- **Description:** List child categories.

### 3.8 Get Parent of Category
- **GET** `/categories/:id/parent`
- **Param:** `id` (UUID)
- **Description:** Retrieve the parent category (if any).

### 3.9 Create Child Category
- **POST** `/categories/:id/children`
- **Param:** `id` (UUID, parent category)
- **Body:** `CreateCategoryDto`
- **Description:** Add a child category under a parent.

---

## 4. TypeScript DTOs

```typescript
// src/category/dto/create-category.dto.ts
export class CreateCategoryDto {
  name: string;
  description?: string;
  parentId?: string;
}

// src/category/dto/update-category.dto.ts
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
```

---

## 5. Zod Schemas for Forms

```typescript
import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  parentId: z.string().uuid().optional(),
});
export type CreateCategoryForm = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = createCategorySchema.partial();
export type UpdateCategoryForm = z.infer<typeof updateCategorySchema>;
```

---

## 6. Request and Response Interfaces

```typescript
export interface Category {
  id: string;
  parentId?: string | null;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest extends CreateCategoryDto {}
export type CreateCategoryResponse = Category;

export interface UpdateCategoryRequest extends UpdateCategoryDto {}
export type UpdateCategoryResponse = Category;

export interface CategoryListResponse {
  data: Category[];
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
- **2025-07-24:** Initial category documentation added.
