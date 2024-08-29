import { jwt } from "@elysiajs/jwt";
import { t } from "elysia";

const JwtConfig = jwt({
  name: "jwt",
  secret: process.env.JWT_SECRET!,
  iss: "elysiajs-todo-app",
  exp: "1d",
  schema: t.Object({
    sub: t.String(),
    email: t.String(),
  }),
});

export default JwtConfig;
