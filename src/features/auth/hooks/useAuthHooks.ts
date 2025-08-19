import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  register,
  forgotPassword,
  resetPassword,
  verifyEmail,
} from "../services/authService";
import { signIn } from "next-auth/react";
import type {
  RegisterRequest,
  LoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
  ForgotPasswordResponse,
  ResetPasswordResponse,
  VerifyEmailResponse,
} from "../types/authTypes";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
    onSuccess: () => {
      toast.success("Registered successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to register");
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (res?.error) {
        throw new Error(res.error);
      }
      return res;
    },
    onSuccess: () => {
      toast.success("Logged in successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to log in");
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => forgotPassword(data),
    onSuccess: (data: ForgotPasswordResponse) => {
      toast.success(data.message || "Password reset email sent");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to send password reset email");
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => resetPassword(data),
    onSuccess: (data: ResetPasswordResponse) => {
      toast.success(data.message || "Password has been reset successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to reset password");
    },
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (data: VerifyEmailRequest) => verifyEmail(data),
    onSuccess: (data: VerifyEmailResponse) => {
      toast.success(data.message || "Email verified successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to verify email");
    },
  });
};
