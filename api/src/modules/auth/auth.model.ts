import { prisma } from "../../../prisma/lib/prisma";
import { InvalidCredentialsError } from "../../shared/middlewares/error";
import { comparePassword } from "../../shared/utils/hashPassword";
import { getUserByEmail } from "../users/user.model";
import { hashRefreshToken } from "../../shared/utils/refreshToken";

export const validateCredentials = async (email: string, password: string) => {
  const user = await getUserByEmail(email); // já lança EmailNotFound se não existir

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new InvalidCredentialsError("E-mail or password is invalid");
  }

  return user;
};

export const storeRefreshToken = async (userId: number, token: string, expiresAt: Date) => {
  return await prisma.refreshToken.create({
    data: { user_id: userId, token_hash: hashRefreshToken(token), expires_at: expiresAt },
  });
};

export const findValidRefreshToken = async (token: string) => {
  return await prisma.refreshToken.findFirst({
    where: { token_hash: hashRefreshToken(token), revoked: false, expires_at: { gt: new Date() } },
    include: { user: true },
  });
};

export const revokeRefreshToken = async (id: number) => {
  return await prisma.refreshToken.update({ where: { id }, data: { revoked: true } });
};
