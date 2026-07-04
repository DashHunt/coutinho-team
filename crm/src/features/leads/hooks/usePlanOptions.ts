import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/api/apiClient";

type PlanOption = {
  id: number;
  name: string;
  mode: string;
};

export function usePlanOptions() {
  return useQuery({
    queryKey: ["plans"] as const,
    queryFn: async () => {
      const { data } = await axiosClient.get<PlanOption[]>("/plans");
      return data;
    },
  });
}
