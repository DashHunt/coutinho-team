import z from "zod";
import { FastifyTypedInstance } from "../../shared/types/fastifyTypedInstance";
import { ClientController } from "./client.controller";
import { authenticate } from "../../shared/utils/authHook";
import {
  clientById,
  achievementParams,
  planHistoryParams,
  createClientSchema,
  updateClientSchema,
  updateClientInfoSchema,
  createAchievementSchema,
  addPlanHistorySchema,
  updatePlanHistoryStatusSchema,
  clientResponseSchema,
  clientInfoResponseSchema,
  achievementResponseSchema,
  planHistoryResponseSchema,
  notFoundSchema,
  createdClientSchema,
  deletedClientSchema,
  createdAchievementSchema,
  deletedAchievementSchema,
  createdPlanHistorySchema,
} from "./client.schema";

export default async function clientRoutes(server: FastifyTypedInstance) {
  // ===================== CLIENT CRUD =====================

  server.get(
    "/clients",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Client"],
        description: "List all active clients with their info and active plans",
        response: {
          200: z.array(clientResponseSchema),
        },
      },
    },
    ClientController.getAll,
  );

  server.post(
    "/client-by-id/:id",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Client"],
        description: "Get client by ID with full details",
        params: clientById,
        response: {
          200: clientResponseSchema.describe("Client by ID from database"),
          404: notFoundSchema,
        },
      },
    },
    ClientController.getById,
  );

  server.post(
    "/clients",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Client"],
        description: "Create a new client from lead. Creates client, plan history and client info in a single transaction.",
        body: createClientSchema,
        response: {
          201: createdClientSchema.describe("Client created successfully"),
          400: notFoundSchema,
        },
      },
    },
    ClientController.create,
  );

  server.patch(
    "/update-client",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Client"],
        description: "Update client basic info",
        body: updateClientSchema,
        response: {
          200: clientResponseSchema.describe("Client updated successfully"),
          404: notFoundSchema,
        },
      },
    },
    ClientController.update,
  );

  server.delete(
    "/clients/:id",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Client"],
        description: "Soft delete a client",
        params: clientById,
        response: {
          200: deletedClientSchema.describe("Client deleted successfully"),
          404: notFoundSchema,
        },
      },
    },
    ClientController.remove,
  );

  // ===================== CLIENT INFO =====================

  server.get(
    "/clients/:id/info",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Client - Info"],
        description: "Get current client info (training block)",
        params: clientById,
        response: {
          200: clientInfoResponseSchema,
          404: notFoundSchema,
        },
      },
    },
    ClientController.getInfo,
  );

  server.patch(
    "/clients/:id/info",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Client - Info"],
        description: "Update current client info (training block)",
        params: clientById,
        body: updateClientInfoSchema,
        response: {
          200: clientInfoResponseSchema.describe("ClientInfo updated successfully"),
          404: notFoundSchema,
        },
      },
    },
    ClientController.updateInfo,
  );

  // ===================== ACHIEVEMENTS =====================

  server.get(
    "/clients/:id/achievements",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Client - Achievements"],
        description: "List client achievements",
        params: clientById,
        response: {
          200: z.array(achievementResponseSchema),
        },
      },
    },
    ClientController.getAchievements,
  );

  server.post(
    "/clients/:id/achievements",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Client - Achievements"],
        description: "Add an achievement to the client",
        params: clientById,
        body: createAchievementSchema,
        response: {
          201: createdAchievementSchema.describe("Achievement created successfully"),
        },
      },
    },
    ClientController.createAchievement,
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
    ClientController.deleteAchievement,
  );

  // ===================== PLAN HISTORY =====================

  server.get(
    "/clients/:id/plan-history",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Client - Plan History"],
        description: "Get client plan history",
        params: clientById,
        response: {
          200: z.array(planHistoryResponseSchema),
        },
      },
    },
    ClientController.getPlanHistory,
  );

  server.post(
    "/clients/:id/plan-history",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Client - Plan History"],
        description: "Assign a new plan to the client",
        params: clientById,
        body: addPlanHistorySchema,
        response: {
          201: createdPlanHistorySchema.describe("Plan assigned successfully"),
          400: notFoundSchema,
        },
      },
    },
    ClientController.addPlanHistory,
  );

  server.patch(
    "/clients/:id/plan-history/:historyId",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Client - Plan History"],
        description: "Update the status of a client plan (ATIVO, INATIVO, EM_RENOVACAO)",
        params: planHistoryParams,
        body: updatePlanHistoryStatusSchema,
        response: {
          200: planHistoryResponseSchema.describe("Plan status updated successfully"),
        },
      },
    },
    ClientController.updatePlanHistoryStatus,
  );
}
