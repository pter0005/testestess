
"use client";

import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/auth/LoginForm';
import InteractiveBackground from '@/components/common/InteractiveBackground';
import { Card, CardContent } from "@/components/ui/card";

// Logo estilizado como texto simples para corresponder à imagem
const SimpleLogo = ({ className }: { className?: string }) => (
  <div className={`font-semibold tracking-wider text-center text-2xl text-foreground ${className}`}>
    TEAM-VEO3
  </div>
);

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 overflow-hidden relative">
      <InteractiveBackground />
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-xs space-y-6"> {/* max-w-xs for compact, space-y for spacing */}
        <SimpleLogo className="mb-1" /> {/* Margem inferior pequena para o logo */}
        
        <Card className="w-full bg-card shadow-xl rounded-lg border-border/30">
          {/* O CardHeader foi removido do design da imagem de referência (sem título "Login" dentro do card) */}
          <CardContent className="p-6"> {/* Padding ajustado para conteúdo */}
            <LoginForm />
          </CardContent>
        </Card>
        
        <Footer className="py-0 text-xs text-muted-foreground/80 !mt-6" /> {/* Footer compacto */}
      </div>
    </div>
  );
}
