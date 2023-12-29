import { HttpException } from "./baseException";

export default class BadRequest extends HttpException {
  constructor(message: string) {
    super({
      message: message,
      statusCode: 400,
    });
  }
}
