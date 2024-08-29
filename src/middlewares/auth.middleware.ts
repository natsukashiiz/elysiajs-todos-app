import Elysia from "elysia";
import { prisma } from "../prisma";
import AuthenticationError from "../exceptions/authentication.error";
import bearer from "@elysiajs/bearer";
import JwtConfig from "../config/jwt.config";
import AuthorizationError from "../exceptions/authorization.error";

const AuthMiddleware = new Elysia({ name: "Plugin.Auth" })
  .use(JwtConfig)
  .use(bearer())
  .derive({ as: "scoped" }, async ({ jwt, bearer }) => {
    if (!bearer) {
      throw new AuthenticationError("Authorization header is required");
    }

    const payload = await jwt.verify(bearer);
    if (!payload) {
      throw new AuthenticationError("Invalid token");
    }

    if (!payload.sub) {
      throw new AuthenticationError("Invalid token");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: +payload.sub,
      },
      select: {
        id: true,
        email: true,
        email_verified: true,
        avatar: true,
        nickname: true,
      },
    });

    if (!user) {
      throw new AuthorizationError("Permission denied");
    }

    return {
      user,
    };
  });

export default AuthMiddleware;
