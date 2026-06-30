import { z } from "zod";
import { clientResponseSchema } from "../client/client.schema";

export const feedbackByClientId = z.object({
  clientId: z.number(),
});

export const feedbackById = z.object({
  feedbackId: z.number(),
});

export const createFeedbackSchema = z.object({
  client_id: z.number().int(),
  feedback: z.string(),
  feedback_nps: z.enum(["PROMOTOR", "PASSIVO", "DETRATOR"]),
});

export const feedbackResponseSchema = z.object({
  id: z.number(),
  client_id: z.number(),
  feedback: z.string(),
  feedback_nps: z.string(),
  created_date: z.date().nullable(),
  deleted_date: z.date().nullable(),
  modificated_date: z.date().nullable(),
  client: clientResponseSchema.nullable(),
});

export const topThreeResponse = z.object({
  id: z.number(),
  client_id: z.number(),
  feedback: z.string(),
  feedback_nps: z.string(),
  created_date: z.date().nullable(),
  deleted_date: z.date().nullable(),
  modificated_date: z.date().nullable(),
  client: z.object({
    name: z.string(),
  }),
});

export const notFoundSchema = z.object({ message: z.string() });
export const createdFeedbackSchema = z.object({ message: z.string() });
export const deletedFeedbackSchema = z.object({ message: z.string() });
