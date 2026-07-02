import { prisma } from "../../../../prisma/lib/prisma";

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

export const getTop3ClientIdsByMedals = async () => {
  const ranking = await prisma.clientAchievements.groupBy({
    by: ["client_id"],
    where: { deleted_date: null },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: 3,
  });

  return ranking.map((entry) => ({ clientId: entry.client_id, medalCount: entry._count.id }));
};
