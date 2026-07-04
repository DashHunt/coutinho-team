import axios from "axios";
import { useAuthStore } from "../../features/auth/authStore";

/**
 * Shared Axios instance.
 * Set VITE_API_URL in your .env file (e.g. VITE_API_URL=https://api.coutinhoteam.com.br).
 * Falls back to /api for same-origin proxy setups.
 */

type Environment = 'LOCAL' | 'PREPROD' | 'PROD';

interface AppConfig {
  API_URL: string;
  ENVIRONMENT: "PROD" | "PREPROD" | "LOCAL";
}

export const urlBuilder = (): AppConfig => {
  const env = import.meta.env as Record<string, string>;
  // Pega qual ambiente está sendo usado (LOCAL, PREPROD, PROD)
  const environment = env.VITE_ENVIRONMENT as Environment;

  // Se não estiver definido, lança um erro
  if (!environment) {
    throw new Error(
      'VITE_API_URL não está definida. Verifique se o arquivo .env correto está sendo usado.'
    );
  }

  // Pega a URL da API correspondente ao ambiente
  const apiUrlKey = `VITE_API_URL_${environment}`;
  const apiUrl = env[apiUrlKey];

  if (!apiUrl) {
    throw new Error(
      `A variável "${apiUrlKey}" não foi encontrada ou está vazia no .env.`
    );
  }

  // Retorna a configuração da aplicação
  return {API_URL: apiUrl, ENVIRONMENT: environment}
};

export const axiosClient = axios.create({
  baseURL: urlBuilder().API_URL,
  headers: {
    Accept: "application/json",
  },
  timeout: 10000, // 10 segundos
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  // Adiciona o token de acesso ao cabeçalho Authorization, se disponível
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Gerencia a atualização do token de acesso quando ele expira
let isRefreshing = false;
let pendingRequests: Array<() => void> = [];

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isRefreshCall = originalRequest?.url === "/refresh-token";

    // Se o erro não for 401 
    // ou se já estivermos tentando atualizar o token
    // ou se a requisição original for a de refresh
    // rejeitamos o erro
    if (error.response?.status !== 401 || originalRequest._retry || isRefreshCall) {
      return Promise.reject(error);
    }

    // Se o erro for 401, tentamos atualizar o token
    originalRequest._retry = true;

    // Se não estamos atualizando o token, iniciamos o processo
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        // Fazemos a chamada para atualizar o token
        const { data } = await axiosClient.post<{ token: string }>("/refresh-token");
        
        // Atualizamos o token no estado global
        useAuthStore.getState().setAccessToken(data.token);

        // Resolvemos todas as requisições pendentes
        pendingRequests.forEach((resolve) => resolve());
      } catch (refreshError) {
        // Se falhar, limpamos o token e rejeitamos todas as requisições pendentes
        useAuthStore.getState().clearAccessToken();
        return Promise.reject(refreshError);

      } finally {
        pendingRequests = [];
        isRefreshing = false;
      }
    }

    // Se estamos atualizando o token, adicionamos a requisição pendente à fila
    return new Promise((resolve) => {
      pendingRequests.push(() => resolve(axiosClient(originalRequest)));
    });
  },
);

export default axiosClient;
