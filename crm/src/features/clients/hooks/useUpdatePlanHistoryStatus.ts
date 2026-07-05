import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/api/apiClient";
import { ClientsEndpoints } from "../../../shared/api/endpoints";
import { queryKeys } from "../../../shared/api/queryClient";
import type { PlanStatus } from "../schemas/clientSchema";

type UpdatePlanHistoryStatusInput = {
  clientId: number;
  historyId: number;
  status: PlanStatus;
};

export function useUpdatePlanHistoryStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ clientId, historyId, status }: UpdatePlanHistoryStatusInput) => {
      const { data } = await axiosClient.patch(ClientsEndpoints.planHistoryStatus(clientId, historyId), {
        status,
      });
      return data;
    },
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({ queryKey: queryKeys.clients.byId(variables.clientId) }),
  });
}
