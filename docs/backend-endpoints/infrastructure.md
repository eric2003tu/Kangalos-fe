# Infrastructure Service Documentation

This page documents the `InfrastructureService` utilities used throughout the backend. The style mirrors `example.md` for easy reference.

---

## 1. Overview

`InfrastructureService` provides helper methods for checking record existence, preventing duplicates and generating pagination metadata. It is imported by other services and has **no public HTTP endpoints** of its own.

---

## 2. Key Methods

### 2.1 checkRecordExists
- **Parameters:** `(model: string, id: string)`
- **Returns:** The found record or throws `NotFoundException`.

### 2.2 checkDuplicate
- **Parameters:** `(model: string, fields: { property: string; value: any }[])`
- **Returns:** `void` or throws `ConflictException` if a record matches.

### 2.3 generatePaginationMeta
- **Parameters:** `(total: number, page: number, limit: number, baseUrl: string)`
- **Returns:** Pagination metadata object.

```typescript
export interface PaginationMeta {
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
}
```

---

## 3. Zod Schemas

```typescript
import { z } from "zod";

export const idParamSchema = z.string().uuid();
export const paginationQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).default(10),
});
```

---

## 4. Changelog
- **2025-07-24:** Initial documentation for infrastructure utilities.
