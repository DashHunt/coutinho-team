import { z } from "zod";

//Validation schemas
export const userById = z.object({
  id: z.number(),
});

export const userByEmail = z.object({
  email: z.string().email(),
});

export const createUser = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const updateUser = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

// Responses
export const userResponse = z.object({
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

export const notFound = z.object({
  message: z.string(),
});
