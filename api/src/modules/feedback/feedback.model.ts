import { prisma } from "../../../prisma/lib/prisma";

export const getAll = async () => {
  return await prisma.clientFeedback.findMany({
    where: { deleted_date: null },
  });
};

export const getFirstThree = async () => {
  return await prisma.clientFeedback.findMany({
    where: { deleted_date: null },
    include: {
      Client: {
        select: { name: true },
      },
    },
    take: 3,
  });
};

export const getFeedbacksByClient = async (clientId: number) => {
  return await prisma.clientFeedback.findMany({
    where: { client_id: clientId, deleted_date: null },
  });
};

export const createFeedback = async (
  client_id: number,
  feedback: string,
  feedback_nps: "PROMOTOR" | "PASSIVO" | "DETRATOR",
) => {
  return await prisma.clientFeedback.create({
    data: { client_id, feedback, feedback_nps },
  });
};

export const softDeleteFeedback = async (feedbackId: number) => {
  return await prisma.clientFeedback.update({
    where: { id: feedbackId },
    data: { deleted_date: new Date() },
  });
};
