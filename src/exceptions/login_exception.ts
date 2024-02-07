import { HttpException } from "./base_exception";

export class LoginFailed extends HttpException {
  constructor() {
    super({
      message: "Either email or password doesn't match",
      statusCode: 401,
    });
  }
}
