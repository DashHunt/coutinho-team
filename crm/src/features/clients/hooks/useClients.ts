import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/api/apiClient";
import { ClientsEndpoints } from "../../../shared/api/endpoints";
import { queryKeys } from "../../../shared/api/queryClient";
import type { ClientListParams, PaginatedClients } from "../schemas/clientSchema";

export function useClients(params: ClientListParams) {
  return useQuery({
    queryKey: queryKeys.clients.list(params),
    queryFn: async () => {
      const { data } = await axiosClient.get<PaginatedClients>(ClientsEndpoints.list(), { params });
      return data;
    },
    placeholderData: keepPreviousData,
  });
}
