
"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
  password: z.string().min(1, {
    message: "A senha é obrigatória.",
  }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [credentialsError, setCredentialsError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsLoggingIn(true);
    setCredentialsError(null);
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Login Bem-sucedido!',
          description: 'Redirecionando para o dashboard...',
        });
        router.push('/dashboard'); // Redireciona após o sucesso da API e definição do cookie
      } else {
        setCredentialsError(result.message || 'Email ou senha incorretos.');
        toast({
          variant: 'destructive',
          title: 'Falha no Login',
          description: result.message || 'Verifique suas credenciais.',
        });
      }
    } catch (error) {
      console.error('Login API error:', error);
      setCredentialsError('Erro ao tentar fazer login. Tente novamente mais tarde.');
      toast({
        variant: 'destructive',
        title: 'Erro de Rede',
        description: 'Não foi possível conectar ao servidor.',
      });
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground/90 text-xs font-normal">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="seuemail@example.com"
                  {...field}
                  className="bg-input text-input-foreground border-border/50 placeholder-muted-foreground/70 focus:border-primary text-sm h-10"
                  disabled={isLoggingIn}
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground/90 text-xs font-normal">Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...field}
                    className="bg-input text-input-foreground border-border/50 placeholder-muted-foreground/70 focus:border-primary pr-10 text-sm h-10"
                    disabled={isLoggingIn}
                    autoComplete="current-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground/80 hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                    disabled={isLoggingIn}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        {credentialsError && (
            <p className="text-destructive text-sm text-center pt-1">{credentialsError}</p>
        )}
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shine-button text-sm py-2.5 h-10"
          disabled={isLoggingIn || (form.formState.isSubmitted && !form.formState.isValid)}
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </Button>
      </form>
    </Form>
  );
}
