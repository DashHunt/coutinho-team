import { z } from "zod";

export const planById = z.object({
  id: z.coerce.number(),
});

export const createPlanSchema = z.object({
  name: z.string(),
  mode: z.string(),
  duration: z.number().int(),
  monthly_value: z.number().int(),
  total_value: z.number().int(),
  status: z.string(),
});

export const updatePlanSchema = z.object({
  id: z.number(),
  name: z.string(),
  mode: z.string(),
  duration: z.number().int(),
  monthly_value: z.number().int(),
  total_value: z.number().int(),
  status: z.string(),
});

export const planResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  mode: z.string(),
  duration: z.number(),
  monthly_value: z.number(),
  total_value: z.number(),
  status: z.string(),
  created_date: z.date().nullable(),
  deleted_date: z.date().nullable(),
  modificated_date: z.date().nullable(),
});

export const notFoundSchema = z.object({
  message: z.string(),
});

export const createdPlanSchema = z.object({ message: z.string() });
export const deletedPlanSchema = z.object({ message: z.string() });
