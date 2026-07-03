import { prisma } from "../../../../prisma/lib/prisma";
import { NotFoundError } from "../../../shared/middlewares/error";
import { getTop3ClientIdsByMedals } from "../clientAchievements/clientAchievements.model";

// ===================== CLIENT =====================

export const getClients = async () => {
  return await prisma.client.findMany({
    where: { deleted_date: null },
    include: {
      clientInfo: true,
      clientPlanHistories: {
        where: { status: "ATIVO" },
      },
      clientAchiviments: { where: { deleted_date: null } },
      clientFeedbacks: { where: { deleted_date: null } },
    },
  });
};

export const getClientById = async (id: number) => {
  return await prisma.client.findUnique({
    where: { id },
    include: {
      clientInfo: true,
      clientPlanHistories: { include: { Plan: true } },
      clientAchiviments: { where: { deleted_date: null } },
      clientFeedbacks: { where: { deleted_date: null } },
    },
  });
};

export const createClient = async (data: {
  lead_id?: number;
  name: string;
  email: string;
  birth_date: string;
  gender: string;
  telephone_number: string;
  document?: string;
  objectives?: string;
  history?: string;
  plan_id: number;
  purchased_date: string;
  block: string;
  block_week: string;
  previous_block?: string;
  notes?: string;
  sheet_link: string;
}) => {
  const plan = await prisma.plans.findUnique({ where: { id: data.plan_id } });
  if (!plan) throw new NotFoundError("Plan not found");

  const purchasedDateObj = new Date(data.purchased_date);
  const expirationDate = new Date(purchasedDateObj);
  expirationDate.setDate(expirationDate.getDate() + plan.duration);

  return await prisma.$transaction(async (transaction) => {
    const client = await transaction.client.create({
      data: {
        name: data.name,
        email: data.email,
        birth_date: new Date(data.birth_date),
        gender: data.gender,
        telephone_number: data.telephone_number,
        document: data.document,
        objectives: data.objectives,
        history: data.history,
      },
    });

    await transaction.clientPlanHistory.create({
      data: {
        client_id: client.id,
        plan_id: data.plan_id,
        purchased_date: purchasedDateObj,
        expiration_date: expirationDate,
        status: "ATIVO",
      },
    });

    await transaction.clientInfo.create({
      data: {
        client_id: client.id,
        block: data.block,
        block_week: data.block_week,
        previous_block: data.previous_block,
        notes: data.notes,
        sheet_link: data.sheet_link,
      },
    });

    if (data.lead_id) {
      await transaction.lead.update({
        where: { id: data.lead_id },
        data: { status: "CONCLUIDO" },
      });
    }

    return client;
  });
};

export const updateClient = async (
  id: number,
  data: {
    name: string;
    email: string;
    birth_date: string;
    gender: string;
    telephone_number: string;
    document?: string;
    objectives?: string;
    history?: string;
  },
) => {
  return await prisma.client.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
      birth_date: new Date(data.birth_date),
      gender: data.gender,
      telephone_number: data.telephone_number,
      document: data.document,
      objectives: data.objectives,
      history: data.history,
    },
  });
};

export const softDeleteClient = async (id: number) => {
  return await prisma.client.update({
    where: { id },
    data: { deleted_date: new Date() },
  });
};

// ===================== STATS =====================

export const countAthletes = async () => {
  return await prisma.client.count({ where: { deleted_date: null } });
};

export const getTop3ByMedals = async () => {
  const ranking = await getTop3ClientIdsByMedals();
  if (ranking.length === 0) return [];

  const clientIds = ranking.map((entry) => entry.clientId);

  const clients = await prisma.client.findMany({
    where: { id: { in: clientIds } },
    include: {
      clientInfo: true,
      clientPlanHistories: { include: { Plan: true } },
      clientAchiviments: { where: { deleted_date: null } },
      clientFeedbacks: { where: { deleted_date: null } },
    },
  });

  return ranking
    .map((entry) => {
      const client = clients.find((candidate) => candidate.id === entry.clientId);
      return client ? { ...client, medal_count: entry.medalCount } : null;
    })
    .filter(Boolean);
};
