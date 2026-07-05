import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/api/apiClient";
import { ClientsEndpoints } from "../../../shared/api/endpoints";
import { queryKeys } from "../../../shared/api/queryClient";
import type { ClientInfoFormValues } from "../schemas/clientSchema";

type UpdateClientInfoInput = ClientInfoFormValues & { clientId: number };

export function useUpdateClientInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ clientId, ...values }: UpdateClientInfoInput) => {
      const { data } = await axiosClient.patch(ClientsEndpoints.info(clientId), values);
      return data;
    },
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({ queryKey: queryKeys.clients.byId(variables.clientId) }),
  });
}
