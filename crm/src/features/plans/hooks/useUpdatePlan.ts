import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/api/apiClient";
import { PlansEndpoints } from "../../../shared/api/endpoints";
import { queryKeys } from "../../../shared/api/queryClient";
import type { PlanFormOutput } from "../schemas/planSchema";

type UpdatePlanInput = PlanFormOutput & { id: number };

export function useUpdatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdatePlanInput) => {
      const { data } = await axiosClient.patch(PlansEndpoints.update(), input);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.plans.all() }),
  });
}
