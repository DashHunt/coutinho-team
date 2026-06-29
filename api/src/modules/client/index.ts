import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import clientRoutes from "./client.routes";

async function ClientModules(fastify: FastifyInstance) {
  fastify.register(clientRoutes);
}

export default fp(ClientModules, { name: "client-module" });
