import { z } from "zod";

export const clientIdParams = z.object({
  id: z.coerce.number(),
});

export const planHistoryParams = z.object({
  id: z.coerce.number(),
  historyId: z.coerce.number(),
});

export const addPlanHistorySchema = z.object({
  plan_id: z.number().int(),
  purchased_date: z.string(),
});

export const updatePlanHistoryStatusSchema = z.object({
  status: z.enum(["ATIVO", "INATIVO", "EM_RENOVACAO"]),
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
  Plan: z
    .object({
      id: z.number(),
      name: z.string(),
      mode: z.string(),
      duration: z.number(),
      monthly_value: z.number(),
      total_value: z.number(),
    })
    .optional(),
});

export const notFoundSchema = z.object({ message: z.string() });
export const createdPlanHistorySchema = z.object({ message: z.string() });
