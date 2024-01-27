import { HttpException } from "./base_exception";

export default class BadRequest extends HttpException {
  constructor(message: string, error?: any) {
    super({
      error: error,
      message: message,
      statusCode: 400,
    });
  }
}
