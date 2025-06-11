// File: /src/lib/auth.ts

export function fakeLogin(email: string, password: string): Promise<{ success: boolean; message?: string }> {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password123') {
        // Simulate setting token in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('fake_auth_token', 'fake-jwt-token');
        }
        resolve({ success: true });
      } else {
        resolve({ success: false, message: 'Credenciais inválidas.' });
      }
    }, 500);
  });
}
export function fakeLogout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('fake_auth_token');
  }
}

export function isAuthenticated(): boolean {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('fake_auth_token') !== null;
  }
  // Em SSR, consideramos que o usuário não está autenticado via localStorage
  return false;
}