
"use client";

import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/auth/LoginForm';
import InteractiveBackground from '@/components/common/InteractiveBackground';
import { Card, CardContent } from "@/components/ui/card";

// Logo estilizado com "TEAM-" em branco e "VEO3" em laranja (cor primária)
const SimpleLogo = ({ className }: { className?: string }) => (
  <div className={`font-semibold tracking-wider text-center text-4xl text-foreground ${className}`}>
    TEAM-<span className="text-primary">VEO3</span>
  </div>
);

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 overflow-hidden relative">
      <InteractiveBackground />

      <div className="relative z-10 flex flex-col items-center w-full max-w-xs space-y-6">

        <SimpleLogo className="mb-4" />

        <Card className="w-full bg-card/70 backdrop-blur-md shadow-xl rounded-lg border-border/30">
          <CardContent className="p-6">
            <LoginForm />
          </CardContent>
        </Card>

        <Footer className="py-0 text-xs text-muted-foreground/80 !mt-6" />
      </div>
    </div>
  );
}
