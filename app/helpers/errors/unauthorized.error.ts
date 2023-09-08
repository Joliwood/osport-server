export default class AuthorizationError extends Error {
  message: string;

  status: number;

  cause: string;

  userMessage: string;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = 'AuthorizationError';
    this.cause = message;
    this.status = 401;
    this.userMessage = 'You are not authorized to access this resource';
  }
}
