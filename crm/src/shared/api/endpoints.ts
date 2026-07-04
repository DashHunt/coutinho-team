export const LeadsEndpoints = {
  list: () => "/leads",
  byId: (id: number) => `/lead-by-id/${id}`,
  create: () => "/leads",
  update: () => "/update-lead",
  remove: (id: number) => `/leads/${id}`,
  reactivate: (id: number) => `/leads/${id}/reactivate`,
};
