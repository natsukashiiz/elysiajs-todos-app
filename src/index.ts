import { Elysia, t } from "elysia";
import staticPlugin from "@elysiajs/static";
import AuthenticationError from "./exceptions/authentication.error";
import AuthorizationError from "./exceptions/authorization.error";
import InvariantError from "./exceptions/invariant.error";
import ResultUtils from "./utils/result.utils";
import SwaggerConfig from "./config/swagger.config";
import AuthController from "./controllers/auth.controller";
import ProfileController from "./controllers/profile.controller";
import TodoController from "./controllers/todo.controller";
import FileController from "./controllers/file.controller";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .error("AUTHENTICATION_ERROR", AuthenticationError)
  .error("AUTHORIZATION_ERROR", AuthorizationError)
  .error("INVARIANT_ERROR", InvariantError)
  .onError(({ code, error, set }) => {
    const message = error.toString().replace("Error: ", "");
    switch (code) {
      case "AUTHENTICATION_ERROR":
        set.status = 401;
        return ResultUtils.fail(message);
      case "AUTHORIZATION_ERROR":
        set.status = 403;
        return ResultUtils.fail(message);
      case "INVARIANT_ERROR":
        set.status = 400;
        return ResultUtils.fail(message);
      case "NOT_FOUND":
        set.status = 404;
        return ResultUtils.fail("Not found :(");
      case "UNKNOWN":
      case "INTERNAL_SERVER_ERROR":
        set.status = 500;
        return ResultUtils.fail("Something went wrong!");
    }
  })
  .use(cors())
  .use(staticPlugin())
  .use(SwaggerConfig)
  .get("/", () => "Hello Elysiajs Todos App", { detail: { tags: ["App"] } })
  .get(
    "/public/:filename",
    ({ params: { filename } }) => {
      return Bun.file(`public/${filename}`);
    },
    {
      params: t.Object({
        filename: t.String({ minLength: 1 }),
      }),
      detail: {
        tags: ["App"],
      },
    }
  )
  .use(AuthController)
  .use(FileController)
  .use(ProfileController)
  .use(TodoController)
  .listen(process.env.PORT || 3000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
