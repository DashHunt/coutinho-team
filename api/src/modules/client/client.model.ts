import { prisma } from "../../../prisma/lib/prisma";

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
  if (!plan) throw new Error("Plan not found");

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: { status: "CONCLUIDO" as any },
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

// ===================== CLIENT INFO =====================

export const getClientInfo = async (clientId: number) => {
  return await prisma.clientInfo.findUnique({
    where: { client_id: clientId },
  });
};

export const updateClientInfo = async (
  clientId: number,
  data: {
    block: string;
    block_week: string;
    previous_block?: string;
    notes?: string;
    sheet_link: string;
  },
) => {
  const info = await prisma.clientInfo.findUnique({ where: { client_id: clientId } });
  if (!info) throw new Error("ClientInfo not found");

  return await prisma.clientInfo.update({
    where: { client_id: clientId },
    data,
  });
};

// ===================== ACHIEVEMENTS =====================

export const getAchievements = async (clientId: number) => {
  return await prisma.clientAchievements.findMany({
    where: { client_id: clientId, deleted_date: null },
  });
};

export const createAchievement = async (
  clientId: number,
  data: {
    event: string;
    event_level: "ESTADUAL" | "NACIONAL" | "INTERNACIONAL";
    event_achievement: "OURO" | "PRATA" | "BRONZE" | "RECORDE" | "PARTICIPACAO";
    event_date: string;
  },
) => {
  return await prisma.clientAchievements.create({
    data: {
      client_id: clientId,
      event: data.event,
      event_level: data.event_level,
      event_achievement: data.event_achievement,
      event_date: new Date(data.event_date),
    },
  });
};

export const softDeleteAchievement = async (id: number) => {
  return await prisma.clientAchievements.update({
    where: { id },
    data: { deleted_date: new Date() },
  });
};

// ===================== PLAN HISTORY =====================

export const getPlanHistory = async (clientId: number) => {
  return await prisma.clientPlanHistory.findMany({
    where: { client_id: clientId },
    include: { Plan: true },
  });
};

export const addPlanToClient = async (
  clientId: number,
  planId: number,
  purchasedDate: string,
) => {
  const plan = await prisma.plans.findUnique({ where: { id: planId } });
  if (!plan) throw new Error("Plan not found");

  const purchasedDateObj = new Date(purchasedDate);
  const expirationDate = new Date(purchasedDateObj);
  expirationDate.setDate(expirationDate.getDate() + plan.duration);

  return await prisma.clientPlanHistory.create({
    data: {
      client_id: clientId,
      plan_id: planId,
      purchased_date: purchasedDateObj,
      expiration_date: expirationDate,
      status: "ATIVO",
    },
  });
};

export const updatePlanHistoryStatus = async (
  historyId: number,
  status: "ATIVO" | "INATIVO" | "EM_RENOVACAO",
) => {
  return await prisma.clientPlanHistory.update({
    where: { id: historyId },
    data: { status },
  });
};

// ===================== STATS =====================

export const countAthletes = async () => {
  return await prisma.client.count({ where: { deleted_date: null } });
};

export const countMedals = async () => {
  return await prisma.clientAchievements.count({ where: { deleted_date: null } });
};

export const countMedalsByLevel = async (
  level: "ESTADUAL" | "NACIONAL" | "INTERNACIONAL",
) => {
  return await prisma.clientAchievements.count({
    where: { deleted_date: null, event_level: level },
  });
};

export const getTop3ByMedals = async () => {
  const ranking = await prisma.clientAchievements.groupBy({
    by: ["client_id"],
    where: { deleted_date: null },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: 3,
  });

  if (ranking.length === 0) return [];

  const clientIds = ranking.map((r) => r.client_id);

  const clients = await prisma.client.findMany({
    where: { id: { in: clientIds } },
    include: {
      clientInfo: true,
      clientPlanHistories: { include: { Plan: true } },
      clientAchiviments: { where: { deleted_date: null } },
      clientFeedbacks: { where: { deleted_date: null } },
    },
  });

  return clientIds
    .map((id) => {
      const client = clients.find((c) => c.id === id);
      const medalCount = ranking.find((r) => r.client_id === id)?._count.id ?? 0;
      return client ? { ...client, medal_count: medalCount } : null;
    })
    .filter(Boolean);
};
