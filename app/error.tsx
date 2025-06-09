
'use client';

import { useEffect } from 'react';

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
      <div className="bg-card p-8 rounded-lg shadow-xl border border-border text-center">
        <h2 className="text-2xl font-bold text-destructive mb-4">Algo deu errado!</h2>
        <p className="text-muted-foreground mb-6">
          Ocorreu um erro inesperado na aplicação.
        </p>
        {error?.message && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-md text-left text-xs">
            <p className="font-medium text-destructive">Detalhes do Erro:</p>
            <pre className="whitespace-pre-wrap break-all">{error.message}</pre>
            {error.digest && <p className="mt-1 text-destructive/80">Digest: {error.digest}</p>}
          </div>
        )}
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );
}
