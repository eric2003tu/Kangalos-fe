# User Positions Endpoint Documentation

This documentation outlines the User Positions module. It mirrors `example.md` so frontend developers can easily integrate.

---

## 1. Overview

User positions link users to positions over time, tracking start and end dates. Endpoints manage assignments and allow queries by user or position.

---

## 2. Prisma Model

```prisma
model UserPosition {
  userId     String    @map("user_id") @db.Uuid
  positionId String    @map("position_id") @db.Uuid
  startDate  DateTime  @default(now()) @map("start_date")
  endDate    DateTime? @map("end_date")
  createdAt  DateTime  @default(now()) @map("created_at")
  updatedAt  DateTime  @updatedAt @map("updated_at")

  // Relations
  user     User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  position Position @relation(fields: [positionId], references: [id], onDelete: Cascade)

  @@id([userId, positionId, startDate])
  @@index([userId])
  @@index([positionId])
  @@map("user_position")
}
```

---

## 3. API Endpoints

### 3.1 Create Assignment
- **POST** `/user-positions`
- **Body:** `CreateUserPositionDto`
- **Description:** Assign a user to a position.

### 3.2 Get All Assignments
- **GET** `/user-positions`
- **Query:** `GetUserPositionsDto`
- **Description:** List assignments with pagination and filters.

### 3.3 Get Positions for User
- **GET** `/user-positions/user/:userId`
- **Param:** `userId` (UUID)
- **Query:** `GetUserPositionsDto`
- **Description:** List assignments for a specific user.

### 3.4 Get Users for Position
- **GET** `/user-positions/position/:positionId`
- **Param:** `positionId` (UUID)
- **Query:** `GetUserPositionsDto`
- **Description:** List users occupying a position.

### 3.5 Update Assignment
- **PATCH** `/user-positions/:userId/:positionId/:startDate`
- **Params:** `userId`, `positionId`, `startDate`
- **Body:** `UpdateUserPositionDto`
- **Description:** Update assignment dates.

### 3.6 Update Assignment (Query Form)
- **PUT** `/user-positions/:userId/:positionId`
- **Params:** `userId`, `positionId`
- **Query:** `startDate` (ISO string)
- **Body:** `UpdateUserPositionDto`
- **Description:** Update assignment using start date query parameter.

### 3.7 Delete Assignment
- **DELETE** `/user-positions/:userId/:positionId/:startDate`
- **Params:** `userId`, `positionId`, `startDate`
- **Description:** Remove an assignment.

### 3.8 Delete Assignment (Query Form)
- **DELETE** `/user-positions/:userId/:positionId`
- **Params:** `userId`, `positionId`
- **Query:** `startDate` (ISO string)
- **Description:** Remove an assignment using query parameter.

---

## 4. TypeScript DTOs

```typescript
export class CreateUserPositionDto {
  userId: string;
  positionId: string;
  startDate?: string;
  endDate?: string;
}

export class UpdateUserPositionDto extends PartialType(CreateUserPositionDto) {}

export class GetUserPositionsDto {
  userId?: string;
  positionId?: string;
  currentOnly?: boolean;
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'startDate' | 'endDate';
  sortOrder?: 'asc' | 'desc';
}
```

---

## 5. Zod Schemas for Forms

```typescript
import { z } from 'zod';

export const createUserPositionSchema = z.object({
  userId: z.string().uuid(),
  positionId: z.string().uuid(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});
export type CreateUserPositionForm = z.infer<typeof createUserPositionSchema>;

export const updateUserPositionSchema = createUserPositionSchema.partial();
export type UpdateUserPositionForm = z.infer<typeof updateUserPositionSchema>;
```

---

## 6. Request and Response Interfaces

```typescript
export interface UserPosition {
  userId: string;
  positionId: string;
  startDate: string;
  endDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserPositionRequest extends CreateUserPositionDto {}
export type CreateUserPositionResponse = UserPosition;

export interface UpdateUserPositionRequest extends UpdateUserPositionDto {}
export type UpdateUserPositionResponse = UserPosition;

export interface GetUserPositionsRequest extends GetUserPositionsDto {}
export interface GetUserPositionsResponse {
  data: UserPosition[];
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
- **2025-07-24:** Added user-positions documentation.
