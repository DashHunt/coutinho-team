import { QueryClient } from "@tanstack/react-query";

// Configurador global do QueryClient
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000, // Considera os dados como "frescos" por 30 segundos
    },
  },
});

// Query key factory
// Fornece as keys para a aplicação
export const queryKeys = {
  leads: {
    all: () => ["leads"] as const,
    list: (params: Record<string, unknown>) => ["leads", "list", params] as const,
    byId: (id: number) => ["leads", id] as const,
  },
  clients: {
    all: () => ["clients"] as const,
    list: (params: Record<string, unknown>) => ["clients", "list", params] as const,
    byId: (id: number) => ["clients", id] as const,
  },
};
