import Elysia, { Static, t } from "elysia";

const updateProfile = t.Object({
  nickname: t.String({ minLength: 1, maxLength: 22 }),
});

const updateAvatar = t.Object({
  avatar: t.String({ minLength: 1, maxLength: 255 }),
});

const updatePassword = t.Object({
  currentPassword: t.String({ minLength: 4, maxLength: 16 }),
  newPassword: t.String({ minLength: 4, maxLength: 16 }),
});

const ProfileModel = new Elysia({ name: "Model.Profile" }).model({
  "profile.update": updateProfile,
  "profile.update.avatar": updateAvatar,
  "profile.update.password": updatePassword,
});

export type UpdateProfile = Static<typeof updateProfile>;
export type UpdateAvatar = Static<typeof updateAvatar>;
export type UpdatePassword = Static<typeof updatePassword>;

export default ProfileModel;
