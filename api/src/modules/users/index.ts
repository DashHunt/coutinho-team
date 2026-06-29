import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import userRoutes from "./user.routes";

async function userModules(fastify: FastifyInstance) {
  fastify.register(userRoutes);
}

export default fp(userModules, { name: "user-module" });
