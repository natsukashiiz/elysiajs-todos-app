import Elysia, { Static, t } from "elysia";

const login = t.Object({
  email: t.String({ format: "email", maxLength: 255 }),
  password: t.String({ minLength: 4, maxLength: 32 }),
});

const signup = t.Object({
  email: t.String({ format: "email", maxLength: 255 }),
  password: t.String({ minLength: 4, maxLength: 32 }),
});

const AuthModel = new Elysia({ name: "Model.Auth" }).model({
  "auth.login": login,
  "auth.signup": signup,
});

export type Login = Static<typeof login>;
export type Signup = Static<typeof signup>;

export default AuthModel;
