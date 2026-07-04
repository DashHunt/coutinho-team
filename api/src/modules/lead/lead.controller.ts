import { FastifyRequest, FastifyReply } from "fastify";
import {
  createLead,
  getLeadById,
  getLeads,
  updateLead,
  softDeleteLead,
  reactivateLead,
} from "./lead.model";
import { sendLeadConfirmationEmail } from "../../shared/utils/mailer";

type LeadIdParams = { Params: { id: number } };

type ListQuery = {
  Querystring: {
    page: number;
    limit: number;
    search?: string;
    status?: "CRIADO" | "INATIVO" | "EM_ANDAMENTO" | "CONCLUIDO";
    deleted: boolean;
  };
};

type UpdateBody = {
  Body: {
    id: number;
    name: string;
    email: string;
    telephone_number: string;
    history: string;
    selected_plan: string;
    status?: "CRIADO" | "INATIVO" | "EM_ANDAMENTO" | "CONCLUIDO";
  };
};

type CreateBody = {
  Body: {
    name: string;
    email: string;
    telephone_number: string;
    history: string;
    selected_plan: string;
  };
};

export class LeadController {
  public static async getAll(request: FastifyRequest<ListQuery>, reply: FastifyReply): Promise<void> {
    reply.send(await getLeads(request.query));
  }

  public static async getById(
    request: FastifyRequest<LeadIdParams>,
    reply: FastifyReply,
  ): Promise<void> {
    const lead = await getLeadById(request.params.id);
    reply.send(lead);
  }

  public static async update(
    request: FastifyRequest<UpdateBody>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id, ...data } = request.body;
    const updatedLead = await updateLead(id, data);
    reply.send(updatedLead);
  }

  public static async create(
    request: FastifyRequest<CreateBody>,
    reply: FastifyReply,
  ): Promise<void> {
    const { name, email, telephone_number, history, selected_plan } = request.body;
    await createLead(name, email, telephone_number, history, selected_plan);

    try {
      await sendLeadConfirmationEmail(name, email, telephone_number, history, selected_plan);
    } catch (err) {
      request.log.error({ err }, "Falha ao enviar email de confirmação para o lead");
    }

    reply.code(201).send({ message: "Lead created!" });
  }

  public static async remove(request: FastifyRequest<LeadIdParams>, reply: FastifyReply): Promise<void> {
    await softDeleteLead(request.params.id);
    reply.send({ message: "Lead deleted!" });
  }

  public static async reactivate(
    request: FastifyRequest<LeadIdParams>,
    reply: FastifyReply,
  ): Promise<void> {
    await reactivateLead(request.params.id);
    reply.send({ message: "Lead reactivated!" });
  }
}
