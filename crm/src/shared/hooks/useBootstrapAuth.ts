import { useEffect, useState } from "react";
import { axiosClient } from "../api/apiClient";
import { useAuthStore } from "../../features/auth/authStore";

// Hook para inicializar a autenticação ao carregar o aplicativo
export function useBootstrapAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  // Tenta obter um novo token de acesso ao inicializar o aplicativo 
  useEffect(() => {
    axiosClient
      .post<{ token: string }>("/refresh-token")
      .then(({ data }) => setAccessToken(data.token))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [setAccessToken]);

  return isLoading;
}
