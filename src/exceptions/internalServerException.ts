import { CustomErrorCodes, HttpException } from "./baseException";

export class InternalServerError extends HttpException {
  constructor() {
    super({
      message: "Some error occured in the server",
      code: CustomErrorCodes.SERVER_ERROR,
      statusCode: 500,
    });
  }
}
