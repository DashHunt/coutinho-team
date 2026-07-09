export const LeadsEndpoints = {
  list: () => "/leads",
  byId: (id: number) => `/lead-by-id/${id}`,
  create: () => "/leads",
  update: () => "/update-lead",
  remove: (id: number) => `/leads/${id}`,
  reactivate: (id: number) => `/leads/${id}/reactivate`,
};

export const ClientsEndpoints = {
  list: () => "/clients",
  byId: (id: number) => `/client-by-id/${id}`,
  create: () => "/clients",
  update: () => "/update-client",
  remove: (id: number) => `/clients/${id}`,
  reactivate: (id: number) => `/clients/${id}/reactivate`,
  info: (clientId: number) => `/clients/${clientId}/info`,
  planHistory: (clientId: number) => `/clients/${clientId}/plan-history`,
  planHistoryStatus: (clientId: number, historyId: number) =>
    `/clients/${clientId}/plan-history/${historyId}`,
  achievements: (clientId: number) => `/clients/${clientId}/achievements`,
  achievement: (clientId: number, achievementId: number) =>
    `/clients/${clientId}/achievements/${achievementId}`,
  feedbackCreate: () => "/feedbacks",
  feedbackRemove: (feedbackId: number) => `/feedbacks/${feedbackId}`,
};
