class BusinessError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static InvalidInput(message: string) {
    return new BusinessError(400, message);
  }

  static ServerError(message?: string) {
    return new BusinessError(500, `Ошибка на стороне сервера. ${message}`);
  }

  static get ServerErrorMessage() {
    return 'Ошибка на стороне сервера.';
  }
}

export { BusinessError };
