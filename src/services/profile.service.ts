import { type user } from "@prisma/client";
import {
  UpdateAvatar,
  UpdatePassword,
  UpdateProfile,
} from "../models/profile.model";
import { prisma } from "../prisma";
import ResultUtils from "../utils/result.utils";
import InvariantError from "../exceptions/invariant.error";
import { NotFoundError } from "elysia";
import AuthorizationError from "../exceptions/authorization.error";

export default class ProfileService {
  async getProfile(user: Partial<user>) {
    return ResultUtils.success(user);
  }

  async updateProfile(user_id: number, body: UpdateProfile) {
    const result = await prisma.user.update({
      where: { id: user_id },
      data: {
        nickname: body.nickname,
      },
      select: {
        id: true,
        email: true,
        email_verified: true,
        avatar: true,
        nickname: true,
      },
    });

    return ResultUtils.successWithMessage(
      result,
      "Profile updated successfully"
    );
  }

  async updateAvatar(user_id: number, body: UpdateAvatar) {
    const result = await prisma.user.update({
      where: { id: user_id },
      data: {
        avatar: body.avatar,
      },
      select: {
        id: true,
        email: true,
        email_verified: true,
        avatar: true,
        nickname: true,
      },
    });

    return ResultUtils.successWithMessage(
      result,
      "Avatar updated successfully"
    );
  }

  async updatePassword(user_id: number, body: UpdatePassword) {
    const currentUser = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!currentUser) {
      throw new AuthorizationError("Permission denied");
    }

    const passwordMatched = await Bun.password.verify(
      body.currentPassword,
      currentUser.password
    );

    if (!passwordMatched) {
      throw new InvariantError("Invalid current password");
    }

    const newPassword = await Bun.password.hash(body.newPassword, {
      algorithm: "bcrypt",
      cost: 10,
    });

    const result = await prisma.user.update({
      where: { id: user_id },
      data: {
        password: newPassword,
      },
      select: {
        id: true,
        email: true,
        email_verified: true,
        avatar: true,
        nickname: true,
      },
    });

    return ResultUtils.successWithMessage(
      result,
      "Password updated successfully"
    );
  }
}
