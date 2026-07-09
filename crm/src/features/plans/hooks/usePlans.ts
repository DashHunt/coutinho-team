import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/api/apiClient";
import { PlansEndpoints } from "../../../shared/api/endpoints";
import { queryKeys } from "../../../shared/api/queryClient";
import type { PaginatedPlans, PlanListParams } from "../schemas/planSchema";

export function usePlans(params: PlanListParams) {
  return useQuery({
    queryKey: queryKeys.plans.list(params),
    queryFn: async () => {
      const { data } = await axiosClient.get<PaginatedPlans>(PlansEndpoints.list(), { params });
      return data;
    },
    placeholderData: keepPreviousData,
  });
}
