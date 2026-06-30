import { FastifyRequest, FastifyReply } from "fastify";
import { getFeedbacksByClient, createFeedback, softDeleteFeedback, getAll, getFirstThree } from "./feedback.model";

type GetByClientParams = { Params: { clientId: number } };
type DeleteParams = { Params: { feedbackId: number } };
type CreateBody = {
  Body: {
    client_id: number;
    feedback: string;
    feedback_nps: "PROMOTOR" | "PASSIVO" | "DETRATOR";
  };
};

export class FeedbackController {
  public static async getAll(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    reply.send(await getAll());
  }

  public static async getFirstThree(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    reply.send(await getFirstThree());
  }

  public static async getByClient(
    request: FastifyRequest<GetByClientParams>,
    reply: FastifyReply,
  ): Promise<void> {
    const { clientId } = request.params;
    reply.send(await getFeedbacksByClient(clientId));
  }

  public static async create(
    request: FastifyRequest<CreateBody>,
    reply: FastifyReply,
  ): Promise<void> {
    const { client_id, feedback, feedback_nps } = request.body;
    await createFeedback(client_id, feedback, feedback_nps);
    reply.code(201).send({ message: "Feedback created!" });
  }

  public static async remove(
    request: FastifyRequest<DeleteParams>,
    reply: FastifyReply,
  ): Promise<void> {
    const { feedbackId } = request.params;
    await softDeleteFeedback(feedbackId);
    reply.send({ message: "Feedback deleted!" });
  }
}
