import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/api/apiClient";
import { ClientsEndpoints } from "../../../shared/api/endpoints";
import { queryKeys } from "../../../shared/api/queryClient";
import type { FeedbackFormValues } from "../schemas/clientSchema";

type CreateFeedbackInput = FeedbackFormValues & { clientId: number };

export function useCreateFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ clientId, ...values }: CreateFeedbackInput) => {
      const { data } = await axiosClient.post(ClientsEndpoints.feedbackCreate(), {
        ...values,
        client_id: clientId,
      });
      return data;
    },
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({ queryKey: queryKeys.clients.byId(variables.clientId) }),
  });
}
