import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/api/apiClient";
import { ClientsEndpoints } from "../../../shared/api/endpoints";
import { queryKeys } from "../../../shared/api/queryClient";
import type { PlanHistoryFormOutput } from "../schemas/clientSchema";

type AddPlanHistoryInput = PlanHistoryFormOutput & { clientId: number };

export function useAddPlanHistory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ clientId, ...values }: AddPlanHistoryInput) => {
      const { data } = await axiosClient.post(ClientsEndpoints.planHistory(clientId), values);
      return data;
    },
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({ queryKey: queryKeys.clients.byId(variables.clientId) }),
  });
}
