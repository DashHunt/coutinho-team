import { useEffect, useState } from "react";
import { axiosClient } from "../api/apiClient";
import { useAuthStore } from "../../features/auth/authStore";

export function useBootstrapAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    axiosClient
      .post<{ token: string }>("/refresh-token")
      .then(({ data }) => setAccessToken(data.token))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [setAccessToken]);

  return isLoading;
}
