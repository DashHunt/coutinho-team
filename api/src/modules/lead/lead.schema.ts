import { z } from "zod";

//Validation schemas
export const leadById = z.object({
  id: z.number(),
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

export const notFoundSchema = z.object({
  message: z.string(),
});

export const createdLeadSchema = z.object({ message: z.string() });
