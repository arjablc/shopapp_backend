import { HttpException } from "./baseException";

export class ResourceNotFound extends HttpException {
  constructor() {
    super({
      statusCode: 404,
      message: "Resource Not found",
      code: 1002,
    });
  }
}
