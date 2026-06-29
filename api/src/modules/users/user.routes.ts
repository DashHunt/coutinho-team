import z from "zod";
import { FastifyTypedInstance } from "../../shared/types/fastifyTypedInstance";
import { UserController } from "./user.controller";
import { authenticate } from "../../shared/utils/authHook";

import {
  createUser,
  notFound,
  updateUser,
  userByEmail,
  userById,
  userResponse,
} from "./user.schema";

export default async function userRoutes(server: FastifyTypedInstance) {
  // Get all coaches
  server.get(
    "/user",
    {
      // preHandler: authenticate,
      schema: {
        tags: ["User"],
        description: "List users",
        response: {
          200: z.array(userResponse),
        },
      },
    },
    UserController.getAll,
  );

 
  // Get user by-id
  server.get(
    "/user-by-id/:id",
    {
      preHandler: authenticate,
      schema: {
        tags: ["User"],
        description: "Get user by ID",
        params: userById,
        response: {
          200: userResponse.describe("Coach by ID from database"),
          404: notFound,
        },
      },
    },
    UserController.getById,
  );


   // Get user by email
  server.post(
    "/user-by-email",
    {
      preHandler: authenticate,
      schema: {
        tags: ["User"],
        description: "Get user by e-mail",
        body: userByEmail,
        response: {
          200: userResponse.describe("Coach by email from database"),
          404: notFound,
        },
      },
    },
    UserController.getByEmail,
  );
  

  // Update partially coach
  server.patch(
    "/update-user",
    {
      preHandler: authenticate,
      schema: {
        tags: ["User"],
        description: "Update user by ID",
        body: updateUser,
        response: {
          200: userResponse.describe("Coach updated sucessfully"),
          404: notFound,
        },
      },
    },
    UserController.update,
  );

  // Create coach
  server.post(
    "/user",
    {
      schema: {
        description: "Create a new user",
        tags: ["User"],
        body: createUser,
        response: {
          201: z.object({ message: z.string() }),
        },
      },
    },
    UserController.create,
  );
}
