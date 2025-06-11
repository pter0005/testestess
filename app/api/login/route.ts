import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Fake authentication logic
  if (email === 'test@example.com' && password === 'password123') {
    const cookieStore = cookies();
    cookieStore.set('auth_token', 'authenticated', {
      httpOnly: true, // Recommended for security
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 60 * 60 * 24 * 7, // Cookie expires in 1 week
      path: '/', // Cookie is valid for the entire site
      sameSite: 'strict', // Recommended for security
    });

    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  }
}