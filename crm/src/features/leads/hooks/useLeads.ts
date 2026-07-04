import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/api/apiClient";
import { LeadsEndpoints } from "../../../shared/api/endpoints";
import { queryKeys } from "../../../shared/api/queryClient";
import type { LeadListParams } from "../schemas/leadSchema";
import type { PaginatedLeads } from "../schemas/leadSchema";

export function useLeads(params: LeadListParams) {
  return useQuery({
    queryKey: queryKeys.leads.list(params),
    queryFn: async () => {
      const { data } = await axiosClient.get<PaginatedLeads>(LeadsEndpoints.list(), { params });
      return data;
    },
    placeholderData: keepPreviousData,
  });
}
