# Generated Module Documentation

This document describes the auto-generated Prisma client used in the Kangalos backend. It follows the format of `example.md` for consistency.

---

## 1. Overview

The `generated` folder contains the Prisma client which is created after running `npm run prisma:generate`. This client provides strongly typed access to the database models.

The generated client **does not expose any HTTP endpoints**. It is consumed by services (e.g., `PrismaService`) to perform database operations.

---

## 2. Usage Example

```typescript
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function listProjects() {
  return prisma.project.findMany({ take: 10 });
}
```

---

## 3. Zod Schema Example

While the Prisma client itself requires no form data, you can validate identifiers before querying:

```typescript
import { z } from "zod";

export const idSchema = z.string().uuid();
```

---

## 4. Changelog
- **2025-07-24:** Initial documentation for the generated Prisma client.
