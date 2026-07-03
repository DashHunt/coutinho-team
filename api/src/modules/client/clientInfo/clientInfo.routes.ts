import { FastifyTypedInstance } from "../../../shared/types/fastifyTypedInstance";
import { ClientInfoController } from "./clientInfo.controller";
import { authenticate } from "../../../shared/utils/authHook";
import {
  clientIdParams,
  updateClientInfoSchema,
  clientInfoResponseSchema,
  notFoundSchema,
} from "./clientInfo.schema";

export default async function clientInfoRoutes(server: FastifyTypedInstance) {
  server.get(
    "/clients/:id/info",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Client - Info"],
        description: "Get current client info (training block)",
        params: clientIdParams,
        response: {
          200: clientInfoResponseSchema,
          404: notFoundSchema,
        },
      },
    },
    ClientInfoController.getInfo,
  );

  server.patch(
    "/clients/:id/info",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Client - Info"],
        description: "Update current client info (training block)",
        params: clientIdParams,
        body: updateClientInfoSchema,
        response: {
          200: clientInfoResponseSchema.describe("ClientInfo updated successfully"),
          404: notFoundSchema,
        },
      },
    },
    ClientInfoController.updateInfo,
  );
}
