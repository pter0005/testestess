
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

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
});

// Credenciais corretas
const CORRECT_EMAIL = "teamveo3aluno@acesso.com";
const CORRECT_PASSWORD = "acessteam123@";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { toast } = useToast();
  const router = useRouter(); 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoggingIn(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simula uma pequena espera

    if (values.email === CORRECT_EMAIL && values.password === CORRECT_PASSWORD) {
      toast({
        title: "Login Bem-sucedido!",
        description: "Redirecionando para o dashboard...",
      });
      router.push('/dashboard'); 
    } else {
      toast({
        variant: "destructive",
        title: "Erro de Login",
        description: "Credenciais inválidas. Por favor, tente novamente.",
      });
      setIsLoggingIn(false); 
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6"> {/* Espaçamento interno do form reduzido de 8 para 6 */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">Email</FormLabel> {/* Tamanho da label reduzido */}
              <FormControl>
                <Input 
                  type="email"
                  placeholder="seuemail@exemplo.com" 
                  {...field} 
                  className="bg-input border-border placeholder-muted-foreground focus:border-primary focus:ring-primary text-sm" // Tamanho do texto do input reduzido
                  disabled={isLoggingIn}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">Senha</FormLabel> {/* Tamanho da label reduzido */}
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="********" 
                    {...field} 
                    className="bg-input border-border placeholder-muted-foreground focus:border-primary focus:ring-primary pr-10 text-sm" // Tamanho do texto do input reduzido
                    disabled={isLoggingIn}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                    disabled={isLoggingIn}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shine-button text-sm py-2" // Texto do botão e padding ajustados
          disabled={isLoggingIn}
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
