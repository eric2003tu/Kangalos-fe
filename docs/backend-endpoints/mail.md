# Mail Service Documentation

Documentation for the `MailService`, formatted like `example.md` for easy frontend integration.

---

## 1. Overview

The `MailService` uses `@nestjs-modules/mailer` to send templated emails. It handles welcome messages, password resets, verification emails and critical error notifications. There are **no public HTTP endpoints** for this service; it is used internally by other modules.

---

## 2. Mail Options Interface

```typescript
export interface MailOptions {
  to: string | string[];
  subject: string;
  template: string;
  context?: Record<string, any>;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    content?: any;
    path?: string;
    contentType?: string;
    cid?: string;
  }>;
}
```

Common helper methods wrap this interface: `sendWelcomeEmail`, `sendPasswordReset`, `sendEmailVerification`, `sendCreatePassword` and `sendCriticalErrorEmail`.

---

## 3. Zod Schemas

```typescript
import { z } from "zod";

export const mailOptionsSchema = z.object({
  to: z.union([z.string(), z.array(z.string())]),
  subject: z.string().min(1),
  template: z.string().min(1),
  context: z.record(z.any()).optional(),
  cc: z.union([z.string(), z.array(z.string())]).optional(),
  bcc: z.union([z.string(), z.array(z.string())]).optional(),
  attachments: z
    .array(
      z.object({
        filename: z.string(),
        content: z.any().optional(),
        path: z.string().optional(),
        contentType: z.string().optional(),
        cid: z.string().optional(),
      })
    )
    .optional(),
});
```

---

## 4. Changelog
- **2025-07-24:** Initial mail service documentation added.
