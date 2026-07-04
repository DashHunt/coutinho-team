import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/api/apiClient";
import { LeadsEndpoints } from "../../../shared/api/endpoints";
import { queryKeys } from "../../../shared/api/queryClient";
import type { LeadFormValues } from "../schemas/leadSchema";

type UpdateLeadInput = LeadFormValues & { id: number };

export function useUpdateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateLeadInput) => {
      const { data } = await axiosClient.patch(LeadsEndpoints.update(), input);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.leads.all() }),
  });
}
