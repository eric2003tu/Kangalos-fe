import { DefaultSession } from "next-auth";

// Extend the default session and user types to include custom fields

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName?: string;
      lastName?: string;
      username?: string;
      userType?: string;
      phone?: string | null;
      isVerified?: boolean;
      createdAt?: string;
      updatedAt?: string;
    } & DefaultSession["user"];
    accessToken?: string;
  }
  interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    userType?: string;
    phone?: string | null;
    isVerified?: boolean;
    createdAt?: string;
    updatedAt?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    userType?: string;
    phone?: string | null;
    isVerified?: boolean;
    createdAt?: string;
    updatedAt?: string;
    accessToken?: string;
  }
}
