import { prisma } from "../../../prisma/lib/prisma";

export const getPlans = async () => {
  return await prisma.plans.findMany({
    where: { deleted_date: null },
  });
};

export const getPlanById = async (id: number) => {
  return await prisma.plans.findUnique({
    where: { id },
  });
};

export const createPlan = async (
  name: string,
  mode: string,
  duration: number,
  monthly_value: number,
  total_value: number,
  status: string,
) => {
  return await prisma.plans.create({
    data: { name, mode, duration, monthly_value, total_value, status },
  });
};

export const updatePlan = async (
  id: number,
  name: string,
  mode: string,
  duration: number,
  monthly_value: number,
  total_value: number,
  status: string,
) => {
  return await prisma.plans.update({
    where: { id },
    data: { name, mode, duration, monthly_value, total_value, status },
  });
};

export const softDeletePlan = async (id: number) => {
  return await prisma.plans.update({
    where: { id },
    data: { deleted_date: new Date() },
  });
};
