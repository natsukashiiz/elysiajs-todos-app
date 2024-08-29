import Elysia from "elysia";
import ProfileModel from "../models/profile.model";
import AuthMiddleware from "../middlewares/auth.middleware";
import ProfileService from "../services/profile.service";

const ProfileController = new Elysia({ prefix: "/v1/profile" })
  .use(AuthMiddleware)
  .use(ProfileModel)
  .decorate({
    profileService: new ProfileService(),
  })
  .get(
    "",
    async ({ user, profileService }) => {
      return profileService.getProfile(user);
    },
    {
      detail: { tags: ["Profile"], security: [{ JwtAuth: [] }] },
    }
  )
  .put(
    "",
    async ({ user, body, profileService }) => {
      return profileService.updateProfile(user.id, body);
    },
    {
      body: "profile.update",
      detail: { tags: ["Profile"], security: [{ JwtAuth: [] }] },
    }
  )
  .put(
    "/avatar",
    async ({ user, body, profileService }) => {
      return profileService.updateAvatar(user.id, body);
    },
    {
      body: "profile.update.avatar",
      detail: { tags: ["Profile"], security: [{ JwtAuth: [] }] },
    }
  )
  .put(
    "/password",
    async ({ user, body, profileService }) => {
      return profileService.updatePassword(user.id, body);
    },
    {
      body: "profile.update.password",
      detail: { tags: ["Profile"], security: [{ JwtAuth: [] }] },
    }
  );

export default ProfileController;
