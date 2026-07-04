import { z } from "zod";

export const leadStatusSchema = z.enum(["CRIADO", "INATIVO", "EM_ANDAMENTO", "CONCLUIDO"]);
export type LeadStatus = z.infer<typeof leadStatusSchema>;

export const leadSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  telephone_number: z.string(),
  history: z.string(),
  selected_plan: z.string(),
  status: leadStatusSchema,
  created_date: z.string().nullable(),
  deleted_date: z.string().nullable(),
  modificated_date: z.string().nullable(),
});

export type Lead = z.infer<typeof leadSchema>;

export const paginatedLeadsSchema = z.object({
  data: z.array(leadSchema),
  total: z.number(),
  page: z.number(),
  totalPages: z.number(),
});

export type PaginatedLeads = z.infer<typeof paginatedLeadsSchema>;

export const leadFormSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),
  telephone_number: z.string().min(1, "Telefone obrigatório"),
  history: z.string().min(1, "Histórico obrigatório"),
  selected_plan: z.string().min(1, "Plano obrigatório"),
  status: leadStatusSchema.optional(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export type LeadListParams = {
  page: number;
  limit: number;
  search?: string;
  status?: LeadStatus;
  deleted: boolean;
};
