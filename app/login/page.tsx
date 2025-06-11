
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";
import InteractiveBackground from "@/components/common/InteractiveBackground";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 overflow-hidden relative"
      style={{
        boxShadow: '0 0 35px 8px hsla(var(--primary), 0.25), 0 0 60px 15px hsla(var(--primary), 0.1) inset'
      }}
    >
      <InteractiveBackground />

      <div className="relative z-10 flex flex-col items-center w-full max-w-xs space-y-6">
        <div className="font-semibold tracking-wider text-center text-4xl text-foreground mb-4">
          TEAM <span className="text-primary">VEO3</span>
        </div>
        <Card className="w-full bg-card/80 backdrop-blur-md shadow-2xl rounded-lg border-border/40">
          <CardHeader className="pt-6 pb-4">
            <CardTitle className="text-2xl font-bold text-center text-foreground">LOGIN</CardTitle>
            <CardDescription className="text-center text-sm text-muted-foreground pt-1">
              Insira suas credenciais para continuar.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <LoginForm />
          </CardContent>
        </Card>
        <p className="text-xs text-muted-foreground/80 mt-8">
          © PTER-VEO3 Academy – 2025
        </p>
      </div>
    </div>
  );
}
