
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
      
      {/* Container para o conteúdo do login, centralizado pelo flex da div pai */}
      <div className="relative z-10 w-full max-w-sm space-y-6"> 
        <Logo className="text-4xl" /> {/* Reduzido um pouco o tamanho do logo */}
        <Card className="w-full bg-card/80 backdrop-blur-md shadow-2xl rounded-xl border-border/30">
          <CardHeader className="p-6"> {/* Garantindo padding no header */}
            <h1 className="text-2xl font-bold text-center text-primary">Acesse sua Conta</h1>
            <p className="text-sm text-muted-foreground text-center mt-1"> {/* Adicionado mt-1 para leve espaçamento */}
              Bem-vindo de volta! Faça login para continuar.
            </p>
          </CardHeader>
          <CardContent className="p-6"> {/* Garantindo padding no content */}
            <LoginForm />
          </CardContent>
        </Card>
      </div>

      <Footer className="py-8 absolute bottom-0 w-full z-10" />
    </div>
  );
}
