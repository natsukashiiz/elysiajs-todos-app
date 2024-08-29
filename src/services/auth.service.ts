import InvariantError from "../exceptions/invariant.error";
import { Login, Signup } from "../models/auth.model";
import { prisma } from "../prisma";
import ResultUtils from "../utils/result.utils";

export default class AuthService {
  async login(jwt: any, body: Login) {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      throw new InvariantError("Invalid email or password");
    }

    const passwordMatched = await Bun.password.verify(
      body.password,
      user.password
    );

    if (!passwordMatched) {
      throw new InvariantError("Invalid email or password");
    }

    const token = await jwt.sign({
      sub: user.id.toString(),
      email: user.email,
    });

    return ResultUtils.success({
      token,
    });
  }

  async signup(jwt: any, body: Signup) {
    const existingEmail = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (existingEmail) {
      throw new InvariantError("Email already exists");
    }

    const passwordHash = await Bun.password.hash(body.password, {
      algorithm: "bcrypt",
      cost: 10,
    });

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: passwordHash,
        nickname: (Math.random() + 1).toString(36).substring(7),
      },
    });

    const token = await jwt.sign({
      sub: user.id.toString(),
      email: user.email,
    });

    return ResultUtils.success({
      token,
    });
  }
}
