import { axiosClient } from "../api/apiClient";
import { ClientsEndpoints } from "../api/endpoints";

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
export default class ClientServices {
  static async getAll() {
    const response = await axiosClient.get(ClientsEndpoints.getAll());
    return response.data;
  }

  static async getFeedbacks() {
    const response = await axiosClient.get(ClientsEndpoints.getClientFeedbacks());
    return response.data;
  }

  static async getCount() {
    const response = await axiosClient.get(ClientsEndpoints.getCount());
    return response.data;
  }

  static async getNationalMedals() {
    const response = await axiosClient.get(ClientsEndpoints.getNationalMedals());
    return response.data;
  }

  static async getStateMedals() {
    const response = await axiosClient.get(ClientsEndpoints.getStateMedals());
    return response.data;
  }

  static async getTopThreeAthletes() {
    const response = await axiosClient.get(ClientsEndpoints.getTopThreeAthletes());
    return response.data;
  }

  static async getTotalMedals() {
    const response = await axiosClient.get(ClientsEndpoints.getTotalMedals());
    return response.data;
  }

}
