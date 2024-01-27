import { HttpException } from "./base_exception";

export class UniqueError extends HttpException {
  constructor(error: any) {
    super({
      message: "User already exists",
      statusCode: 403,
    });
  }
}
