import ResultUtils from "../utils/result.utils";

export default class FileService {
  async upload(file: File) {
    const filename = new Date().getTime() + file.name;
    const destination = `public/${filename}`;
    Bun.write(destination, file);

    const result = {
      filename,
      filePath: "/" + destination,
      fileSize: file.size,
    };

    return ResultUtils.success(result);
  }
}
