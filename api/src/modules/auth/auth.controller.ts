import { FastifyReply, FastifyRequest } from "fastify";
import { comparePassword } from "../../shared/utils/hashPassword";
import { getUserByEmail } from "../users/user.model";
import { login } from "./auth.model";
import { EmailNotFound, InvalidCredentialsError } from "../../shared/middlewares/error";

type LoginBody = { email: string; password: string };

export class AuthController {
  public static async login(
    request: FastifyRequest<{ Body: LoginBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    const { email, password } = request.body;
    const token = await login(email, password, reply);
    reply.send({ token });
  }
}
