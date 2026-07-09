import { FastifyRequest, FastifyReply } from "fastify";
import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  softDeleteClient,
  reactivateClient,
  countAthletes,
  getTop3ByMedals,
} from "./client.model";
import { countMedals, countMedalsByLevel } from "../clientAchievements/clientAchievements.model";

type ClientIdParams = { Params: { id: number } };

type ListQuery = {
  Querystring: {
    page: number;
    limit: number;
    search?: string;
    planStatus?: "ATIVO" | "INATIVO" | "EM_RENOVACAO";
    deleted: boolean;
  };
};

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

export class ClientController {
  public static async getAll(request: FastifyRequest<ListQuery>, reply: FastifyReply): Promise<void> {
    reply.send(await getClients(request.query));
  }

  public static async getById(
    request: FastifyRequest<ClientIdParams>,
    reply: FastifyReply,
  ): Promise<void> {
    const client = await getClientById(request.params.id);
    reply.send(client);
  }

  public static async create(
    request: FastifyRequest<CreateClientBody>,
    reply: FastifyReply,
  ): Promise<void> {
    await createClient(request.body);
    reply.code(201).send({ message: "Client created!" });
  }

  public static async update(
    request: FastifyRequest<UpdateClientBody>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id, ...data } = request.body;
    const updated = await updateClient(id, data);
    reply.send(updated);
  }

  public static async remove(
    request: FastifyRequest<ClientIdParams>,
    reply: FastifyReply,
  ): Promise<void> {
    await softDeleteClient(request.params.id);
    reply.send({ message: "Client deleted!" });
  }

  public static async reactivate(
    request: FastifyRequest<ClientIdParams>,
    reply: FastifyReply,
  ): Promise<void> {
    await reactivateClient(request.params.id);
    reply.send({ message: "Client reactivated!" });
  }

  public static async getAthletesCount(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const total = await countAthletes();
    reply.send({ total });
  }

  public static async getMedalsTotal(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const total = await countMedals();
    reply.send({ total });
  }

  public static async getMedalsEstadual(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const total = await countMedalsByLevel("ESTADUAL");
    reply.send({ total });
  }

  public static async getMedalsNacional(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const total = await countMedalsByLevel("NACIONAL");
    reply.send({ total });
  }

  public static async getTop3Medalists(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    reply.send(await getTop3ByMedals());
  }
}
