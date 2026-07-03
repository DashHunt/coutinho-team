import { z } from "zod";

//Validation schemas
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Response schema
export const loginResponseSchema = z.object({
  token: z.string(),
});

export const refreshResponseSchema = z.object({
  token: z.string(),
});

export const logoutResponseSchema = z.object({
  message: z.string(),
});

export const invalidCredentialsSchema = z.object({
  message: z.string(),
});