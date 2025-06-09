
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
    await new Promise(resolve => setTimeout(resolve, 500)); 

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"> {/* Reduced space-y for compactness */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground text-xs font-normal">Email</FormLabel> {/* Styled as per image */}
              <FormControl>
                <Input 
                  type="email"
                  placeholder="" /* No placeholder in target image */
                  {...field} 
                  className="bg-gray-100 text-gray-900 border-gray-300 placeholder-gray-400 focus:bg-white focus:border-primary text-sm h-10" /* Light input, dark text, specific height */
                  disabled={isLoggingIn}
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
              <FormLabel className="text-muted-foreground text-xs font-normal">Senha</FormLabel> {/* Styled as per image */}
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="" /* No placeholder in target image */
                    {...field} 
                    className="bg-gray-100 text-gray-900 border-gray-300 placeholder-gray-400 focus:bg-white focus:border-primary pr-10 text-sm h-10" /* Light input, dark text */
                    disabled={isLoggingIn}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-400 hover:text-gray-600" /* Adjusted icon color */
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
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shine-button text-sm py-2.5 h-10" /* Adjusted padding/height for button */
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
