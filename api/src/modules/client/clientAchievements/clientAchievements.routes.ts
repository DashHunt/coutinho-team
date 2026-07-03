import z from "zod";
import { FastifyTypedInstance } from "../../../shared/types/fastifyTypedInstance";
import { ClientAchievementsController } from "./clientAchievements.controller";
import { authenticate } from "../../../shared/utils/authHook";
import {
  clientIdParams,
  achievementParams,
  createAchievementSchema,
  achievementResponseSchema,
  createdAchievementSchema,
  deletedAchievementSchema,
} from "./clientAchievements.schema";

export default async function clientAchievementsRoutes(server: FastifyTypedInstance) {
  server.get(
    "/clients/:id/achievements",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Client - Achievements"],
        description: "List client achievements",
        params: clientIdParams,
        response: {
          200: z.array(achievementResponseSchema),
        },
      },
    },
    ClientAchievementsController.getAchievements,
  );

  server.post(
    "/clients/:id/achievements",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Client - Achievements"],
        description: "Add an achievement to the client",
        params: clientIdParams,
        body: createAchievementSchema,
        response: {
          201: createdAchievementSchema.describe("Achievement created successfully"),
        },
      },
    },
    ClientAchievementsController.createAchievement,
  );

  server.delete(
    "/clients/:id/achievements/:achievementId",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Client - Achievements"],
        description: "Soft delete a client achievement",
        params: achievementParams,
        response: {
          200: deletedAchievementSchema.describe("Achievement deleted successfully"),
        },
      },
    },
    ClientAchievementsController.deleteAchievement,
  );
}
