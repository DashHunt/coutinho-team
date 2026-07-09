import { z } from "zod";

const planAvailabilityValues = ["ATIVO", "INATIVO"] as const;
export const planAvailabilitySchema = z.enum(planAvailabilityValues);

export const planById = z.object({
  id: z.coerce.number(),
});

export const listPlansQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).default(10),
  search: z.string().optional(),
  status: planAvailabilitySchema.optional(),
  deleted: z.coerce.boolean().default(false),
});

export const createPlanSchema = z.object({
  name: z.string(),
  mode: z.string(),
  duration: z.number().int(),
  monthly_value: z.number().int(),
  total_value: z.number().int(),
  status: planAvailabilitySchema,
});

export const updatePlanSchema = z.object({
  id: z.number(),
  name: z.string(),
  mode: z.string(),
  duration: z.number().int(),
  monthly_value: z.number().int(),
  total_value: z.number().int(),
  status: planAvailabilitySchema,
});

export const planResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  mode: z.string(),
  duration: z.number(),
  monthly_value: z.number(),
  total_value: z.number(),
  status: planAvailabilitySchema,
  created_date: z.date().nullable(),
  deleted_date: z.date().nullable(),
  modificated_date: z.date().nullable(),
});

export const paginatedPlanResponseSchema = z.object({
  data: z.array(planResponseSchema),
  total: z.number(),
  page: z.number(),
  totalPages: z.number(),
});

export const notFoundSchema = z.object({
  message: z.string(),
});

export const createdPlanSchema = z.object({ message: z.string() });
export const deletedPlanSchema = z.object({ message: z.string() });
export const reactivatedPlanSchema = z.object({ message: z.string() });
