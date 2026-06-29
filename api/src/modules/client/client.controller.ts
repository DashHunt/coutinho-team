import { FastifyRequest, FastifyReply } from "fastify";
import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  softDeleteClient,
  getClientInfo,
  updateClientInfo,
  getAchievements,
  createAchievement,
  softDeleteAchievement,
  getPlanHistory,
  addPlanToClient,
  updatePlanHistoryStatus,
} from "./client.model";

type ClientByIdParams = { Params: { id: number } };
type AchievementParams = { Params: { id: number; achievementId: number } };
type PlanHistoryParams = { Params: { id: number; historyId: number } };

type CreateClientBody = {
  Body: {
    lead_id?: number;
    name: string;
    email: string;
    birth_date: string;
    gender: string;
    telephone_number: string;
    document?: string;
    objectives?: string;
    history?: string;
    plan_id: number;
    purchased_date: string;
    block: string;
    block_week: string;
    previous_block?: string;
    notes?: string;
    sheet_link: string;
  };
};

type UpdateClientBody = {
  Body: {
    id: number;
    name: string;
    email: string;
    birth_date: string;
    gender: string;
    telephone_number: string;
    document?: string;
    objectives?: string;
    history?: string;
  };
};

type UpdateClientInfoBody = {
  Params: { id: number };
  Body: {
    block: string;
    block_week: string;
    previous_block?: string;
    notes?: string;
    sheet_link: string;
  };
};

type CreateAchievementBody = {
  Params: { id: number };
  Body: {
    event: string;
    event_level: "ESTADUAL" | "NACIONAL" | "INTERNACIONAL";
    event_achievement: "OURO" | "PRATA" | "BRONZE" | "RECORDE" | "PARTICIPACAO";
    event_date: string;
  };
};

type AddPlanHistoryBody = {
  Params: { id: number };
  Body: {
    plan_id: number;
    purchased_date: string;
  };
};

type UpdatePlanHistoryStatusBody = {
  Params: { id: number; historyId: number };
  Body: {
    status: "ATIVO" | "INATIVO" | "EM_RENOVACAO";
  };
};

export class ClientController {
  public static async getAll(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    reply.send(await getClients());
  }

  public static async getById(
    request: FastifyRequest<ClientByIdParams>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id } = request.params;
    const client = await getClientById(id);

    if (!client) {
      return reply.code(404).send({ message: "Client not found" });
    }

    reply.send(client);
  }

  public static async create(
    request: FastifyRequest<CreateClientBody>,
    reply: FastifyReply,
  ): Promise<void> {
    try {
      await createClient(request.body);
      reply.code(201).send({ message: "Client created!" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Internal server error";
      reply.code(400).send({ message });
    }
  }

  public static async update(
    request: FastifyRequest<UpdateClientBody>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id, ...data } = request.body;
    const client = await getClientById(id);

    if (!client) {
      return reply.code(404).send({ message: "Client not found" });
    }

    const updated = await updateClient(id, data);
    reply.send(updated);
  }

  public static async remove(
    request: FastifyRequest<ClientByIdParams>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id } = request.params;
    const client = await getClientById(id);

    if (!client) {
      return reply.code(404).send({ message: "Client not found" });
    }

    await softDeleteClient(id);
    reply.send({ message: "Client deleted!" });
  }

  // ClientInfo
  public static async getInfo(
    request: FastifyRequest<ClientByIdParams>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id } = request.params;
    const info = await getClientInfo(id);

    if (!info) {
      return reply.code(404).send({ message: "ClientInfo not found" });
    }

    reply.send(info);
  }

  public static async updateInfo(
    request: FastifyRequest<UpdateClientInfoBody>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id } = request.params;

    try {
      const updated = await updateClientInfo(id, request.body);
      reply.send(updated);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Internal server error";
      reply.code(404).send({ message });
    }
  }

  // ClientAchievements
  public static async getAchievements(
    request: FastifyRequest<ClientByIdParams>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id } = request.params;
    reply.send(await getAchievements(id));
  }

  public static async createAchievement(
    request: FastifyRequest<CreateAchievementBody>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id } = request.params;
    await createAchievement(id, request.body);
    reply.code(201).send({ message: "Achievement created!" });
  }

  public static async deleteAchievement(
    request: FastifyRequest<AchievementParams>,
    reply: FastifyReply,
  ): Promise<void> {
    const { achievementId } = request.params;
    await softDeleteAchievement(achievementId);
    reply.send({ message: "Achievement deleted!" });
  }

  // ClientPlanHistory
  public static async getPlanHistory(
    request: FastifyRequest<ClientByIdParams>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id } = request.params;
    reply.send(await getPlanHistory(id));
  }

  public static async addPlanHistory(
    request: FastifyRequest<AddPlanHistoryBody>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id } = request.params;
    const { plan_id, purchased_date } = request.body;

    try {
      await addPlanToClient(id, plan_id, purchased_date);
      reply.code(201).send({ message: "Plan assigned to client!" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Internal server error";
      reply.code(400).send({ message });
    }
  }

  public static async updatePlanHistoryStatus(
    request: FastifyRequest<UpdatePlanHistoryStatusBody>,
    reply: FastifyReply,
  ): Promise<void> {
    const { historyId } = request.params;
    const { status } = request.body;
    const updated = await updatePlanHistoryStatus(historyId, status);
    reply.send(updated);
  }
}
