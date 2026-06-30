import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import feedbackRoutes from "./feedback.routes";

async function FeedbackModules(fastify: FastifyInstance) {
  fastify.register(feedbackRoutes);
}

export default fp(FeedbackModules, { name: "feedback-module" });
