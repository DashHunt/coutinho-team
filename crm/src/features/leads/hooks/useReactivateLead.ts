import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/api/apiClient";
import { LeadsEndpoints } from "../../../shared/api/endpoints";
import { queryKeys } from "../../../shared/api/queryClient";

export function useReactivateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosClient.patch(LeadsEndpoints.reactivate(id));
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.leads.all() }),
  });
}
