import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import planRoutes from "./plan.routes";

async function PlanModules(fastify: FastifyInstance) {
  fastify.register(planRoutes);
}

export default fp(PlanModules, { name: "plan-module" });
