import Elysia from "elysia";
import AuthModel from "../models/auth.model";
import AuthService from "../services/auth.service";
import JwtConfig from "../config/jwt.config";

const AuthController = new Elysia({ prefix: "/v1/auth" })
  .use(JwtConfig)
  .use(AuthModel)
  .decorate({
    authService: new AuthService(),
  })
  .post(
    "/login",
    ({ jwt, body, authService }) => {
      return authService.login(jwt, body);
    },
    {
      body: "auth.login",
      detail: {
        tags: ["Auth"],
      },
    }
  )
  .post(
    "/signup",
    ({ jwt, body, authService }) => {
      return authService.signup(jwt, body);
    },
    {
      body: "auth.signup",
      detail: {
        tags: ["Auth"],
      },
    }
  );

export default AuthController;
