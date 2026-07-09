import { prisma } from "../../../../prisma/lib/prisma";
import { ConflitcError, IdNotFound, NotFoundError } from "../../../shared/middlewares/error";
import { getTop3ClientIdsByMedals } from "../clientAchievements/clientAchievements.model";
import { paginate } from "../../../shared/utils/pagination";

type PlanStatus = "ATIVO" | "INATIVO" | "EM_RENOVACAO";

type ListClientsParams = {
  page: number;
  limit: number;
  search?: string;
  planStatus?: PlanStatus;
  deleted: boolean;
};

// ===================== CLIENT =====================

const getCurrentPlanHistories = async (clientIds: number[]) => {
  if (clientIds.length === 0) return [];

  return await prisma.clientPlanHistory.findMany({
    where: { client_id: { in: clientIds } },
    distinct: ["client_id"],
    orderBy: { created_date: "desc" },
    include: { Plan: true },
  });
};

const getCurrentPlansByClientIds = async (clientIds: number[]) => {
  const currentPlanHistories = await getCurrentPlanHistories(clientIds);

  return new Map(
    currentPlanHistories.map((history) => [
      history.client_id,
      {
        id: history.id,
        status: history.status,
        plan: { id: history.Plan.id, name: history.Plan.name, mode: history.Plan.mode },
      },
    ]),
  );
};

const filterClientIdsByCurrentPlanStatus = async (clientIds: number[], planStatus: PlanStatus) => {
  const currentPlanHistories = await getCurrentPlanHistories(clientIds);
  return currentPlanHistories
    .filter((history) => history.status === planStatus)
    .map((history) => history.client_id);
};

export const getClients = async ({ page, limit, search, planStatus, deleted }: ListClientsParams) => {
  const baseWhere = {
    deleted_date: deleted ? { not: null } : null,
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  let matchingClientIds: number[] | undefined;
  if (planStatus) {
    const candidateClients = await prisma.client.findMany({ where: baseWhere, select: { id: true } });
    matchingClientIds = await filterClientIdsByCurrentPlanStatus(
      candidateClients.map((client) => client.id),
      planStatus,
    );
  }

  const where = {
    ...baseWhere,
    ...(matchingClientIds ? { id: { in: matchingClientIds } } : {}),
  };

  const result = await paginate(
    { page, limit },
    ({ skip, take }) =>
      prisma.client.findMany({
        where,
        skip,
        take,
        orderBy: { created_date: "desc" },
        include: { clientAchiviments: { where: { deleted_date: null } } },
      }),
    () => prisma.client.count({ where }),
  );

  const currentPlanByClientId = await getCurrentPlansByClientIds(result.data.map((client) => client.id));

  return {
    ...result,
    data: result.data.map((client) => ({
      id: client.id,
      name: client.name,
      email: client.email,
      telephone_number: client.telephone_number,
      gender: client.gender,
      birth_date: client.birth_date,
      created_date: client.created_date,
      deleted_date: client.deleted_date,
      currentPlan: currentPlanByClientId.get(client.id) ?? null,
      achievementsCount: client.clientAchiviments.length,
    })),
  };
};

export const getClientById = async (id: number) => {
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      clientInfo: true,
      clientPlanHistories: { include: { Plan: true } },
      clientAchiviments: { where: { deleted_date: null } },
      clientFeedbacks: { where: { deleted_date: null } },
    },
  });

  if (!client) {
    throw new IdNotFound(id);
  }

  return client;
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

  if (data.lead_id) {
    const lead = await prisma.lead.findUnique({ where: { id: data.lead_id }, include: { client: true } });
    if (!lead) throw new NotFoundError("Lead not found");
    if (lead.client) throw new ConflitcError("Lead já convertido em cliente");
  }

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
        lead_id: data.lead_id,
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
  await getClientById(id);

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
  await getClientById(id);

  return await prisma.client.update({
    where: { id },
    data: { deleted_date: new Date() },
  });
};

export const reactivateClient = async (id: number) => {
  await getClientById(id);

  return await prisma.client.update({
    where: { id },
    data: { deleted_date: null },
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
    select: { id: true, name: true },
  });

  return ranking
    .map((entry) => {
      const client = clients.find((candidate) => candidate.id === entry.clientId);
      return client ? { id: client.id, name: client.name, medal_count: entry.medalCount } : null;
    })
    .filter(Boolean);
};
