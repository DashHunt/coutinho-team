import { FastifyRequest, FastifyReply } from "fastify";
import { getAchievements, createAchievement, softDeleteAchievement } from "./clientAchievements.model";

type ClientIdParams = { Params: { id: number } };
type AchievementParams = { Params: { id: number; achievementId: number } };

type CreateAchievementBody = {
  Params: { id: number };
  Body: {
    event: string;
    event_level: "ESTADUAL" | "NACIONAL" | "INTERNACIONAL";
    event_achievement: "OURO" | "PRATA" | "BRONZE" | "RECORDE" | "PARTICIPACAO";
    event_date: string;
  };
};

export class ClientAchievementsController {
  public static async getAchievements(
    request: FastifyRequest<ClientIdParams>,
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
}
