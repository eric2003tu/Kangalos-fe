export interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  userType: "ORGANISATION" | "STUDENT" | "STAFF" | "INDIVIDUAL";
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  userType: "ORGANISATION" | "STUDENT" | "STAFF" | "INDIVIDUAL";
  isVerified: boolean;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface VerifyEmailResponse {
  message: string;
}

export type RegisterResponse = AuthResponse;
export type LoginResponse = AuthResponse;
