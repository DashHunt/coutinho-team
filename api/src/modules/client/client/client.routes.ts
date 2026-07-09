import z from "zod";
import { FastifyTypedInstance } from "../../../shared/types/fastifyTypedInstance";
import { ClientController } from "./client.controller";
import { authenticate } from "../../../shared/utils/authHook";
import {
  clientById,
  createClientSchema,
  updateClientSchema,
  listClientsQuerySchema,
  clientResponseSchema,
  paginatedClientResponseSchema,
  countResponseSchema,
  topMedalistResponseSchema,
  notFoundSchema,
  conflictSchema,
  createdClientSchema,
  deletedClientSchema,
  reactivatedClientSchema,
} from "./client.schema";

export default async function clientRoutes(server: FastifyTypedInstance) {
  // ===================== STATS (registrar antes das rotas com :id) =====================

  server.get(
    "/clients/count",
    {
      schema: {
        tags: ["Client - Stats"],
        description: "Count total registered athletes",
        response: {
          200: countResponseSchema,
        },
      },
    },
    ClientController.getAthletesCount,
  );

  server.get(
    "/clients/top-medals",
    {
      schema: {
        tags: ["Client - Stats"],
        description: "Top 3 athletes by total medal count (dados públicos enxutos, sem PII)",
        response: {
          200: z.array(topMedalistResponseSchema),
        },
      },
    },
    ClientController.getTop3Medalists,
  );

  server.get(
    "/clients/medals/total",
    {
      schema: {
        tags: ["Client - Stats"],
        description: "Total medals count across all athletes",
        response: {
          200: countResponseSchema,
        },
      },
    },
    ClientController.getMedalsTotal,
  );

  server.get(
    "/clients/medals/estadual",
    {
      schema: {
        tags: ["Client - Stats"],
        description: "Total ESTADUAL medals count",
        response: {
          200: countResponseSchema,
        },
      },
    },
    ClientController.getMedalsEstadual,
  );

  server.get(
    "/clients/medals/nacional",
    {
      schema: {
        tags: ["Client - Stats"],
        description: "Total NACIONAL medals count",
        response: {
          200: countResponseSchema,
        },
      },
    },
    ClientController.getMedalsNacional,
  );

  // ===================== CLIENT CRUD =====================

  server.get(
    "/clients",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Client"],
        description: "List clients (paginated, com busca por nome/email e filtro por status do plano atual)",
        querystring: listClientsQuerySchema,
        response: {
          200: paginatedClientResponseSchema,
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
        description:
          "Create a new client, either standalone or from a lead conversion. Creates client, plan history and client info in a single transaction.",
        body: createClientSchema,
        response: {
          201: createdClientSchema.describe("Client created successfully"),
          404: notFoundSchema.describe("Plan or Lead not found"),
          409: conflictSchema.describe("Lead already converted to a client"),
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

  server.patch(
    "/clients/:id/reactivate",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Client"],
        description: "Reactivate a soft-deleted client",
        params: clientById,
        response: {
          200: reactivatedClientSchema.describe("Client reactivated successfully"),
          404: notFoundSchema,
        },
      },
    },
    ClientController.reactivate,
  );
}
