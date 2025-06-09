
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
      {/* Container para centralizar o conteúdo do login */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
        <div className="w-full max-w-md space-y-8"> {/* Define a largura máxima e espaçamento */}
          <Logo className="text-5xl" /> {/* Removido mb-8 para usar o space-y-8 do pai */}
          <Card className="w-full bg-card/80 backdrop-blur-md shadow-2xl rounded-xl border-border/30">
            <CardHeader>
              <h1 className="text-2xl font-bold text-center text-primary">Acesse sua Conta</h1>
              <p className="text-sm text-muted-foreground text-center">
                Bem-vindo de volta! Faça login para continuar.
              </p>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer className="py-8 absolute bottom-0 w-full z-10" />
    </div>
  );
}
