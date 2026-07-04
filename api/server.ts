import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { fastifyCookie } from "@fastify/cookie";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";

import LeadModules from "./src/modules/lead/index";
import LoginModules from "./src/modules/auth/index";
import userModules from "./src/modules/users/index";
import PlanModules from "./src/modules/plans/index";
import ClientModules from "./src/modules/client/index";
import fastifyJwt from "@fastify/jwt";
import { errorHandler } from "./src/shared/middlewares/errorHandler";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifyCors, {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
});

server.register(fastifyCookie);

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Coutinho Team API",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

server.register(fastifySwaggerUi, {
  routePrefix: "/api-docs",
});

server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET as string,
});

server.setErrorHandler(errorHandler);

server.register(LeadModules);
server.register(LoginModules);
server.register(userModules);
server.register(PlanModules);
server.register(ClientModules);

server.listen({ port: 8080, host: "0.0.0.0" }).then(() => {
  console.log("SERVER RUNNING ON PORT 8080");
});
