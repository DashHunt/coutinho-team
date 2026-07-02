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
  const environment = env.VITE_ENVIROMENT as Environment;

  if (!environment) {
    throw new Error(
      'VITE_API_URL não está definida. Verifique se o arquivo .env correto está sendo usado.'
    );
  }

  const apiUrlKey = `VITE_API_URL_${environment}`;
  const apiUrl = env[apiUrlKey];

  if (!apiUrl) {
    throw new Error(
      `A variável "${apiUrlKey}" não foi encontrada ou está vazia no .env.`
    );
  }
  console.log({API_URL: apiUrl, ENVIRONMENT: environment})
  return {API_URL: apiUrl, ENVIRONMENT: environment}
};

export const axiosClient = axios.create({
  baseURL: urlBuilder().API_URL,
  headers: {
    Accept: "application/json",
  },
  timeout: 10000, // 10 seconds
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let pendingRequests: Array<() => void> = [];

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isRefreshCall = originalRequest?.url === "/refresh-token";

    if (error.response?.status !== 401 || originalRequest._retry || isRefreshCall) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const { data } = await axiosClient.post<{ token: string }>("/refresh-token");
        useAuthStore.getState().setAccessToken(data.token);
        pendingRequests.forEach((resolve) => resolve());
      } catch (refreshError) {
        useAuthStore.getState().clearAccessToken();
        return Promise.reject(refreshError);
      } finally {
        pendingRequests = [];
        isRefreshing = false;
      }
    }

    return new Promise((resolve) => {
      pendingRequests.push(() => resolve(axiosClient(originalRequest)));
    });
  },
);

export default axiosClient;
