import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/api/apiClient";
import { useAuthStore } from "../authStore";

type LoginInput = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

export function useLogin() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: async (input: LoginInput) => {
      const { data } = await axiosClient.post<LoginResponse>("/login", input);
      return data;
    },
    onSuccess: (data) => setAccessToken(data.token),
  });
}
