export default class UserInputError extends Error {
  message: string;

  name: string;

  status: number;

  userMessage: string;

  constructor(message: string, userMessage?: string) {
    super(message);
    this.name = 'UserInputError';
    this.status = 400;
    this.userMessage = userMessage ?? 'Invalid input';
    this.message = message;
  }
}
