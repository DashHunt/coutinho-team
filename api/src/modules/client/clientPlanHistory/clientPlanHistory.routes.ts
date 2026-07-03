import z from "zod";
import { FastifyTypedInstance } from "../../../shared/types/fastifyTypedInstance";
import { ClientPlanHistoryController } from "./clientPlanHistory.controller";
import { authenticate } from "../../../shared/utils/authHook";
import {
  clientIdParams,
  planHistoryParams,
  addPlanHistorySchema,
  updatePlanHistoryStatusSchema,
  planHistoryResponseSchema,
  notFoundSchema,
  createdPlanHistorySchema,
} from "./clientPlanHistory.schema";

export default async function clientPlanHistoryRoutes(server: FastifyTypedInstance) {
  server.get(
    "/clients/:id/plan-history",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Client - Plan History"],
        description: "Get client plan history",
        params: clientIdParams,
        response: {
          200: z.array(planHistoryResponseSchema),
        },
      },
    },
    ClientPlanHistoryController.getPlanHistory,
  );

  server.post(
    "/clients/:id/plan-history",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Client - Plan History"],
        description: "Assign a new plan to the client",
        params: clientIdParams,
        body: addPlanHistorySchema,
        response: {
          201: createdPlanHistorySchema.describe("Plan assigned successfully"),
          400: notFoundSchema,
        },
      },
    },
    ClientPlanHistoryController.addPlanHistory,
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
    ClientPlanHistoryController.updatePlanHistoryStatus,
  );
}
