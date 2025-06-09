
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button'; // Importando o Button

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="bg-card p-8 rounded-lg shadow-xl border border-border text-center max-w-md w-full">
        <h2 className="text-2xl font-bold text-destructive mb-4">Algo deu errado!</h2>
        <p className="text-muted-foreground mb-6">
          Ocorreu um erro inesperado na aplicação.
        </p>
        {error?.message && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-md text-left text-xs text-destructive break-words">
            <p className="font-medium">Detalhes do Erro:</p>
            <pre className="whitespace-pre-wrap">{error.message}</pre>
            {error.digest && <p className="mt-1 text-destructive/80">Digest: {error.digest}</p>}
          </div>
        )}
        <Button
          onClick={() => reset()}
          variant="destructive" // Usando variant destructive para combinar com o tema de erro
          className="shine-button"
        >
          Tentar Novamente
        </Button>
      </div>
    </div>
  );
}
