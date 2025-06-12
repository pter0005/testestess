
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModuleCard, type ModuleCardProps } from '@/components/dashboard/ModuleCard';
import { Bot, ShoppingBag, Star, PlayCircle, Loader2, LogOut } from 'lucide-react';
import Footer from '@/components/layout/Footer';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const modulesData: Omit<ModuleCardProps, 'aulasCount'>[] = [
  {
    title: 'O Segredo da VEO3',
    description: 'Fazendo um vídeo do zero',
    imageUrl: 'https://i.imgur.com/MFaqsLj.jpeg',
    dataAiHint: 'abstract tech',
    linkUrl: '/dashboard/aula/o-segredo-da-veo3',
    buttonIcon: PlayCircle,
    buttonText: "Assistir agora",
  },
  {
    title: 'Tudo Sobre Redes Sociais',
    description: 'Domine as redes e viralize!',
    imageUrl: 'https://i.imgur.com/EnRyxx3.png',
    dataAiHint: 'social media strategy',
    linkUrl: '/dashboard/aula/tudo-sobre-redes-sociais',
    buttonIcon: PlayCircle,
    buttonText: "Assistir agora",
  },
  {
    title: 'Seja Afiliado',
    description: 'Divulgue o curso e ganhe comissões!',
    imageUrl: 'https://i.imgur.com/bYVF0Ak.jpeg',
    dataAiHint: 'affiliate marketing business',
    linkUrl: '/dashboard/afiliado',
    buttonIcon: ShoppingBag,
    buttonText: "Saiba Mais",
  },
  {
    title: 'Bot Criador de Prompts',
    description: "Gere prompts otimizados para videos com IA no Google Veo 3.",
    imageUrl: 'https://i.imgur.com/Wr9zMxb.png',
    dataAiHint: 'ai bot abstract',
    linkUrl: '/dashboard/prompt-generator',
    buttonText: 'Acessar agora',
    buttonIcon: Bot,
  },
  {
    title: '1 ANO DE ASSINATURA GOOGLE VEO 3',
    description: 'Aula: Como obter sua assinatura gratuita.',
    imageUrl: 'https://i.imgur.com/7Vd3YNK.png',
    dataAiHint: 'subscription service technology',
    linkUrl: '/dashboard/assinatura-veo3',
    buttonText: 'Assistir Aula',
    buttonIcon: Star,
  },
];

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
          <div className="text-xl font-bold tracking-tight">
            <span className="text-foreground">Team</span>
            <span className="text-primary">VEO3</span> - Dashboard
          </div>
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

      <main className="flex-1 w-full p-4 sm:p-6 lg:p-8">
        {/* Seção de Boas Vindas Simplificada ou Removida Temporariamente */}
        {/* <section className="py-12 sm:py-16 text-center mb-10 sm:mb-12">
          <div className="mx-auto w-full max-w-screen-md">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-3 sm:mb-4">
              Seja Bem Vindo(a)
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-2 sm:mb-3">
              Tudo sobre VEO3 e Técnicas de IA
            </p>
            <p className="text-sm text-primary font-medium">
              By - TEAMVEO3
            </p>
          </div>
        </section> */}

        <section className="py-8 sm:py-12">
          <div className="mx-auto w-full max-w-screen-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 text-left">
              Módulos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {modulesData.map((module) => (
                <ModuleCard key={module.title} {...module as ModuleCardProps} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer className="py-8 border-t border-border/50 mt-auto" />
    </div>
  );
}
