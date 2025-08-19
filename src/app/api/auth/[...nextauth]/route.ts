import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { User, Session, NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" as const },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const loginUrl = `${process.env.BACKEND_URL}/auth/login`;
        try {
          const res = await fetch(loginUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          });
          const json = await res.json();
          const { data } = json;
          if (res.ok && data?.accessToken) {
            const user = data.user || { id: credentials.email, email: credentials.email };
            // Store the full user object and accessToken in the session
            return {
              ...user,
              accessToken: data.accessToken
            };
          } else {
          }
          return null;
        } catch {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User; }) {
      if (user) {
        // Store all user fields in the JWT
        Object.assign(token, user);
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT; }) {
      // Extend session.user with custom fields
      session.user = {
        ...(session.user || {}),
        id: token.id as string,
        email: token.email as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        username: token.username as string,
        userType: token.userType as string,
        phone: token.phone as string | null,
        isVerified: token.isVerified as boolean,
        createdAt: token.createdAt as string,
        updatedAt: token.updatedAt as string,
      };
      // Attach accessToken directly to session for easy access
      (session as unknown as { accessToken?: string; }).accessToken = token.accessToken as string;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
