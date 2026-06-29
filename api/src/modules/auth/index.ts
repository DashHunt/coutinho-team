import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import loginRoutes from "./auth.routes";

async function loginModules(fastify: FastifyInstance) {
  fastify.register(loginRoutes);
}

export default fp(loginModules, { name: "auth-module" });
