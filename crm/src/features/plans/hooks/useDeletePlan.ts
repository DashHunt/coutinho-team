import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/api/apiClient";
import { PlansEndpoints } from "../../../shared/api/endpoints";
import { queryKeys } from "../../../shared/api/queryClient";

export function useDeletePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosClient.delete(PlansEndpoints.remove(id));
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.plans.all() }),
  });
}
