import { FastifyReply } from "fastify";
import { prisma } from "../../../prisma/lib/prisma";
import { EmailNotFound, InvalidCredentialsError, NotFoundError } from "../../shared/middlewares/error";
import { comparePassword } from "../../shared/utils/hashPassword";
import { getUserByEmail } from "../users/user.model";

export const login = async (email: string, password: string, reply: FastifyReply) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new EmailNotFound("E-mail not found");
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new InvalidCredentialsError("E-mail or password is invalid");
  }

  const token = await reply.jwtSign({ id: user.id, email: user.email }, { expiresIn: "7d" });
  return token
};
