import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/api/apiClient";
import { useAuthStore } from "../authStore";

export function useLogout() {
  const clearAccessToken = useAuthStore((state) => state.clearAccessToken);

  return useMutation({
    mutationFn: async () => {
      await axiosClient.post("/logout");
    },
    onSettled: () => clearAccessToken(),
  });
}
