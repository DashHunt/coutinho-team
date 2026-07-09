import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/api/apiClient";
import { ClientsEndpoints } from "../../../shared/api/endpoints";
import { queryKeys } from "../../../shared/api/queryClient";
import type { AchievementFormValues } from "../schemas/clientSchema";

type CreateAchievementInput = AchievementFormValues & { clientId: number };

export function useCreateAchievement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ clientId, ...values }: CreateAchievementInput) => {
      const { data } = await axiosClient.post(ClientsEndpoints.achievements(clientId), values);
      return data;
    },
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({ queryKey: queryKeys.clients.byId(variables.clientId) }),
  });
}
