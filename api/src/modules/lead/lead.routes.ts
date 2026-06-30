import z from "zod";
import { FastifyTypedInstance } from "../../shared/types/fastifyTypedInstance";
import { LeadController } from "./lead.controller";
import { authenticate } from "../../shared/utils/authHook";

import { createdLeadSchema, createLeadSchema, leadById, leadResponseSchema, notFoundSchema, updateLeadSchema } from "./lead.schema";

export default async function leadRoutes(server: FastifyTypedInstance) {
  // Get all coaches
  server.get(
    "/leads",
    {
      // preHandler: authenticate,
      schema: {
        tags: ["Lead"],
        description: "List leads",
        response: {
          200: z.array(leadResponseSchema),
        },
      },
    },
    LeadController.getAll,
  );

  // Get user by-id
  server.post(
    "/lead-by-id/:id",
    {
       preHandler: authenticate,
      schema: {
        tags: ["Lead"],
        description: "Get lead by ID",
        params: leadById,
        response: {
          200: leadResponseSchema.describe("Coach by ID from database"),
          404: notFoundSchema,
        },
      },
    },
    LeadController.getById,
  );

  // Update partially coach
  server.patch(
    "/update-lead",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Lead"],
        description: "Update lead by ID",
        body: updateLeadSchema,
        response: {
          200: leadResponseSchema.describe("Coach updated sucessfully"),
          404: notFoundSchema,
        },
      },
    },
    LeadController.update,
  );

  // Create lead
  server.post(
    "/leads",
    {
      schema: {
        description: "Create a new lead",
        tags: ["Lead"],
        body: createLeadSchema,
        response: {
          201: createdLeadSchema.describe("Coach created successfully"),
        },
      },
    },
    LeadController.create,
  );
}
