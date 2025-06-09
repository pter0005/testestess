
"use client";

import Footer from '@/components/layout/Footer';
// import Logo from '@/components/common/Logo'; // Temporariamente removido para simplificar
import LoginForm from '@/components/auth/LoginForm';
import InteractiveBackground from '@/components/common/InteractiveBackground';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 overflow-hidden relative">
      <InteractiveBackground />
      
      {/* Contêiner para centralizar o card de login */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-xs"> {/* max-w-xs para ser bem pequeno */}
        {/* <Logo className="text-2xl mb-4" />  Temporariamente removido */}
        
        <Card className="w-full bg-card/80 backdrop-blur-md shadow-2xl rounded-xl border-border/30">
          <CardHeader className="p-4 text-center"> {/* Padding reduzido */}
            <CardTitle className="text-lg font-semibold text-primary"> {/* Tamanho do título reduzido */}
              Login
            </CardTitle>
            {/* <CardDescription className="text-xs text-muted-foreground mt-1">
              Faça login para continuar.
            </CardDescription> */}
          </CardHeader>
          <CardContent className="p-4"> {/* Padding reduzido */}
            <LoginForm />
          </CardContent>
        </Card>
      </div>

      <Footer className="py-4 absolute bottom-0 w-full z-10 text-xs" />
    </div>
  );
}
