import z from "zod";
import { FastifyTypedInstance } from "../../shared/types/fastifyTypedInstance";
import { PlanController } from "./plan.controller";
import { authenticate } from "../../shared/utils/authHook";
import {
  planById,
  planResponseSchema,
  createPlanSchema,
  updatePlanSchema,
  notFoundSchema,
  createdPlanSchema,
  deletedPlanSchema,
} from "./plan.schema";

export default async function planRoutes(server: FastifyTypedInstance) {
  server.get(
    "/plans",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Plans"],
        description: "List all active plans",
        response: {
          200: z.array(planResponseSchema),
        },
      },
    },
    PlanController.getAll,
  );

  server.post(
    "/plan-by-id/:id",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Plans"],
        description: "Get plan by ID",
        params: planById,
        response: {
          200: planResponseSchema.describe("Plan by ID from database"),
          404: notFoundSchema,
        },
      },
    },
    PlanController.getById,
  );

  server.post(
    "/plans",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Plans"],
        description: "Create a new plan",
        body: createPlanSchema,
        response: {
          201: createdPlanSchema.describe("Plan created successfully"),
        },
      },
    },
    PlanController.create,
  );

  server.patch(
    "/update-plan",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Plans"],
        description: "Update plan by ID",
        body: updatePlanSchema,
        response: {
          200: planResponseSchema.describe("Plan updated successfully"),
          404: notFoundSchema,
        },
      },
    },
    PlanController.update,
  );

  server.delete(
    "/plans/:id",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Plans"],
        description: "Soft delete a plan",
        params: planById,
        response: {
          200: deletedPlanSchema.describe("Plan deleted successfully"),
          404: notFoundSchema,
        },
      },
    },
    PlanController.remove,
  );
}
