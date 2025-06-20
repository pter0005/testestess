
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Fake authentication logic - updated credentials
  if (email === 'teamveo3aluno@acesso.com' && password === 'acessteam123@') {
    const cookieStore = cookies();
    cookieStore.set('auth_token', 'authenticated', {
      httpOnly: true, // Recommended for security
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 60 * 60 * 24 * 7, // Cookie expires in 1 week
      path: '/', // Cookie is valid for the entire site
      sameSite: 'Lax', // Alterado de 'strict' para 'Lax'
    });

    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, message: 'Email ou senha incorretos.' }, { status: 401 });
  }
}
