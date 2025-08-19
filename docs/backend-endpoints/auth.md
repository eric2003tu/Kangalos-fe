# Authentication Endpoint Documentation

This document provides detailed information about the authentication endpoints of the Kangalos backend API. It follows the same structure as `example.md` for consistency.

---

## 1. Overview

The Auth module handles user registration, login, password resets and email verification. All endpoints return data in the standard API response format described in `AGENTS.md`.

---

## 2. Prisma Model (User excerpt)

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
}
```

---

## 3. API Endpoints

### 3.1 Register
- **POST** `/auth/register`
- **Body:** `RegisterDto`
- **Description:** Create a new user account.

### 3.2 Login
- **POST** `/auth/login`
- **Body:** `LoginDto`
- **Description:** Authenticate a user and return a JWT token.

### 3.3 Forgot Password
- **POST** `/auth/forgot-password`
- **Body:** `ForgotPasswordDto`
- **Description:** Send password reset link to user email.

### 3.4 Reset Password
- **POST** `/auth/reset-password`
- **Body:** `ResetPasswordDto`
- **Description:** Update a user password using the reset token.

### 3.5 Verify Email
- **POST** `/auth/verify-email`
- **Body:** `VerifyEmailDto`
- **Description:** Confirm a user's email address.

---

## 4. TypeScript DTOs

```typescript
// src/auth/dto/register.dto/register.dto.ts
export class RegisterDto {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  userType: "ORGANISATION" | "STUDENT" | "STAFF" | "INDIVIDUAL";
}

// src/auth/dto/login.dto/login.dto.ts
export class LoginDto {
  email: string;
  password: string;
}

// src/auth/dto/forgot-password.dto/forgot-password.dto.ts
export class ForgotPasswordDto {
  email: string;
}

// src/auth/dto/reset-password.dto/reset-password.dto.ts
export class ResetPasswordDto {
  token: string;
  newPassword: string;
}

// src/auth/dto/verify-email.dto/verify-email.dto.ts
export class VerifyEmailDto {
  token: string;
}
```

---

## 5. Zod Schemas for Forms

```typescript
import { z } from "zod";

export const registerSchema = z.object({
  first_name: z.string().min(1).max(255),
  last_name: z.string().min(1).max(255),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8),
  password_confirmation: z.string().min(8),
  role: z.enum(["patient", "customer"]),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"],
});
export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export type LoginFormData = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  token: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"],
});
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const changePasswordSchema = z.object({
  current_password: z.string().min(1),
  password: z.string().min(8),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"],
});
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
```

---

## 6. Request and Response Interfaces

```typescript
export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    userType: "ORGANISATION" | "STUDENT" | "STAFF" | "INDIVIDUAL";
    isVerified: boolean;
  };
}

export type RegisterRequest = RegisterDto;
export type RegisterResponse = AuthResponse;

export type LoginRequest = LoginDto;
export type LoginResponse = AuthResponse;

export type ForgotPasswordRequest = ForgotPasswordDto;
export interface ForgotPasswordResponse {
  message: string;
}

export type ResetPasswordRequest = ResetPasswordDto;
export interface ResetPasswordResponse {
  message: string;
}

export type VerifyEmailRequest = VerifyEmailDto;
export interface VerifyEmailResponse {
  message: string;
}
```

---

## 7. Error Handling

Errors follow the standard API error structure:

```typescript
export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}
```

---

## 8. Changelog
- **2025-07-24:** Initial authentication documentation added.

