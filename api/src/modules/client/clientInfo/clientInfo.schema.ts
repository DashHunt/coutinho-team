import { z } from "zod";

export const clientIdParams = z.object({
  id: z.coerce.number(),
});

export const updateClientInfoSchema = z.object({
  block: z.string(),
  block_week: z.string(),
  previous_block: z.string().optional(),
  notes: z.string().optional(),
  sheet_link: z.string(),
});

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

export const notFoundSchema = z.object({ message: z.string() });
