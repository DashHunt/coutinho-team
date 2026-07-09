import { prisma } from "../../../prisma/lib/prisma";
import { IdNotFound } from "../../shared/middlewares/error";
import { paginate } from "../../shared/utils/pagination";

type PlanAvailability = "ATIVO" | "INATIVO";

type ListPlansParams = {
  page: number;
  limit: number;
  search?: string;
  status?: PlanAvailability;
  deleted: boolean;
};

type PlanData = {
  name: string;
  mode: string;
  duration: number;
  monthly_value: number;
  total_value: number;
  status: PlanAvailability;
};

export const getPlans = async ({ page, limit, search, status, deleted }: ListPlansParams) => {
  const where = {
    deleted_date: deleted ?  null : { not: null },
    ...(status ? { status } : {}),
    ...(search ? { name: { contains: search, mode: "insensitive" as const } } : {}),
  };

  return await paginate(
    { page, limit },
    ({ skip, take }) => prisma.plans.findMany({ where, skip, take, orderBy: { created_date: "desc" } }),
    () => prisma.plans.count({ where }),
  );
};

export const getPlanById = async (id: number) => {
  const plan = await prisma.plans.findUnique({ where: { id } });
  if (!plan) {
    throw new IdNotFound(id);
  }
  return plan;
};

export const createPlan = async (data: PlanData) => {
  return await prisma.plans.create({ data });
};

export const updatePlan = async (id: number, data: PlanData) => {
  await getPlanById(id);

  return await prisma.plans.update({ where: { id }, data });
};

export const softDeletePlan = async (id: number) => {
  await getPlanById(id);

  return await prisma.plans.update({ where: { id }, data: { deleted_date: new Date() } });
};

export const reactivatePlan = async (id: number) => {
  await getPlanById(id);

  return await prisma.plans.update({ where: { id }, data: { deleted_date: null } });
};
