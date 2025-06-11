import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token');
  const url = request.nextUrl.clone();

  // If the user is not authenticated and is trying to access a dashboard route
  if (!authToken && url.pathname.startsWith('/dashboard')) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Allow authenticated users to access any page, and unauthenticated users to access non-dashboard pages (like /login)
  return NextResponse.next();
}

export const config = {
  // Match only dashboard routes for middleware execution
  matcher: ['/dashboard/:path*'],
};
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