import { z } from "zod";

export const planAvailabilitySchema = z.enum(["ATIVO", "INATIVO"]);
export type PlanAvailability = z.infer<typeof planAvailabilitySchema>;

export const planSchema = z.object({
  id: z.number(),
  name: z.string(),
  mode: z.string(),
  duration: z.number(),
  monthly_value: z.number(),
  total_value: z.number(),
  status: planAvailabilitySchema,
  created_date: z.string().nullable(),
  deleted_date: z.string().nullable(),
  modificated_date: z.string().nullable(),
});

export type Plan = z.infer<typeof planSchema>;

export const paginatedPlansSchema = z.object({
  data: z.array(planSchema),
  total: z.number(),
  page: z.number(),
  totalPages: z.number(),
});

export type PaginatedPlans = z.infer<typeof paginatedPlansSchema>;

export const planFormSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  mode: z.string().min(1, "Modalidade obrigatória"),
  duration: z.coerce.number().int().min(1, "Duração obrigatória"),
  monthly_value: z.coerce.number().int().min(0, "Valor mensal obrigatório"),
  total_value: z.coerce.number().int().min(0, "Valor total obrigatório"),
  status: planAvailabilitySchema,
});

export type PlanFormInput = z.input<typeof planFormSchema>;
export type PlanFormOutput = z.output<typeof planFormSchema>;

export type PlanListParams = {
  page: number;
  limit: number;
  search?: string;
  status?: PlanAvailability;
  deleted: boolean;
};
