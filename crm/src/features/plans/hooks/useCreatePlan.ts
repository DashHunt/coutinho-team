import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/api/apiClient";
import { PlansEndpoints } from "../../../shared/api/endpoints";
import { queryKeys } from "../../../shared/api/queryClient";
import type { PlanFormOutput } from "../schemas/planSchema";

export function useCreatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: PlanFormOutput) => {
      const { data } = await axiosClient.post(PlansEndpoints.create(), input);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.plans.all() }),
  });
}
