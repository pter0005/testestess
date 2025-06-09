
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PTER-VEO3 Access',
  description: 'Login page for PTER-VEO3 Platform',
  // Adicionando viewport para garantir bom comportamento em mobile, embora improvável de ser a causa do 404.
  viewport: 'width=device-width, initial-scale=1', 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} dark`}>
      <head>
        {/* Favicons e outros meta tags podem ser adicionados aqui se necessário */}
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
