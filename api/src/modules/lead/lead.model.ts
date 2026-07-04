import { prisma } from "../../../prisma/lib/prisma";
import { IdNotFound } from "../../shared/middlewares/error";
import { paginate } from "../../shared/utils/pagination";

type LeadStatus = "CRIADO" | "INATIVO" | "EM_ANDAMENTO" | "CONCLUIDO";

type ListLeadsParams = {
  page: number;
  limit: number;
  search?: string;
  status?: LeadStatus;
  deleted: boolean;
};

export const getLeads = async ({ page, limit, search, status, deleted }: ListLeadsParams) => {
  const where = {
    deleted_date: deleted ? null : { not: null },
    ...(status ? { status } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const result = await paginate(
    { page, limit },
    ({ skip, take }) =>
      prisma.lead.findMany({ where, skip, take, orderBy: { created_date: "desc" } }),
    () => prisma.lead.count({ where }),
  );

  return result;
};

export const getLeadById = async (id: number) => {
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) {
    throw new IdNotFound(id);
  }
  return lead;
};

export const createLead = async (
  name: string,
  email: string,
  telephone_number: string,
  history: string,
  selected_plan: string,
) => {
  return await prisma.lead.create({
    data: { name, email, telephone_number, history, selected_plan },
  });
};

export const updateLead = async (
  id: number,
  data: {
    name: string;
    email: string;
    telephone_number: string;
    history: string;
    selected_plan: string;
    status?: LeadStatus;
  },
) => {
  await getLeadById(id);

  return await prisma.lead.update({
    where: { id },
    data,
  });
};

export const softDeleteLead = async (id: number) => {
  await getLeadById(id);

  return await prisma.lead.update({
    where: { id },
    data: { deleted_date: new Date(), status: "INATIVO" },
  });
};

export const reactivateLead = async (id: number) => {
  await getLeadById(id);

  return await prisma.lead.update({
    where: { id },
    data: { deleted_date: null, status: "CRIADO" },
  });
};
