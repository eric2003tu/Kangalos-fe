# Organisation Unit Endpoint Documentation (Example)

This document is a comprehensive template for documenting all API endpoints and TypeScript DTOs for the Organisation Unit resource. Use this as a guide for documenting other endpoints.

---

## 1. Overview

The Organisation Unit API provides endpoints to manage hierarchical organisation units, including CRUD operations, tree/hierarchy queries, and related entities (positions, users, projects, stakeholders).

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
  // ...
}
```

---

## 3. API Endpoints

### 3.1. Create Organisation Unit

- **POST** `/organisation-unit`
- **Body:** `CreateOrganisationUnitDto`
- **Description:** Create a new organisation unit.

### 3.2. Get All Organisation Units

- **GET** `/organisation-unit`
- **Query:** `QueryOrganisationUnitDto`
- **Description:** Get all organisation units with pagination and filtering.

### 3.3. Get Organisation Units Tree

- **GET** `/organisation-unit/tree`
- **Query:** `includePositions?: boolean`
- **Description:** Get the tree structure of organisation units. Optionally include positions.

### 3.4. Get Organisation Unit by ID

- **GET** `/organisation-unit/:id`
- **Param:** `id` (UUID)
- **Description:** Get a single organisation unit by ID.

### 3.5. Patch Organisation Unit

- **PATCH** `/organisation-unit/:id`
- **Param:** `id` (UUID)
- **Body:** `UpdateOrganisationUnitDto`
- **Description:** Partially update an organisation unit.

### 3.6. Delete Organisation Unit

- **DELETE** `/organisation-unit/:id`
- **Param:** `id` (UUID)
- **Description:** Delete an organisation unit by ID.

### 3.7. Get Children of Organisation Unit

- **GET** `/organisation-unit/:id/children`
- **Param:** `id` (UUID)
- **Description:** Get child organisation units.

### 3.8. Get Parent of Organisation Unit

- **GET** `/organisation-unit/:id/parent`
- **Param:** `id` (UUID)
- **Description:** Get parent organisation unit.

### 3.9. Get Hierarchy of Organisation Unit

- **GET** `/organisation-unit/:id/hierarchy`
- **Param:** `id` (UUID)
- **Description:** Get full hierarchy (ancestors) of an organisation unit.

### 3.10. Add Child Organisation Unit

- **POST** `/organisation-unit/:id/children`
- **Param:** `id` (UUID, parent)
- **Body:** `CreateOrganisationUnitDto`
- **Description:** Add a child organisation unit to a parent.

### 3.11. Get Positions in Organisation Unit

- **GET** `/organisation-unit/:id/positions`
- **Param:** `id` (UUID)
- **Description:** Get positions in an organisation unit.

### 3.12. Get Users in Organisation Unit

- **GET** `/organisation-unit/:id/users`
- **Param:** `id` (UUID)
- **Query:** `GetOrgUnitUsersQueryDto`
- **Description:** Get users in an organisation unit.

### 3.13. Get Projects in Organisation Unit

- **GET** `/organisation-unit/:id/projects`
- **Param:** `id` (UUID)
- **Query:** `GetOrgUnitProjectsQueryDto`
- **Description:** Get projects in an organisation unit.

### 3.14. Get Stakeholders in Organisation Unit

- **GET** `/organisation-unit/:id/stakeholders`
- **Param:** `id` (UUID)
- **Query:** `GetOrgUnitStakeholdersQueryDto`
- **Description:** Get stakeholders in an organisation unit.

---

## 4. TypeScript DTOs & Query Types

### CreateOrganisationUnitDto

```typescript
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateOrganisationUnitDto {
  @ApiProperty({ description: "The name of the organisation unit", example: "Faculty of Science" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "The unique code of the organisation unit (optional)",
    example: "FS",
    required: false,
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({
    description: "The ID of the parent organisation unit (optional)",
    example: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  parentId?: string;
}
```

### UpdateOrganisationUnitDto

```typescript
import { PartialType } from "@nestjs/swagger";
import { CreateOrganisationUnitDto } from "./create-organisation-unit.dto";

export class UpdateOrganisationUnitDto extends PartialType(CreateOrganisationUnitDto) {}
```

### QueryOrganisationUnitDto

```typescript
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsIn, IsInt, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class QueryOrganisationUnitDto {
  @ApiPropertyOptional({ description: "Page number for pagination", example: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: "Number of items per page for pagination",
    example: 10,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: "Search term for filtering organisation units by name or code",
    example: "science",
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: "Field to sort by",
    example: "name",
    enum: ["name", "code", "id", "parentId"],
    default: "name",
  })
  @IsOptional()
  @IsString()
  @IsIn(["name", "code", "id", "parentId"])
  sortBy?: string = "name";

  @ApiPropertyOptional({
    description: "Sort order",
    example: "asc",
    enum: ["asc", "desc"],
    default: "asc",
  })
  @IsOptional()
  @IsString()
  @IsIn(["asc", "desc"])
  sortOrder?: string = "asc";

  @ApiPropertyOptional({
    description: "Filter by parent ID",
    example: "parent-uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  parentId?: string;

  @ApiPropertyOptional({
    description: "Include positions in the response",
    example: false,
    default: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  includePositions?: boolean = false;
}
```

### GetOrgUnitUsersQueryDto

```typescript
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";
import { QueryUserDto } from "../../users/dto/query-user.dto";

export class GetOrgUnitUsersQueryDto extends QueryUserDto {
  @ApiPropertyOptional({
    description: "Filter for current users (end date is null or in the future)",
    example: true,
    default: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  currentOnly?: boolean = false;
}
```

### QueryUserDto (used in GetOrgUnitUsersQueryDto)

```typescript
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";

export class QueryUserDto {
  @ApiPropertyOptional({
    description: "Search term (matches name, email, phone, username, or user type)",
    example: "john",
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: "Page number", example: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: "Page size", example: 10, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: "Field to sort by",
    example: "firstName",
    enum: ["firstName", "lastName", "email", "username", "userType", "id"],
    default: "firstName",
  })
  @IsOptional()
  @IsString()
  @IsIn(["firstName", "lastName", "email", "username", "userType", "id"])
  sortBy?: string = "firstName";

  @ApiPropertyOptional({
    description: "Sort order",
    example: "asc",
    enum: ["asc", "desc"],
    default: "asc",
  })
  @IsOptional()
  @IsString()
  @IsIn(["asc", "desc"])
  sortOrder?: string = "asc";
}
```

### GetOrgUnitProjectsQueryDto

```typescript
import { QueryProject } from "../../projects/dto/query-project.dto";

export class GetOrgUnitProjectsQueryDto extends QueryProject {}
```

### QueryProject (used in GetOrgUnitProjectsQueryDto)

```typescript
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsIn, IsInt, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class QueryProject {
  @ApiPropertyOptional({ description: "Page number for pagination", example: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: "Number of items per page for pagination",
    example: 10,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: "Search term for filtering project by title ,titleNorm, year ,etc ",
    example: "technology",
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: "Field to sort by",
    example: "title",
    enum: ["title", "titleNorm", "id", "organisationUnitId", "year", "submittedAt"],
    default: "title",
  })
  @IsOptional()
  @IsString()
  @IsIn(["title", "id", "organisationUnitId", "titleNorm", "year", "submittedAt"])
  sortBy?: string = "title";

  @ApiPropertyOptional({
    description: "Sort order",
    example: "asc",
    enum: ["asc", "desc"],
    default: "asc",
  })
  @IsOptional()
  @IsString()
  @IsIn(["asc", "desc"])
  sortOrder?: string = "asc";
}
```

### GetOrgUnitStakeholdersQueryDto

```typescript
import { QueryStakeholderDto } from "../../stakeholder/dto/query-stakeholder.dto";

export class GetOrgUnitStakeholdersQueryDto extends QueryStakeholderDto {}
```

### QueryStakeholderDto (used in GetOrgUnitStakeholdersQueryDto)

```typescript
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class QueryStakeholderDto {
  @ApiPropertyOptional({ description: "Page number for pagination", example: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: "Number of items per page for pagination",
    example: 10,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: "Search term for filtering stakeholders by name or code",
    example: "science",
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: "Field to sort by",
    example: "name",
    enum: ["name", "code", "id"],
    default: "name",
  })
  @IsOptional()
  @IsString()
  @IsIn(["name", "code", "id"])
  sortBy?: string = "name";

  @ApiPropertyOptional({
    description: "Sort order",
    example: "asc",
    enum: ["asc", "desc"],
    default: "asc",
  })
  @IsOptional()
  @IsString()
  @IsIn(["asc", "desc"])
  sortOrder?: string = "asc";

  @ApiPropertyOptional({
    description: "Filter by organisation unit ID",
    example: "org-unit-uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  organisationUnitId?: string;
}
```

---

## 5. Error Handling

All endpoints return errors in the following format:

```typescript
export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}
```

---

## 6. Best Practices

- Always document all endpoints and DTOs using this template.
- Keep DTOs and documentation up to date with backend changes.
- Add new endpoints and types as the API evolves.

---

## 7. Changelog

- **2025-07-24:** Initial detailed documentation example for Organisation Unit endpoint.

---

## 5. Frontend Integration Notes

- Use the provided TypeScript interfaces for type safety.
- Handle loading and error states in the UI.
- Use optimistic updates for create/update/delete actions if needed.
- Validate user input before sending requests.
- Use pagination and search parameters for large datasets.

---

## 6. DTOs Summary

```typescript
// Organisation entity
export interface Organisation {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Create
export interface CreateOrganisationRequest {
  name: string;
  description?: string;
}
export type CreateOrganisationResponse = Organisation;

// Update
export interface UpdateOrganisationRequest {
  name?: string;
  description?: string;
}
export type UpdateOrganisationResponse = Organisation;

// Delete
export interface DeleteOrganisationResponse {
  success: boolean;
  message: string;
}

// Error
export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}
```

---
