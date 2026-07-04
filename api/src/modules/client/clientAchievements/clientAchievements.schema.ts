import { z } from "zod";

export const clientIdParams = z.object({
  id: z.coerce.number(),
});

export const achievementParams = z.object({
  id: z.coerce.number(),
  achievementId: z.coerce.number(),
});

export const createAchievementSchema = z.object({
  event: z.string(),
  event_level: z.enum(["ESTADUAL", "NACIONAL", "INTERNACIONAL"]),
  event_achievement: z.enum(["OURO", "PRATA", "BRONZE", "RECORDE", "PARTICIPACAO"]),
  event_date: z.string(),
});

export const achievementResponseSchema = z.object({
  id: z.number(),
  client_id: z.number(),
  event: z.string(),
  event_level: z.string(),
  event_achievement: z.string(),
  event_date: z.date().nullable(),
  created_date: z.date().nullable(),
  deleted_date: z.date().nullable(),
  modificated_date: z.date().nullable(),
});

export const createdAchievementSchema = z.object({ message: z.string() });
export const deletedAchievementSchema = z.object({ message: z.string() });
