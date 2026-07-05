import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/api/apiClient";
import { ClientsEndpoints } from "../../../shared/api/endpoints";
import { queryKeys } from "../../../shared/api/queryClient";
import type { ClientDetail } from "../schemas/clientSchema";

export function useClient(id: number) {
  return useQuery({
    queryKey: queryKeys.clients.byId(id),
    queryFn: async () => {
      const { data } = await axiosClient.post<ClientDetail>(ClientsEndpoints.byId(id));
      return data;
    },
  });
}
