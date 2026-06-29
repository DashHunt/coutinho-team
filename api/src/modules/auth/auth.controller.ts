import { FastifyReply, FastifyRequest } from "fastify";
import { comparePassword } from "../../shared/utils/hashPassword";
import { getUserByEmail } from "../users/user.model";

type LoginBody = { email: string; password: string };

export class AuthController {
  public static async login(
    request: FastifyRequest<{ Body: LoginBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    const { email, password } = request.body;
    const user = await getUserByEmail(email);

    if (!user) {
      return reply.code(401).send({ message: "Invalid credentials" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return reply.code(401).send({ message: "Invalid credentials" });
    }

    const token = await reply.jwtSign({ id: user.id, email: user.email }, { expiresIn: "7d" });
    reply.send({ token });
  }
}
