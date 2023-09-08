import prisma from '../helpers/db.client.js';
import DatabaseError from '../helpers/errors/database.error.js';

export default {
  create: async ({ url, title }: { url: string, title: string }) => {
    try {
      const result = await prisma.image.create({
        data: {
          url,
          title,
        },
      });
      await prisma.$disconnect();
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'image', error);
    }
  },
  findOne: async (args: string) => {
    try {
      const result = await prisma.image.findFirst({
        where: {
          OR: [
            { url: args },
            { title: args },
          ],
        },
      });
      await prisma.$disconnect();
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'image', error);
    }
  },
  findByPk: async (id: number) => {
    try {
      const result = await prisma.image.findFirst({
        where: {
          id,
        },
      });
      await prisma.$disconnect();
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'image', error);
    }
  },
  update: async (id: number, url: string, title: string) => {
    try {
      const result = await prisma.image.update({
        where: {
          id,
        },
        data: {
          url,
          title,
        },
      });
      await prisma.$disconnect();
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'image', error);
    }
  },
};
