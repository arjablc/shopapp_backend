import { HttpException } from "./base_exception";

export class UnauthorizedError extends HttpException {
  constructor() {
    super({
      message: "You are not authorized to perform this task",
      statusCode: 403,
    });
  }
}
