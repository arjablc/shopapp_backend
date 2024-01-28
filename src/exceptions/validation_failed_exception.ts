import { HttpException } from "./base_exception";

export class ValidationFailed extends HttpException {
  constructor(error?: any) {
    super({
      error,
      message: "Validation Failed",
      statusCode: 400,
    });
  }
}
