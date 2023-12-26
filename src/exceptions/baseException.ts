class HttpException extends Error {
  code: number;
  error: any;
  statusCode: number;
  constructor({
    code,
    message,
    error,
    statusCode,
  }: {
    code: number;
    message: string;
    error?: any;
    statusCode: number;
  }) {
    super(message);
    if (error) {
      this.error = error;
    }
    this.statusCode = statusCode;
    this.code = code;
  }
}

enum CustomErrorCodes {
  DB_CONNECTION_ERROR = 1111,
}

export { HttpException, CustomErrorCodes };
