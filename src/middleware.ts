import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

const protectedPaths = ['/dashboard', '/portal'];
const authRestrictedPaths = ['/login', '/register', '/forgot-password'];

function pathMatches(pathname: string, paths: string[]): boolean {
  return paths.some(path => pathname.startsWith(path));
}

const authMiddleware = withAuth(
  function onSuccess() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthenticated = !!request.cookies.get('next-auth.session-token');

  if (pathMatches(pathname, authRestrictedPaths) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (pathMatches(pathname, protectedPaths)) {
    return (authMiddleware as (req: NextRequest) => NextResponse)(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
