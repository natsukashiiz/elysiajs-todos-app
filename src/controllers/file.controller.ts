import Elysia from "elysia";
import FileModel from "../models/file.model";
import FileService from "../services/file.service";

const FileController = new Elysia({ prefix: "/v1/files" })
  .use(FileModel)
  .decorate({
    fileService: new FileService(),
  })
  .post(
    "/upload",
    ({ body: { file }, fileService }) => {
      return fileService.upload(file);
    },
    {
      body: "file.upload",
      detail: {
        tags: ["Files"],
      },
    }
  );

export default FileController;
