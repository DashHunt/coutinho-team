import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/api/apiClient";
import { ClientsEndpoints } from "../../../shared/api/endpoints";
import { queryKeys } from "../../../shared/api/queryClient";

export function useReactivateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosClient.patch(ClientsEndpoints.reactivate(id));
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.clients.all() }),
  });
}
