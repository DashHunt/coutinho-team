import { z } from "zod";

export const planStatusSchema = z.enum(["ATIVO", "INATIVO", "EM_RENOVACAO"]);
export type PlanStatus = z.infer<typeof planStatusSchema>;

export const eventLevelSchema = z.enum(["ESTADUAL", "NACIONAL", "INTERNACIONAL"]);
export type EventLevel = z.infer<typeof eventLevelSchema>;

export const eventAchievementSchema = z.enum(["OURO", "PRATA", "BRONZE", "RECORDE", "PARTICIPACAO"]);
export type EventAchievement = z.infer<typeof eventAchievementSchema>;

export const feedbackNpsSchema = z.enum(["PROMOTOR", "PASSIVO", "DETRATOR"]);
export type FeedbackNps = z.infer<typeof feedbackNpsSchema>;

// ===================== Listagem =====================

export const currentPlanSchema = z
  .object({
    id: z.number(),
    status: planStatusSchema,
    plan: z.object({
      id: z.number(),
      name: z.string(),
      mode: z.string(),
    }),
  })
  .nullable();

export const clientListItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  telephone_number: z.string(),
  gender: z.string(),
  birth_date: z.string().nullable(),
  created_date: z.string().nullable(),
  deleted_date: z.string().nullable(),
  currentPlan: currentPlanSchema,
  achievementsCount: z.number(),
});

export type ClientListItem = z.infer<typeof clientListItemSchema>;

export const paginatedClientsSchema = z.object({
  data: z.array(clientListItemSchema),
  total: z.number(),
  page: z.number(),
  totalPages: z.number(),
});

export type PaginatedClients = z.infer<typeof paginatedClientsSchema>;

export type ClientListParams = {
  page: number;
  limit: number;
  search?: string;
  planStatus?: PlanStatus;
  deleted: boolean;
};

// ===================== Detalhe =====================

export const clientInfoSchema = z.object({
  id: z.number(),
  client_id: z.number(),
  block: z.string(),
  block_week: z.string(),
  previous_block: z.string().nullable(),
  notes: z.string().nullable(),
  sheet_link: z.string(),
});

export const planHistoryItemSchema = z.object({
  id: z.number(),
  client_id: z.number(),
  plan_id: z.number(),
  purchased_date: z.string().nullable(),
  expiration_date: z.string().nullable(),
  status: planStatusSchema,
  Plan: z
    .object({
      id: z.number(),
      name: z.string(),
      mode: z.string(),
      duration: z.number(),
      monthly_value: z.number(),
      total_value: z.number(),
    })
    .optional(),
});

export const achievementItemSchema = z.object({
  id: z.number(),
  client_id: z.number(),
  event: z.string(),
  event_level: eventLevelSchema,
  event_achievement: eventAchievementSchema,
  event_date: z.string().nullable(),
});

export const feedbackItemSchema = z.object({
  id: z.number(),
  client_id: z.number(),
  feedback: z.string(),
  feedback_nps: feedbackNpsSchema,
  created_date: z.string().nullable(),
});

export const clientDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  birth_date: z.string().nullable(),
  gender: z.string(),
  telephone_number: z.string(),
  document: z.string().nullable(),
  objectives: z.string().nullable(),
  history: z.string().nullable(),
  deleted_date: z.string().nullable(),
  clientInfo: clientInfoSchema.nullable(),
  clientPlanHistories: z.array(planHistoryItemSchema),
  clientAchiviments: z.array(achievementItemSchema),
  clientFeedbacks: z.array(feedbackItemSchema),
});

export type ClientDetail = z.infer<typeof clientDetailSchema>;

// ===================== Formulários =====================

export const clientFormSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),
  birth_date: z.string().min(1, "Data de nascimento obrigatória"),
  gender: z.string().min(1, "Gênero obrigatório"),
  telephone_number: z.string().min(1, "Telefone obrigatório"),
  document: z.string().optional(),
  objectives: z.string().optional(),
  history: z.string().optional(),
});

export type ClientFormValues = z.infer<typeof clientFormSchema>;

export const createClientFormSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),
  telephone_number: z.string().min(1, "Telefone obrigatório"),
  birth_date: z.string().min(1, "Data de nascimento obrigatória"),
  gender: z.string().min(1, "Gênero obrigatório"),
  document: z.string().optional(),
  objectives: z.string().optional(),
  history: z.string().optional(),
  plan_id: z.coerce.number().min(1, "Selecione um plano"),
  purchased_date: z.string().min(1, "Data de compra obrigatória"),
  block: z.string().min(1, "Bloco obrigatório"),
  block_week: z.string().min(1, "Semana obrigatória"),
  previous_block: z.string().optional(),
  notes: z.string().optional(),
  sheet_link: z.string().min(1, "Link da planilha obrigatório"),
});

export type CreateClientFormInput = z.input<typeof createClientFormSchema>;
export type CreateClientFormOutput = z.output<typeof createClientFormSchema>;

export const clientInfoFormSchema = z.object({
  block: z.string().min(1, "Bloco obrigatório"),
  block_week: z.string().min(1, "Semana obrigatória"),
  previous_block: z.string().optional(),
  notes: z.string().optional(),
  sheet_link: z.string().min(1, "Link da planilha obrigatório"),
});

export type ClientInfoFormValues = z.infer<typeof clientInfoFormSchema>;

export const planHistoryFormSchema = z.object({
  plan_id: z.coerce.number().min(1, "Selecione um plano"),
  purchased_date: z.string().min(1, "Data de compra obrigatória"),
});

export type PlanHistoryFormInput = z.input<typeof planHistoryFormSchema>;
export type PlanHistoryFormOutput = z.output<typeof planHistoryFormSchema>;

export const achievementFormSchema = z.object({
  event: z.string().min(1, "Evento obrigatório"),
  event_level: eventLevelSchema,
  event_achievement: eventAchievementSchema,
  event_date: z.string().min(1, "Data obrigatória"),
});

export type AchievementFormValues = z.infer<typeof achievementFormSchema>;

export const feedbackFormSchema = z.object({
  feedback: z.string().min(1, "Feedback obrigatório"),
  feedback_nps: feedbackNpsSchema,
});

export type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;
