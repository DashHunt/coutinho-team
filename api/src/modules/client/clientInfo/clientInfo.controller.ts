import { FastifyRequest, FastifyReply } from "fastify";
import { getClientInfo, updateClientInfo } from "./clientInfo.model";

type ClientIdParams = { Params: { id: number } };

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

export class ClientInfoController {
  public static async getInfo(
    request: FastifyRequest<ClientIdParams>,
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
}
