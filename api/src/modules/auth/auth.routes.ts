import { FastifyTypedInstance } from "../../shared/types/fastifyTypedInstance";
import { AuthController } from "./auth.controller";
import { invalidCredentialsSchema, loginResponseSchema, loginSchema } from "./auth.schema";

export default async function loginRoutes(server: FastifyTypedInstance) {
  // Login
  server.post(
    "/login",
    {
      schema: {
        tags: ["Login"],
        description: "Login coach",
        body: loginSchema,
        response: {
          200: loginResponseSchema.describe("Login made sucessfully"),
          401: invalidCredentialsSchema.describe("Invalid credentials"),
          404: invalidCredentialsSchema.describe("E-mail not found"),
        },
      },
    },
    AuthController.login,
  );
}
