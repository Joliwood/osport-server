import { Prisma } from '@prisma/client';

export default class DatabaseError extends Error {
  message: string;

  userMessage: string;

  name: string;

  status: number;

  code?: string;

  constructor(message: string, userTable: string, error?: any) {
    super(message);
    this.userMessage = 'Internal server error';
    this.message = message;

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      this.message = `Code ${error.code} : ${error.message} on ${userTable} table`;
      this.code = error.code;

      if (error.code === 'P2002') {
        this.message = `Code ${error.code} unique constraint on column "${(error.meta as any).target[0]
          }" of ${userTable} table`;
        this.userMessage = 'Record already exists and can\'t be duplicated';
      }
      if (error.code === 'P2003') {
        this.message = error.message;
        this.userMessage = 'You\'re likely trying to delete something that doesn\'t exist';
      }
      if (error.code === 'P2025') {
        this.message = (error as any).meta.cause;
        this.userMessage = (error as any).meta.cause;
      }
    }
    this.name = 'DatabaseError';
    this.status = 500;
  }
}
