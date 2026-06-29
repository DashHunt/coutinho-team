import { z } from "zod";

//Validation schemas
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Response schema
export const loginResponseSchema = z.object({
  message: z.string(),
});