import { HttpException } from "./base_exception";

export class UniqueUserError extends HttpException {
  constructor(error: any) {
    super({
      message: "User already exists",
      statusCode: 403,
    });
  }
}
