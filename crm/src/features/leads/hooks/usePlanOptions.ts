import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/api/apiClient";
import { PlansEndpoints } from "../../../shared/api/endpoints";

type PlanOption = {
  id: number;
  name: string;
  mode: string;
};

type PaginatedPlanOptions = {
  data: PlanOption[];
};

export function usePlanOptions() {
  return useQuery({
    queryKey: ["plans"] as const,
    queryFn: async () => {
      const { data } = await axiosClient.get<PaginatedPlanOptions>(PlansEndpoints.list(), {
        params: { limit: 100 },
      });
      return data.data;
    },
  });
}
