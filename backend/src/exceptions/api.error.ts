class ApiError extends Error {
  status: number;
  errors?: [];

  constructor(status: number, message: string, errors?: []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, "Пользователь не авторизован");
  }

  static BadRequest(message: string, errors: [] = []) {
    return new ApiError(400, message, errors);
  }

  static ServiceUnavailable(message: string, errors: [] = []) {
    return new ApiError(503, message, errors);
  }

  static Forbidden(message: string, errors: [] = []) {
    return new ApiError(403, message, errors);
  }
}

export { ApiError };
