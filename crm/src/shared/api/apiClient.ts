import axios from "axios";

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
});

export default axiosClient;
