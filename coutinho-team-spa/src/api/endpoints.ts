export const LeadsEndpoints = {
  /** Get all orders with optional filtering */
  getAll: () => `/leads/`,

  /** Get a single order by ID */
  getCoachById: (id: number) => `/lead-by-id/${id}`,

  /** Create a new product */
  getRegisteredAthletes: () => "/update-lead",

  /** Create a new order */
  create: () => "/leads",
};
