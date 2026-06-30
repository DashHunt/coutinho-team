import z from "zod";
import { FastifyTypedInstance } from "../../shared/types/fastifyTypedInstance";
import { FeedbackController } from "./feedback.controller";
import { authenticate } from "../../shared/utils/authHook";
import {
  feedbackByClientId,
  feedbackById,
  createFeedbackSchema,
  feedbackResponseSchema,
  notFoundSchema,
  createdFeedbackSchema,
  deletedFeedbackSchema,
  topThreeResponse,
} from "./feedback.schema";

export default async function feedbackRoutes(server: FastifyTypedInstance) {
  server.get(
    "/feedbacks",
    {
      schema: {
        tags: ["Feedback"],
        description: "Get all feedbacks",
        response: {
          200: z.array(feedbackResponseSchema),
        },
      },
    },
    FeedbackController.getAll,
  );

  server.get(
    "/feedbacks/topThree",
    {
      schema: {
        tags: ["Feedback"],
        description: "Get all feedbacks",
        response: {
          200: z.array(topThreeResponse).describe('Take the first three from database'),
        },
      },
    },
    FeedbackController.getFirstThree,
  );

  server.get(
    "/feedbacks/:clientId",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Feedback"],
        description: "List all feedbacks from a client",
        params: feedbackByClientId,
        response: {
          200: z.array(feedbackResponseSchema),
        },
      },
    },
    FeedbackController.getByClient,
  );

  server.post(
    "/feedbacks",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Feedback"],
        description:
          "Create a new feedback for a client (PROMOTOR = 9-10, PASSIVO = 7-8, DETRATOR = 0-6)",
        body: createFeedbackSchema,
        response: {
          201: createdFeedbackSchema.describe("Feedback created successfully"),
          404: notFoundSchema,
        },
      },
    },
    FeedbackController.create,
  );

  server.delete(
    "/feedbacks/:feedbackId",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Feedback"],
        description: "Soft delete a feedback",
        params: feedbackById,
        response: {
          200: deletedFeedbackSchema.describe("Feedback deleted successfully"),
        },
      },
    },
    FeedbackController.remove,
  );
}
