import { FastifyReply, FastifyRequest } from "fastify";
import {
  validateCredentials,
  storeRefreshToken,
  findValidRefreshToken,
  revokeRefreshToken,
} from "./auth.model";
import { generateRefreshToken, REFRESH_TOKEN_TTL_MS } from "../../shared/utils/refreshToken";
import { Role } from "../../../generated/prisma/enums";
import { InvalidCredentialsError } from "../../shared/middlewares/error";

type LoginBody = { Body: { email: string; password: string } };

const REFRESH_COOKIE_NAME = "refreshToken";
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: REFRESH_TOKEN_TTL_MS / 1000,
};

async function issueTokens(
  reply: FastifyReply,
  user: { id: number; email: string; role: Role; team_id: number },
) {
  const accessToken = await reply.jwtSign(
    { id: user.id, email: user.email, role: user.role, team_id: user.team_id },
    { expiresIn: "15m" },
  );

  const refreshToken = generateRefreshToken();
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS);
  await storeRefreshToken(user.id, refreshToken, expiresAt);
  reply.setCookie(REFRESH_COOKIE_NAME, refreshToken, REFRESH_COOKIE_OPTIONS);

  return accessToken;
}

export class AuthController {
  public static async login(
    request: FastifyRequest<LoginBody>,
    reply: FastifyReply,
  ): Promise<void> {
    const { email, password } = request.body;
    const user = await validateCredentials(email, password);
    const token = await issueTokens(reply, user);
    reply.send({ token });
  }

  public static async refresh(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const cookieToken = request.cookies[REFRESH_COOKIE_NAME];
    if (!cookieToken) {
      throw new InvalidCredentialsError("Refresh token ausente");
    }

    const storedToken = await findValidRefreshToken(cookieToken);
    if (!storedToken) {
      throw new InvalidCredentialsError("Refresh token inválido");
    }

    await revokeRefreshToken(storedToken.id); // rotação: invalida o antigo
    const token = await issueTokens(reply, storedToken.user);
    reply.send({ token });
  }

  public static async logout(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const cookieToken = request.cookies[REFRESH_COOKIE_NAME];
    if (cookieToken) {
      const storedToken = await findValidRefreshToken(cookieToken);
      if (storedToken) {
        await revokeRefreshToken(storedToken.id);
      }
    }
    reply.clearCookie(REFRESH_COOKIE_NAME, { path: "/" });
    reply.send({ message: "Logout realizado" });
  }
}
