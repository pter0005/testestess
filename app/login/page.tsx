
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
      
      {/* Container que controla a largura máxima e centraliza o conteúdo do login */}
      <div className="relative z-10 w-full max-w-sm space-y-4 flex flex-col items-center">
        <Logo className="text-3xl mb-2" /> {/* Logo um pouco menor e com margem inferior */}
        
        <Card className="w-full bg-card/80 backdrop-blur-md shadow-2xl rounded-xl border-border/30">
          <CardHeader className="p-4 text-center"> {/* Padding reduzido e texto centralizado */}
            <h1 className="text-xl font-bold text-primary"> {/* Tamanho do título reduzido */}
              Acesse sua Conta
            </h1>
            <p className="text-xs text-muted-foreground mt-1"> {/* Descrição menor */}
              Bem-vindo de volta! Faça login para continuar.
            </p>
          </CardHeader>
          <CardContent className="p-4"> {/* Padding reduzido */}
            <LoginForm />
          </CardContent>
        </Card>
      </div>

      <Footer className="py-6 absolute bottom-0 w-full z-10 text-xs" /> {/* Footer um pouco menor */}
    </div>
  );
}
