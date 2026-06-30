export const LeadsEndpoints = {
  /** Get all orders with optional filtering */
  getAll: () => `/leads/`,

  /** Create a new order */
  create: () => "/leads",
};

export const ClientsEndpoints = {
  /** Get all orders with optional filtering */
  getAll: () => `/clients/`,
  getTopThreeAthletes: () => `/clients/top-medals`,
  getClientFeedbacks: () => `/feedbacks/topThree`,
  getCount: () => `/clients/count`,
  getTotalMedals: () => `/clients/medals/total`,
  getNationalMedals: () => `/clients/medals/nacional`,
  getStateMedals: () => `/clients/medals/estadual`,
};
