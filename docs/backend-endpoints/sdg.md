# SDG Endpoint Documentation

This page describes the Sustainable Development Goal (SDG) module. It mirrors the formatting of `example.md` for clarity.

---

## 1. Overview

SDGs provide a way to classify projects according to the UN Sustainable Development Goals. Endpoints let you link projects to SDGs and query statistics about coverage.

---

## 2. Prisma Model

```prisma
model Sdg {
  id          String     @id @default(uuid()) @db.Uuid
  number      Int        @unique
  title       String
  description String?
  createdAt   DateTime   @default(now()) @map("created_at")
  updatedAt   DateTime   @updatedAt @map("updated_at")

  projectSdgs ProjectSdg[]

  @@index([number])
  @@map("sdg")
}

model ProjectSdg {
  projectId String   @map("project_id") @db.Uuid
  sdgId     String   @map("sdg_id") @db.Uuid
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  project Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  sdg     Sdg     @relation(fields: [sdgId], references: [id], onDelete: Cascade)

  @@id([projectId, sdgId])
  @@index([projectId])
  @@index([sdgId])
  @@map("project_sdg")
}
```

---

## 3. API Endpoints

### 3.1 List Project-SDG Links
- **GET** `/project-sdgs`
- **Description:** Get all links between projects and SDGs.

### 3.2 Get SDGs for a Project
- **GET** `/projects/:id/sdgs`
- **Param:** `id` (project UUID)
- **Description:** Retrieve SDGs associated with a specific project.

### 3.3 Add SDG to Project
- **POST** `/projects/:id/sdgs`
- **Param:** `id` (project UUID)
- **Body:** `CreateProjectSdgDto`
- **Description:** Link an SDG to a project.

### 3.4 Remove SDG from Project
- **DELETE** `/projects/:id/sdgs/:sdg`
- **Params:** `id` (project UUID), `sdg` (SDG UUID)
- **Description:** Unlink an SDG from a project.

### 3.5 Get Projects by SDG
- **GET** `/sdgs/projects/:sdg`
- **Param:** `sdg` (SDG UUID)
- **Description:** List projects connected to a particular SDG.

### 3.6 SDG Statistics
- **GET** `/sdgs/statistics`
- **Description:** Return statistics about SDG usage across all projects.

### 3.7 SDG Coverage
- **GET** `/sdgs/coverage`
- **Description:** Return coverage percentages for each SDG.

---

## 4. TypeScript DTOs

```typescript
// src/sdg/dto/create-project-sdg.dto.ts
export class CreateProjectSdgDto {
  sdgId: string;
}
```

---

## 5. Zod Schemas for Forms

```typescript
import { z } from "zod";

export const createProjectSdgSchema = z.object({
  sdgId: z.string().uuid(),
});
export type CreateProjectSdgForm = z.infer<typeof createProjectSdgSchema>;
```

---

## 6. Request and Response Interfaces

```typescript
export interface ProjectSdg {
  projectId: string;
  sdgId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectSdgRequest extends CreateProjectSdgDto {}
export type CreateProjectSdgResponse = ProjectSdg;
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
- **2025-07-24:** Added SDG documentation.
