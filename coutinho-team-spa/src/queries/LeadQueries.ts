import { useMutation } from "@tanstack/react-query";
import { queryClient, queryKeys } from "../api/queryClient";
import LeadServices from "../services/leads";

export interface LeadPayload {
  name: string;
  email: string;
  telephone_number: string;
  history?: string;
  selected_plan?: string;
}

/**
 * Hook for creating a new product
 * @returns Mutation result for product creation
 */
export const useCreateLead = () => {
  return useMutation({
    mutationFn: (payload: LeadPayload) => LeadServices.create(payload),
    meta: {
      successMessage: "Product created successfully",
      errorMessage: "Failed to create product",
      customId: 1,
      invalidateQueries: queryKeys.leads.all,
    },
    onSuccess: () => {
      // Invalidate athletes cache to refetch the updated list
      queryClient.invalidateQueries({ queryKey: queryKeys.leads.all });
    },
  });
};
