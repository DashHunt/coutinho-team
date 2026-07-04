import { FastifyTypedInstance } from "../../shared/types/fastifyTypedInstance";
import { LeadController } from "./lead.controller";
import { authenticate } from "../../shared/utils/authHook";

import {
  createdLeadSchema,
  createLeadSchema,
  deletedLeadSchema,
  leadById,
  leadResponseSchema,
  listLeadsQuerySchema,
  notFoundSchema,
  paginatedLeadResponseSchema,
  reactivatedLeadSchema,
  updateLeadSchema,
} from "./lead.schema";

export default async function leadRoutes(server: FastifyTypedInstance) {
  // List leads (paginated, com busca e filtro por status)
  server.get(
    "/leads",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Lead"],
        description: "List leads (paginated, com busca por nome/email e filtro por status)",
        querystring: listLeadsQuerySchema,
        response: {
          200: paginatedLeadResponseSchema,
        },
      },
    },
    LeadController.getAll,
  );

  // Get lead by-id
  server.post(
    "/lead-by-id/:id",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Lead"],
        description: "Get lead by ID",
        params: leadById,
        response: {
          200: leadResponseSchema.describe("Lead by ID from database"),
          404: notFoundSchema,
        },
      },
    },
    LeadController.getById,
  );

  // Update partially lead
  server.patch(
    "/update-lead",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Lead"],
        description: "Update lead by ID",
        body: updateLeadSchema,
        response: {
          200: leadResponseSchema.describe("Lead updated sucessfully"),
          404: notFoundSchema,
        },
      },
    },
    LeadController.update,
  );

  // Create lead (rota pública usada pelo site institucional — não mexer na ausência de auth)
  server.post(
    "/leads",
    {
      schema: {
        description: "Create a new lead",
        tags: ["Lead"],
        body: createLeadSchema,
        response: {
          201: createdLeadSchema.describe("Lead created successfully"),
        },
      },
    },
    LeadController.create,
  );

  // Soft delete lead
  server.delete(
    "/leads/:id",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Lead"],
        description: "Soft delete a lead",
        params: leadById,
        response: {
          200: deletedLeadSchema.describe("Lead deleted successfully"),
          404: notFoundSchema,
        },
      },
    },
    LeadController.remove,
  );

  // Reactivate soft-deleted lead
  server.patch(
    "/leads/:id/reactivate",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Lead"],
        description: "Reactivate a soft-deleted lead",
        params: leadById,
        response: {
          200: reactivatedLeadSchema.describe("Lead reactivated successfully"),
          404: notFoundSchema,
        },
      },
    },
    LeadController.reactivate,
  );
}
