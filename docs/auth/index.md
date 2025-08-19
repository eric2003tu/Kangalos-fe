Here’s a **focused, step‑by‑step** outline for adding **email/password** auth only, using your existing REST login endpoint. Follow each step in order:

---

## 1. Install NextAuth

Run in your Next.js project root: (I have finished this)

```bash
npm install next-auth
```

---

## 2. Create the NextAuth API Route

Create **`/pages/api/auth/[...nextauth].ts`** with **only** the Credentials provider:

```ts
// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  // 1. Use JWT sessions (no database)
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  // 2. Define the Credentials provider
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize({ email, password }) {
        // 3. Call your backend login endpoint
        const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const { data } = await res.json();

        // 4. If login is successful, return a user object
        if (res.ok && data?.accessToken) {
          return {
            id: data.user.id,
            email,
            accessToken: data.accessToken,
          };
        }
        // 5. Otherwise, return null → NextAuth will show an error
        return null;
      },
    }),
  ],

  callbacks: {
    // 6. Persist `accessToken` in the token
    async jwt({ token, user }) {
      if (user?.accessToken) token.accessToken = user.accessToken;
      return token;
    },
    // 7. Make `accessToken` available in `session`
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});
```

**Environment variables** (in your `.env.local`):

```
NEXTAUTH_SECRET=<a long, random string>
BACKEND_URL=https://api.your-backend.com
```

---

## 3. Wrap Your App with the Session Provider

Edit **`/pages/_app.tsx`**:

```tsx
// pages/_app.tsx
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
```

---

## 4. Build the Login Page

Create **`/pages/login.tsx`**:

```tsx
// pages/login.tsx
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      setErrorMsg("Invalid credentials");
    } else {
      // success → go to home or dashboard
      window.location.href = "/";
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label style={{ marginTop: 12 }}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        <button type="submit" style={{ marginTop: 12 }}>
          Sign In
        </button>
      </form>
    </div>
  );
}
```

---

## 5. Protecting a Page

### Client‑side Redirect

For example, **`/pages/dashboard.tsx`**:

```tsx
// pages/dashboard.tsx
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  if (status === "loading") return <p>Loading…</p>;

  return <p>Welcome, {session?.user?.email}!</p>;
}
```

---

## 6. Using the Token

Whenever you need the backend JWT, grab it from the session:

```ts
import { useSession } from "next-auth/react";

// inside a React component
const { data: session } = useSession();
const token = session?.accessToken;

// then in fetch calls:
fetch("/api/protected", {
  headers: { Authorization: `Bearer ${token}` },
});
```

---

### Quick Recap

1. **Install** `next-auth`.
2. **Create** `/api/auth/[...nextauth].ts` with **CredentialsProvider** calling your `/auth/login`.
3. **Wrap** your app in `<SessionProvider>`.
4. **Build** `/login` page, use `signIn("credentials")`.
5. **Protect** pages via `useSession` + redirect.
6. **Consume** the JWT from `session.accessToken` in your API calls.

That’s all—you now have email/password auth fully handled on the front end with NextAuth.js!

implement next auth for me please, and add the env example
Yes—you can absolutely use Next.js Middleware to centrally guard routes before they hit your pages or API. Here’s how to set it up in a few steps:

---

## 1. Install the JWT helper

NextAuth provides a `getToken()` helper you can use in middleware:

```bash
npm install next-auth
```

You already have NextAuth installed; `getToken` lives in the same package.

---

## 2. Create `middleware.ts` in your project root

```ts
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // 1️⃣ Which paths to protect? (you can refine this)
  const protectedPaths = ["/dashboard", "/settings", "/admin"];
  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (!isProtected) {
    // let public routes pass through
    return NextResponse.next();
  }

  // 2️⃣ Try to get a valid token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (token) {
    // user is authenticated, continue
    return NextResponse.next();
  }

  // 3️⃣ No valid token → redirect to login, with return URL
  const loginUrl = new URL("/login", req.nextUrl.origin);
  loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

// 4️⃣ Tell Next.js which routes to run this on
export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/admin/:path*"],
};
```

**What’s happening here?**

1. **`matcher`**: specifies which URL patterns your middleware should run on.
2. **`getToken`**: checks the incoming request cookies for a valid NextAuth JWT.
3. If the token exists, it calls `NextResponse.next()` to let the request continue.
4. If no token, it redirects the user to `/login`, passing the original path in `callbackUrl`.

---

## 3. Update your Login to honor `callbackUrl`

On your login page, when you call:

```ts
signIn("credentials", {
  redirect: false,
  email,
  password,
  callbackUrl: /* NextAuth will read URL param for you */,
});
```

NextAuth will automatically redirect back to whatever `callbackUrl` you passed in the query string. You don’t need to manually grab it—just ensure your sign‑in URL includes `?callbackUrl=/dashboard`.

---

## 4. Optional: Protect APIs too

If you have API routes under `/pages/api/protected/...`, add them to the matcher:

```ts
export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/api/protected/:path*"],
};
```

---

### Benefits of middleware protection

- **Centralized**: One file guards all protected routes.
- **Edge‑ready**: Middleware runs at the edge, before page rendering.
- **Consistent**: Works for both SSR and client‑side requests.

With this in place, any hit to `/dashboard/*`, `/settings/*`, etc., will first check the JWT. Unauthenticated users get bounced to `/login` automatically.
