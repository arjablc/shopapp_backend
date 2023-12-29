import { HttpException } from "./baseException";

export default class NotFound extends HttpException {
  constructor() {
    super({
      message: "Resouce not found",
      statusCode: 404,
    });
  }
}
