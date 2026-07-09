import { z } from "zod";
import { clientInfoResponseSchema } from "../clientInfo/clientInfo.schema";
import { planHistoryResponseSchema } from "../clientPlanHistory/clientPlanHistory.schema";
import { achievementResponseSchema } from "../clientAchievements/clientAchievements.schema";

const planStatusValues = ["ATIVO", "INATIVO", "EM_RENOVACAO"] as const;

export const clientById = z.object({
  id: z.coerce.number(),
});

export const listClientsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).default(10),
  search: z.string().optional(),
  planStatus: z.enum(planStatusValues).optional(),
  deleted: z.coerce.boolean().default(false),
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

export const currentPlanSchema = z
  .object({
    id: z.number(),
    status: z.string(),
    plan: z.object({
      id: z.number(),
      name: z.string(),
      mode: z.string(),
    }),
  })
  .nullable();

export const clientListItemResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  telephone_number: z.string(),
  gender: z.string(),
  birth_date: z.date().nullable(),
  created_date: z.date().nullable(),
  deleted_date: z.date().nullable(),
  currentPlan: currentPlanSchema,
  achievementsCount: z.number(),
});

export const paginatedClientResponseSchema = z.object({
  data: z.array(clientListItemResponseSchema),
  total: z.number(),
  page: z.number(),
  totalPages: z.number(),
});

export const topMedalistResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  medal_count: z.number(),
});

export const countResponseSchema = z.object({ total: z.number() });

export const notFoundSchema = z.object({ message: z.string() });
export const conflictSchema = z.object({ message: z.string() });
export const createdClientSchema = z.object({ message: z.string() });
export const deletedClientSchema = z.object({ message: z.string() });
export const reactivatedClientSchema = z.object({ message: z.string() });
