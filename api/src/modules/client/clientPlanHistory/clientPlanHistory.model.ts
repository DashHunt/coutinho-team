import { prisma } from "../../../../prisma/lib/prisma";
import { NotFoundError } from "../../../shared/middlewares/error";

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
  if (!plan) throw new NotFoundError("Plan not found");

  const purchasedDateObj = new Date(purchasedDate);
  const expirationDate = new Date(purchasedDateObj);
  expirationDate.setDate(expirationDate.getDate() + plan.duration);

  return await prisma.$transaction(async (transaction) => {
    // Garante um só plano corrente por cliente: qualquer plano ainda ATIVO/EM_RENOVACAO
    // vira INATIVO antes de criar o novo.
    await transaction.clientPlanHistory.updateMany({
      where: { client_id: clientId, status: { in: ["ATIVO", "EM_RENOVACAO"] } },
      data: { status: "INATIVO" },
    });

    return await transaction.clientPlanHistory.create({
      data: {
        client_id: clientId,
        plan_id: planId,
        purchased_date: purchasedDateObj,
        expiration_date: expirationDate,
        status: "ATIVO",
      },
    });
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
