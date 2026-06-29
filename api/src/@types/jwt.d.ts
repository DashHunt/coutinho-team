import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: number; email: string }; // o que você assina no jwtSign
    user: { id: number; email: string }; // o que aparece em request.user
  }
}
