import { CustomErrorCodes, HttpException } from "./baseException";

export class DbConnectionError extends HttpException {
  constructor() {
    super({
      message: "Db connection error",
      code: CustomErrorCodes.SERVER_ERROR,
      statusCode: 500,
    });
  }
}
