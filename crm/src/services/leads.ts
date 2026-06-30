import { axiosClient } from "../api/apiClient";
import { LeadsEndpoints } from "../api/endpoints";

export interface LeadPayload {
  name: string;
  email: string;
  telephone_number: string;
  history?: string;
  selected_plan?: string;
}

/**
 * Service class for handling product-related API calls
 */
export default class LeadServices {
  static async create(lead: LeadPayload) {
    const response = await axiosClient.post(LeadsEndpoints.create(), lead);
    return response.data;
  }
}
