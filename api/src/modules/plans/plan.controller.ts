import { FastifyRequest, FastifyReply } from "fastify";
import {
  getPlans,
  getPlanById,
  createPlan,
  updatePlan,
  softDeletePlan,
} from "./plan.model";

type GetByIdParams = { Params: { id: number } };
type CreateBody = {
  Body: {
    name: string;
    mode: string;
    duration: number;
    monthly_value: number;
    total_value: number;
    status: string;
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
    status: string;
  };
};
type DeleteParams = { Params: { id: number } };

export class PlanController {
  public static async getAll(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    reply.send(await getPlans());
  }

  public static async getById(
    request: FastifyRequest<GetByIdParams>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id } = request.params;
    const plan = await getPlanById(id);

    if (!plan) {
      return reply.code(404).send({ message: "Plan not found" });
    }

    reply.send(plan);
  }

  public static async create(
    request: FastifyRequest<CreateBody>,
    reply: FastifyReply,
  ): Promise<void> {
    const { name, mode, duration, monthly_value, total_value, status } = request.body;
    await createPlan(name, mode, duration, monthly_value, total_value, status);
    reply.code(201).send({ message: "Plan created!" });
  }

  public static async update(
    request: FastifyRequest<UpdateBody>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id, name, mode, duration, monthly_value, total_value, status } = request.body;
    const plan = await getPlanById(id);

    if (!plan) {
      return reply.code(404).send({ message: "Plan not found" });
    }

    const updated = await updatePlan(id, name, mode, duration, monthly_value, total_value, status);
    reply.send(updated);
  }

  public static async remove(
    request: FastifyRequest<DeleteParams>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id } = request.params;
    const plan = await getPlanById(id);

    if (!plan) {
      return reply.code(404).send({ message: "Plan not found" });
    }

    await softDeletePlan(id);
    reply.send({ message: "Plan deleted!" });
  }
}
