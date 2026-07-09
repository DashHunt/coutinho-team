import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/api/apiClient";
import { ClientsEndpoints } from "../../../shared/api/endpoints";
import { queryKeys } from "../../../shared/api/queryClient";
import type { ClientFormValues } from "../schemas/clientSchema";

type UpdateClientInput = ClientFormValues & { id: number };

export function useUpdateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateClientInput) => {
      const { data } = await axiosClient.patch(ClientsEndpoints.update(), input);
      return data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.clients.byId(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.clients.all() });
    },
  });
}
