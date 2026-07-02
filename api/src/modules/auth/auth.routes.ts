import { FastifyTypedInstance } from "../../shared/types/fastifyTypedInstance";
import { AuthController } from "./auth.controller";
import {
  invalidCredentialsSchema,
  loginResponseSchema,
  loginSchema,
  refreshResponseSchema,
  logoutResponseSchema,
} from "./auth.schema";

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

  // Refresh
  server.post(
    "/refresh-token",
    {
      schema: {
        tags: ["Login"],
        description: "Rotate refresh token and issue a new access token",
        response: {
          200: refreshResponseSchema.describe("New access token issued"),
          401: invalidCredentialsSchema.describe("Refresh token ausente ou inválido"),
        },
      },
    },
    AuthController.refresh,
  );

  // Logout
  server.post(
    "/logout",
    {
      schema: {
        tags: ["Login"],
        description: "Revoke refresh token and clear the session cookie",
        response: {
          200: logoutResponseSchema,
        },
      },
    },
    AuthController.logout,
  );
}
