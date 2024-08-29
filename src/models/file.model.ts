import Elysia, { Static, t } from "elysia";

const upload = t.Object({
  file: t.File({
    minItems: 1,
    maxItems: 1,
    maxSize: 1024 * 1024 * 1,
  }),
});

const FileModel = new Elysia({ name: "Model.File" }).model({
  "file.upload": upload,
});

export type Upload = Static<typeof upload>;

export default FileModel;
