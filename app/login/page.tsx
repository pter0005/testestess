
"use client";

import Footer from '@/components/layout/Footer';
import Logo from '@/components/common/Logo';
import LoginForm from '@/components/auth/LoginForm';
import InteractiveBackground from '@/components/common/InteractiveBackground';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 overflow-hidden relative">
      <InteractiveBackground />
      
      {/* Container para o conteúdo do login, centralizado e com largura máxima */}
      <div className="relative z-10 w-full max-w-sm space-y-4"> {/* Reduzido space-y-6 para space-y-4 */}
        <Logo className="text-3xl" /> {/* Reduzido de text-4xl para text-3xl */}
        <Card className="w-full bg-card/80 backdrop-blur-md shadow-2xl rounded-xl border-border/30">
          <CardHeader className="p-4"> {/* Reduzido padding de p-6 para p-4 */}
            <h1 className="text-xl font-bold text-center text-primary">Acesse sua Conta</h1> {/* Reduzido de text-2xl para text-xl */}
            <p className="text-sm text-muted-foreground text-center mt-1">
              Bem-vindo de volta! Faça login para continuar.
            </p>
          </CardHeader>
          <CardContent className="p-4"> {/* Reduzido padding de p-6 para p-4 */}
            <LoginForm />
          </CardContent>
        </Card>
      </div>

      <Footer className="py-8 absolute bottom-0 w-full z-10" />
    </div>
  );
}
