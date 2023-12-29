class HttpException extends Error {
  error: any;
  statusCode: number;

  constructor({
    message,
    error,
    statusCode,
  }: {
    message: string;
    error?: any;
    statusCode: number;
  }) {
    super(message);
    if (error) {
      this.error = error;
    }
    this.statusCode = statusCode;
  }
}

export { HttpException };
