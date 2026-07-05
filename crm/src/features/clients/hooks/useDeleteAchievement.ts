import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/api/apiClient";
import { ClientsEndpoints } from "../../../shared/api/endpoints";
import { queryKeys } from "../../../shared/api/queryClient";

type DeleteAchievementInput = { clientId: number; achievementId: number };

export function useDeleteAchievement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ clientId, achievementId }: DeleteAchievementInput) => {
      const { data } = await axiosClient.delete(ClientsEndpoints.achievement(clientId, achievementId));
      return data;
    },
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({ queryKey: queryKeys.clients.byId(variables.clientId) }),
  });
}
