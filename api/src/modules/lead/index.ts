import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import leadRoutes from "./lead.routes";

async function LeadModules(fastify: FastifyInstance) {
  fastify.register(leadRoutes);
}

export default fp(LeadModules, { name: "lead-module" });
