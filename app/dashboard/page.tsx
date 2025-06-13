
'use client';

import { Button } from '@/components/ui/button';
import { Loader2, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link'; // Adicionado para o logo/link de volta

export default function DashboardPage() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { toast } = useToast();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });
      const result = await response.json();
      if (result.success) {
        toast({
          title: 'Logout Bem-sucedido',
          description: 'Você foi desconectado.',
        });
        router.push('/login');
      } else {
        toast({
          variant: 'destructive',
          title: 'Erro no Logout',
          description: result.message || 'Não foi possível fazer logout.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro de Rede',
        description: 'Não foi possível conectar ao servidor para logout.',
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 w-full max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="text-xl font-bold tracking-tight">
              <span className="text-foreground">Team</span>
              <span className="text-primary">VEO3</span> - Dashboard
            </div>
          </Link>
          <Button
            variant="outline"
            className="shine-button text-sm px-3 py-1.5 h-auto"
            onClick={handleLogout}
            disabled={isLoggingOut}
            aria-label="Sair da conta"
          >
            {isLoggingOut ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
            Sair
          </Button>
        </div>
      </header>

      <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-primary mb-8">
          Teste do Dashboard - Carregou!
        </h1>
        <p className="text-muted-foreground">
          Se você está vendo esta mensagem, a navegação básica para o dashboard funcionou.
        </p>
        {/* A lista de módulos foi removida temporariamente para diagnóstico */}
      </main>

      <footer className="py-8 border-t border-border/50 mt-auto text-center text-muted-foreground text-sm">
        <p>© Team-Veo3 – 2025</p>
      </footer>
    </div>
  );
}
