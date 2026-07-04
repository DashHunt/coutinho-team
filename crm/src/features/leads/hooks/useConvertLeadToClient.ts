import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/api/apiClient";
import { queryKeys } from "../../../shared/api/queryClient";

export type ConvertLeadToClientInput = {
  lead_id: number;
  name: string;
  email: string;
  birth_date: string;
  gender: string;
  telephone_number: string;
  document?: string;
  objectives?: string;
  history?: string;
  plan_id: number;
  purchased_date: string;
  block: string;
  block_week: string;
  previous_block?: string;
  notes?: string;
  sheet_link: string;
};

export function useConvertLeadToClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ConvertLeadToClientInput) => {
      const { data } = await axiosClient.post("/clients", input);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.leads.all() }),
  });
}
