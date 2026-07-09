import { FastifyRequest, FastifyReply } from "fastify";
import {
  getPlans,
  getPlanById,
  createPlan,
  updatePlan,
  softDeletePlan,
  reactivatePlan,
} from "./plan.model";

type PlanIdParams = { Params: { id: number } };

type ListQuery = {
  Querystring: {
    page: number;
    limit: number;
    search?: string;
    status?: "ATIVO" | "INATIVO";
    deleted: boolean;
  };
};

type CreateBody = {
  Body: {
    name: string;
    mode: string;
    duration: number;
    monthly_value: number;
    total_value: number;
    status: "ATIVO" | "INATIVO";
  };
};

type UpdateBody = {
  Body: {
    id: number;
    name: string;
    mode: string;
    duration: number;
    monthly_value: number;
    total_value: number;
    status: "ATIVO" | "INATIVO";
  };
};

export class PlanController {
  public static async getAll(request: FastifyRequest<ListQuery>, reply: FastifyReply): Promise<void> {
    reply.send(await getPlans(request.query));
  }

  public static async getById(
    request: FastifyRequest<PlanIdParams>,
    reply: FastifyReply,
  ): Promise<void> {
    const plan = await getPlanById(request.params.id);
    reply.send(plan);
  }

  public static async create(
    request: FastifyRequest<CreateBody>,
    reply: FastifyReply,
  ): Promise<void> {
    await createPlan(request.body);
    reply.code(201).send({ message: "Plan created!" });
  }

  public static async update(
    request: FastifyRequest<UpdateBody>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id, ...data } = request.body;
    const updatedPlan = await updatePlan(id, data);
    reply.send(updatedPlan);
  }

  public static async remove(request: FastifyRequest<PlanIdParams>, reply: FastifyReply): Promise<void> {
    await softDeletePlan(request.params.id);
    reply.send({ message: "Plan deleted!" });
  }

  public static async reactivate(
    request: FastifyRequest<PlanIdParams>,
    reply: FastifyReply,
  ): Promise<void> {
    await reactivatePlan(request.params.id);
    reply.send({ message: "Plan reactivated!" });
  }
}
