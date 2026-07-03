import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import clientRoutes from "./client/client.routes";
import clientInfoRoutes from "./clientInfo/clientInfo.routes";
import clientPlanHistoryRoutes from "./clientPlanHistory/clientPlanHistory.routes";
import clientAchievementsRoutes from "./clientAchievements/clientAchievements.routes";
import clientFeedbackRoutes from "./clientFeedback/clientFeedback.routes";

async function ClientModules(fastify: FastifyInstance) {
  fastify.register(clientRoutes);
  fastify.register(clientInfoRoutes);
  fastify.register(clientPlanHistoryRoutes);
  fastify.register(clientAchievementsRoutes);
  fastify.register(clientFeedbackRoutes);
}

export default fp(ClientModules, { name: "client-module" });
