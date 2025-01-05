export class SurrealError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }

  static DatabaseOffline() {
    return new SurrealError('ERR_OFFLINE', 'Database is offline!');
  }

  static DatabaseTokenMissing() {
    return new SurrealError('ERR_TOKEN_MISSING', 'Database token is missing!');
  }

  static DatabaseUnauthorized() {
    return new SurrealError('ERR_UNAUTHORIZED', 'Database unauthorized!');
  }
}
