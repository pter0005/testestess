
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();
  // Clear the authentication cookie
  cookieStore.set('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1, // Expire the cookie immediately
    path: '/',
    sameSite: 'strict',
  });

  return NextResponse.json({ success: true, message: 'Logout successful' });
}
