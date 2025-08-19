# Shared Module Documentation

This file summarises the utilities found in the `shared` module. It follows the formatting of `example.md`.

---

## 1. Overview

The `shared` module contains reusable helpers like pipes and encryption utilities. It exposes **no HTTP endpoints** but is imported by many other modules.

---

## 2. Key Components

### 2.1 UuidValidationPipe

Validates UUID route parameters.

```typescript
import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class UuidValidationPipe implements PipeTransform<string> {
  transform(value: string): string {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new BadRequestException(`Invalid UUID format: ${value}`);
    }
    return value;
  }
}
```

### 2.2 TokenEncryptionUtil

Encrypts and decrypts short tokens using AES.

```typescript
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as crypto from "crypto";

@Injectable()
export class TokenEncryptionUtil {
  private readonly algorithm = "aes-256-cbc";
  private readonly key: Buffer;

  constructor(private readonly configService: ConfigService) {
    const secret = this.configService.get<string>("JWT_SECRET");
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    this.key = crypto.createHash("sha256").update(String(secret)).digest();
  }

  encrypt(token: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    let encrypted = cipher.update(token, "utf8", "hex");
    encrypted += cipher.final("hex");
    const combined = `${iv.toString("hex")}:${encrypted}`;
    return Buffer.from(combined).toString("base64url");
  }

  decrypt(encryptedToken: string): string {
    const combined = Buffer.from(encryptedToken, "base64url").toString("utf8");
    const [ivHex, encrypted] = combined.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }
}
```

---

## 3. Zod Schemas

```typescript
import { z } from "zod";

export const uuidParamSchema = z.string().uuid();
```

---

## 4. Changelog
- **2025-07-24:** Added shared module documentation.
