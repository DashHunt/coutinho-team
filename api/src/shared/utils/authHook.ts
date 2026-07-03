import { FastifyReply, FastifyRequest } from "fastify";
import { Role } from "../../../generated/prisma/enums";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch {
    reply.code(401).send({ message: "Unauthorized" });
  }
}

export function authorize(...allowedRoles: Role[]) {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    if (!allowedRoles.includes(request.user.role)) {
      reply.code(403).send({ message: "Acesso não permitido para essa role" });
    }
  };
}
