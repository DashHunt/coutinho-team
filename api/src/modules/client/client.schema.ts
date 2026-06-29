import { z } from "zod";

export const clientById = z.object({
  id: z.number(),
});

export const achievementParams = z.object({
  id: z.number(),
  achievementId: z.number(),
});

export const planHistoryParams = z.object({
  id: z.number(),
  historyId: z.number(),
});

export const createClientSchema = z.object({
  lead_id: z.number().optional(),
  name: z.string(),
  email: z.string().email(),
  birth_date: z.string(),
  gender: z.string(),
  telephone_number: z.string(),
  document: z.string().optional(),
  objectives: z.string().optional(),
  history: z.string().optional(),
  plan_id: z.number().int(),
  purchased_date: z.string(),
  block: z.string(),
  block_week: z.string(),
  previous_block: z.string().optional(),
  notes: z.string().optional(),
  sheet_link: z.string(),
});

export const updateClientSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  birth_date: z.string(),
  gender: z.string(),
  telephone_number: z.string(),
  document: z.string().optional(),
  objectives: z.string().optional(),
  history: z.string().optional(),
});

export const updateClientInfoSchema = z.object({
  block: z.string(),
  block_week: z.string(),
  previous_block: z.string().optional(),
  notes: z.string().optional(),
  sheet_link: z.string(),
});

export const createAchievementSchema = z.object({
  event: z.string(),
  event_level: z.enum(["ESTADUAL", "NACIONAL", "INTERNACIONAL"]),
  event_achievement: z.enum(["OURO", "PRATA", "BRONZE", "RECORDE", "PARTICIPACAO"]),
  event_date: z.string(),
});

export const addPlanHistorySchema = z.object({
  plan_id: z.number().int(),
  purchased_date: z.string(),
});

export const updatePlanHistoryStatusSchema = z.object({
  status: z.enum(["ATIVO", "INATIVO", "EM_RENOVACAO"]),
});

// Response schemas
export const clientInfoResponseSchema = z.object({
  id: z.number(),
  client_id: z.number(),
  block: z.string(),
  block_week: z.string(),
  previous_block: z.string().nullable(),
  notes: z.string().nullable(),
  sheet_link: z.string(),
  created_date: z.date().nullable(),
  deleted_date: z.date().nullable(),
  modificated_date: z.date().nullable(),
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

export const planHistoryResponseSchema = z.object({
  id: z.number(),
  client_id: z.number(),
  plan_id: z.number(),
  purchased_date: z.date().nullable(),
  expiration_date: z.date().nullable(),
  status: z.string(),
  created_date: z.date().nullable(),
  modificated_date: z.date().nullable(),
});

export const clientResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  birth_date: z.date().nullable(),
  gender: z.string(),
  telephone_number: z.string(),
  document: z.string().nullable(),
  objectives: z.string().nullable(),
  history: z.string().nullable(),
  created_date: z.date().nullable(),
  deleted_date: z.date().nullable(),
  modificated_date: z.date().nullable(),
  clientInfos: z.array(clientInfoResponseSchema),
  clientPlanHistories: z.array(planHistoryResponseSchema),
  clientAchiviments: z.array(achievementResponseSchema),
});

export const notFoundSchema = z.object({ message: z.string() });
export const createdClientSchema = z.object({ message: z.string() });
export const deletedClientSchema = z.object({ message: z.string() });
export const createdAchievementSchema = z.object({ message: z.string() });
export const deletedAchievementSchema = z.object({ message: z.string() });
export const createdPlanHistorySchema = z.object({ message: z.string() });
