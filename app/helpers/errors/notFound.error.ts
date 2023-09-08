export default class NotFoundError extends Error {
  status: number;

  name: string;

  userMessage: string;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.status = 200;
    this.userMessage = "Item(s) couldn't be found";
    this.name = 'NotFoundError';
  }
}
