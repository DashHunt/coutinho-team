import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import rateLimit from "@fastify/rate-limit";
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

const server = fastify({ logger: true });

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifyCors, { origin: "*" });

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

server.register(rateLimit, {
  max: 5,
  timeWindow: "1 minute",
});

server.register(LeadModules);
server.register(LoginModules);
server.register(userModules);
server.register(PlanModules);
server.register(ClientModules);

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("SERVER RUNNING ON PORT 3333");
});
