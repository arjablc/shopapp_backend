import { HttpException } from "./baseException";

export class UniqueError extends HttpException {
  constructor(error: any) {
    super({
      message: "User already exists",
      statusCode: 403,
    });
  }
}
