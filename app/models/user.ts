import { Prisma } from '@prisma/client';
import prisma from '../helpers/db.client.js';
import type { AllowedUserUpdate } from '../@types/index.d.ts';
import exclude from '../utils/exclude.fields.js';
import DatabaseError from '../helpers/errors/database.error.js';
import NotFoundError from '../helpers/errors/notFound.error.js';

export default {
  create: async (data: Prisma.UserCreateInput) => {
    try {
      const result = await prisma.user.create({
        data,
      });
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user', error);
    }
  },

  findOne: async (data: Prisma.UserWhereInput) => {
    try {
      const result = await prisma.user.findFirst({
        where: {
          OR: [
            { email: data.email },
            { username: data.username },
          ],
        },
      });
      if (!result) throw new NotFoundError('User not found');
      return result;
    } catch (error: any) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError(error.message, 'user', error);
    }
  },

  getUserInfos: async (id: number) => {
    // We find the user with the id provided by the front
    try {
      const user: any = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      // We check if the id is in our database
      if (!user) throw new NotFoundError('User not found');

      // We exclude all datas that front doesn't need, the image will be added later
      const userFiltered = exclude(
        user,
        [
          'password',
          'created_at',
          'updated_at',
        ],
      );

      return userFiltered;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user', error);
    }
  },
  updateUser: async (id: number, data: AllowedUserUpdate) => {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    try {
      const result = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          username: data.username || user?.username,
          email: data.email || user?.email,
          image_url: data.imageUrl || user?.image_url,
        },
      });

      return {
        id: result.id,
        username: result.username,
        email: result.email,
        image_url: result.image_url,
        created_at: result.created_at,
      };
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user', error);
    }
  },
  deleteUser: async (id: number) => {
    const existingUser = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    // We check if the id is in our database
    if (!existingUser) throw new Error('User not found');

    await prisma.user.delete({
      where: {
        id,
      },
    });
    return true;
  },
};
