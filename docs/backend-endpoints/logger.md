# Logger Service Documentation

This document outlines the `LoggerService`, following the conventions in `example.md`.

---

## 1. Overview

`LoggerService` wraps the Winston logger and integrates with `MailService` to send emails for critical errors. It implements Nest's `LoggerService` interface. There are **no public HTTP endpoints** for logging; the service is injected where needed.

---

## 2. Key Methods

- `log(message: string, context?: string)`
- `warn(message: string, context?: string)`
- `error(message: string, trace?: string, context?: string)`
- `debug(message: string, context?: string)`
- `verbose(message: string, context?: string)`

Critical errors trigger an email via `sendCriticalErrorEmail` when `LOGGER_TO` is configured.

---

## 3. DTO Interfaces

```typescript
export interface LogMessage {
  level: "debug" | "verbose" | "log" | "warn" | "error";
  message: string;
  context?: string;
  trace?: string;
}
```

---

## 4. Zod Schema Example

```typescript
import { z } from "zod";

export const logMessageSchema = z.object({
  level: z.enum(["debug", "verbose", "log", "warn", "error"]),
  message: z.string().min(1),
  context: z.string().optional(),
  trace: z.string().optional(),
});
```

---

## 5. Changelog
- **2025-07-24:** Initial logger documentation added.
