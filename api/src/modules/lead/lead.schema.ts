import { z } from "zod";

const leadStatusValues = ["CRIADO", "INATIVO", "EM_ANDAMENTO", "CONCLUIDO"] as const;

//Validation schemas
export const leadById = z.object({
  id: z.coerce.number(),
});

export const listLeadsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).default(10),
  search: z.string().optional(),
  status: z.enum(leadStatusValues).optional(),
  deleted: z.coerce.boolean().default(false),
});

export const createLeadSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  telephone_number: z.string(),
  history: z.string(),
  selected_plan: z.string(),
});

export const updateLeadSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  telephone_number: z.string(),
  history: z.string(),
  selected_plan: z.string(),
  status: z.enum(leadStatusValues).optional(),
});

// Responses
export const leadResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  telephone_number: z.string(),
  history: z.string(),
  selected_plan: z.string(),
  status: z.string(),
  created_date: z.date().nullable(),
  deleted_date: z.date().nullable(),
  modificated_date: z.date().nullable(),
});

export const paginatedLeadResponseSchema = z.object({
  data: z.array(leadResponseSchema),
  total: z.number(),
  page: z.number(),
  totalPages: z.number(),
});

export const notFoundSchema = z.object({
  message: z.string(),
});

export const createdLeadSchema = z.object({ message: z.string() });
export const deletedLeadSchema = z.object({ message: z.string() });
export const reactivatedLeadSchema = z.object({ message: z.string() });
