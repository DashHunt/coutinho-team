import { z } from "zod";
import { clientInfoResponseSchema } from "../clientInfo/clientInfo.schema";
import { planHistoryResponseSchema } from "../clientPlanHistory/clientPlanHistory.schema";
import { achievementResponseSchema } from "../clientAchievements/clientAchievements.schema";

export const clientById = z.object({
  id: z.coerce.number(),
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

export const feedbackInClientResponseSchema = z.object({
  id: z.number(),
  client_id: z.number(),
  feedback: z.string(),
  feedback_nps: z.string(),
  created_date: z.date().nullable(),
  deleted_date: z.date().nullable(),
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
  clientInfo: clientInfoResponseSchema.nullable(),
  clientPlanHistories: z.array(planHistoryResponseSchema),
  clientAchiviments: z.array(achievementResponseSchema),
  clientFeedbacks: z.array(feedbackInClientResponseSchema),
});

export const topMedalistResponseSchema = z.object({
  medal_count: z.number(),
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
  clientInfo: clientInfoResponseSchema.nullable(),
  clientPlanHistories: z.array(planHistoryResponseSchema),
  clientAchiviments: z.array(achievementResponseSchema),
  clientFeedbacks: z.array(feedbackInClientResponseSchema),
});

export const countResponseSchema = z.object({ total: z.number() });

export const notFoundSchema = z.object({ message: z.string() });
export const conflictSchema = z.object({ message: z.string() });
export const createdClientSchema = z.object({ message: z.string() });
export const deletedClientSchema = z.object({ message: z.string() });
