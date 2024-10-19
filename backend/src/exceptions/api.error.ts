class ApiError extends Error {
  status: number;
  errors?: any[];

  constructor(status: number, message: string, errors?: any[]) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static Unauthorized() {
    return new ApiError(401, "Unauthorized.");
  }

  static BadRequest(message: string, errors: any[] = []) {
    return new ApiError(400, message, errors);
  }

  static ServiceUnavailable(message: string, errors: any[] = []) {
    return new ApiError(503, message, errors);
  }

  static Forbidden(message: string, errors: any[] = []) {
    return new ApiError(403, message, errors);
  }

  static Internal(message: string, errors: any[] = []) {
    return new ApiError(500, message, errors);
  }

  static NotFound() {
    return new ApiError(404, "Data not found.");
  }

  static Expired(message: string, errors: any[] = []) {
    return new ApiError(410, message, errors);
  }
}

export { ApiError };
