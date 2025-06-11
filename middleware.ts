
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token');

  // Check if the request is for a route under /dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // If no auth_token cookie exists, redirect to the login page
    if (!authToken) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    // If the cookie exists, allow the request to proceed
    return NextResponse.next();
  }

  // Allow requests for other routes (e.g., /login) to proceed
  return NextResponse.next();
}

export const config = {
  // Define which paths this middleware should run on.
  // This matches all requests starting with /dashboard
  matcher: '/dashboard/:path*',
};
