
'use server'; // Adicionando 'use server' caso seja importado por componentes de servidor indiretamente e cause problemas no build.

import {genkit} from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

 
const googleApiKey = process.env.GOOGLE_API_KEY;
const pluginsToUse = [];

if (googleApiKey && googleApiKey.trim() !== "") {
  try {
    pluginsToUse.push(googleAI({ apiKey: googleApiKey }));
    console.log("[Genkit Setup] Plugin Google AI configurado.");
  } catch (e) {
    console.error("[Genkit Setup] Erro ao inicializar o plugin Google AI:", e);
    console.warn(
      "\n\n**************************************************************************************\n" +
      "AVISO: Falha ao carregar Google AI. Verifique a GOOGLE_API_KEY e as dependências.\n" +
      "**************************************************************************************\n\n"
    );
  }
} else {
  console.warn(
    "\n\n**************************************************************************************\n" +
    "AVISO: GOOGLE_API_KEY não encontrada ou está vazia. Funcionalidades dependentes do Google AI\n" +
    "não operarão corretamente até que a chave seja configurada no arquivo .env (ou .env.local)\n" +
    "e o servidor reiniciado.\n" +
    "**************************************************************************************\n\n"
  );
}

let genkitInstance;

try {
  genkitInstance = genkit({
    plugins: pluginsToUse,
    // logLevel: 'debug', // Descomente para mais logs se necessário
    // logSinks: ['json'], // Descomente para mais logs se necessário
  });
  if (pluginsToUse.length === 0) {
      console.log("[Genkit Setup] Nenhum plugin de IA externo configurado (Google AI). As funcionalidades de IA atuais (Gerador de Prompt) operarão em modo local/simplificado se dependerem desses plugins.");
  } else {
      console.log("[Genkit Setup] Genkit inicializado com plugins:", pluginsToUse.map(p => p.name || 'Unnamed Plugin'));
  }
} catch (error) {
  console.error("[Genkit Setup] Erro CRÍTICO ao inicializar genkit:", error);
  // Em um cenário de erro crítico na inicialização do genkit,
  // exportamos uma instância dummy para evitar quebrar o resto da aplicação
  // que possa tentar importar 'ai' deste módulo.
  genkitInstance = {
    defineFlow: (config: any, handler: any) => handler, // Dummy defineFlow
    definePrompt: (config: any) => (input: any) => Promise.resolve({ output: null, usage: {} }), // Dummy definePrompt
    generate: (params: any) => Promise.resolve({ output: null, usage: {} }), // Dummy generate
    // Adicione outros métodos dummy conforme necessário se forem chamados no momento do import
  };
  console.warn("[Genkit Setup] Genkit foi inicializado com uma instância DUMMY devido a erro crítico.");
}

export const ai = genkitInstance;

// Importa os fluxos no final para garantir que 'ai' esteja definido.
// Se a inicialização do genkit falhar criticamente, os fluxos usarão a instância dummy.
import './flows/veo3-prompt-generator-flow';
