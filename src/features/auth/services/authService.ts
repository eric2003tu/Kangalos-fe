import apiClient from "@/lib/axiosConfig";
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from "../types/authTypes";

export const register = async (
  payload: RegisterRequest,
): Promise<RegisterResponse> => {
  const response = await apiClient.post("/auth/register", payload);
  return response.data;
};

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post("/auth/login", payload);
  return response.data;
};

export const forgotPassword = async (
  payload: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> => {
  const response = await apiClient.post("/auth/forgot-password", payload);
  return response.data;
};

export const resetPassword = async (
  payload: ResetPasswordRequest,
): Promise<ResetPasswordResponse> => {
  const response = await apiClient.post("/auth/reset-password", payload);
  return response.data;
};

export const verifyEmail = async (
  payload: VerifyEmailRequest,
): Promise<VerifyEmailResponse> => {
  const response = await apiClient.post("/auth/verify-email", payload);
  return response.data;
};
