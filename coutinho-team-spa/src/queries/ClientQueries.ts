import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryClient";
import ClientServices from "../services/Clients";

export const useGetClients = () => {
  return useQuery({
    queryKey: [...queryKeys.clients.all],
    queryFn: () => ClientServices.getAll(),
    meta: {
      errorMessage: "Erro ao buscar atleta!",
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetTopAthletes = () => {
  return useQuery({
    queryKey: [...queryKeys.clients.topAthletes],
    queryFn: () => ClientServices.getTopThreeAthletes(),
    meta: {
      errorMessage: "Erro ao buscar atleta!",
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetFeedbacks = () => {
  return useQuery({
    queryKey: [...queryKeys.clients.feedbacks],
    queryFn: () => ClientServices.getFeedbacks(),
    meta: {
      errorMessage: "Erro ao buscar atleta!",
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetCountClients = () => {
  return useQuery({
    queryKey: [...queryKeys.clients.count],
    queryFn: () => ClientServices.getCount(),
    meta: {
      errorMessage: "Erro ao buscar atleta!",
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetTotalMedals = () => {
  return useQuery({
    queryKey: [...queryKeys.clients.medals],
    queryFn: () => ClientServices.getTotalMedals(),
    meta: {
      errorMessage: "Erro ao buscar atleta!",
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetNationalMedals = () => {
  return useQuery({
    queryKey: [...queryKeys.clients.national],
    queryFn: () => ClientServices.getNationalMedals(),
    meta: {
      errorMessage: "Erro ao buscar atleta!",
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetStateMedals = () => {
  return useQuery({
    queryKey: [...queryKeys.clients.state],
    queryFn: () => ClientServices.getStateMedals(),
    meta: {
      errorMessage: "Erro ao buscar atleta!",
    },
    staleTime: 5 * 60 * 1000,
  });
};
