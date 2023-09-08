export default class ValidationError extends Error {
  status: number;

  name: string;

  fieldErrors: Record<string, string>;

  userMessage: string;

  constructor(message: string, fieldErrors: Record<string, string>) {
    super(message);
    this.message = message;
    this.status = 400;
    this.fieldErrors = fieldErrors;
    this.userMessage = 'Invalid input';
    this.name = 'ValidationError';
  }
}
