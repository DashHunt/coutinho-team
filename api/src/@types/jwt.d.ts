import "@fastify/jwt";
import { Role } from "../../generated/prisma/enums";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: number; email: string; role: Role; team_id: number }; // o que você assina no jwtSign
    user: { id: number; email: string; role: Role; team_id: number }; // o que aparece em request.user
  }
}
