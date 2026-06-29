import { FastifyRequest, FastifyReply } from "fastify";
import { createLead, getLeadById, getLeads, updateLead } from "./lead.model";
import { hashPassword } from "../../shared/utils/hashPassword";
import { sendLeadConfirmationEmail } from "../../shared/utils/mailer";

type GetByIdBody = { Params: { id: number } };
type UpdateBody = {
  Body: {
    id: number;
    name: string;
    email: string;
    telephone_number: string;
    history: string;
    selected_plan: string;
  };
};
type CreateBody = {
  Body: {
    name: string;
    email: string;
    telephone_number: string;
    history: string;
    selected_plan: string;
    status: string;
  };
};

export class LeadController {
  public static async getAll(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    reply.send(await getLeads());
  }

  public static async getById(
    request: FastifyRequest<GetByIdBody>,
    reply: FastifyReply,
  ): Promise<void> {
    const id = request.params.id;
    const coach = await getLeadById(id);

    if (!coach) {
      return reply.code(404).send({ message: "Coach not found" });
    }

    reply.send(coach);
  }

  public static async update(
    request: FastifyRequest<UpdateBody>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id, name, email, telephone_number, history, selected_plan } = request.body;
    const user = await getLeadById(id);

    if (!user) {
      return reply.code(404).send({ message: "Coach not found" });
    }

    const updatedCoach = await updateLead(
      id,
      name,
      email,
      telephone_number,
      history,
      selected_plan,
    );
    reply.send(updatedCoach);
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

    reply.code(201).send({ message: "Coach created!" });
  }
}
