import { FastifyRequest, FastifyReply } from "fastify";
import { getPlanHistory, addPlanToClient, updatePlanHistoryStatus } from "./clientPlanHistory.model";

type ClientIdParams = { Params: { id: number } };

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

export class ClientPlanHistoryController {
  public static async getPlanHistory(
    request: FastifyRequest<ClientIdParams>,
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
