import { HttpException } from "./baseException";

export class InternalError extends HttpException {
  constructor() {
    super({
      statusCode: 500,
      message: "Some Internal Error Occured",
    });
  }
}
