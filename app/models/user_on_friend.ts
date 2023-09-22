import prisma from '../helpers/db.client.js';
import type { RequestStatus } from '../@types/index.d.js';
import DatabaseError from '../helpers/errors/database.error.js';
import NotFoundError from '../helpers/errors/notFound.error.js';
import UserInputError from '../helpers/errors/userInput.error.js';

export default {
  find: async (userId: number, status: RequestStatus) => {
    try {
      const result = await prisma.user_on_friend.findMany({
        where: {
          asker_id: userId,
          status,
        },
        include: {
          asked: true,
        },
      });
      await prisma.$disconnect();
      if (result.length === 0) return [];
      const data = result.map((relation) => ({
        asker_id: relation.asker_id,
        status: relation.status,
        created_at: relation.created_at,
        updated_at: relation.updated_at,
        friend: {
          id: relation.asked.id,
          email: relation.asked.email,
          username: relation.asked.username,
          avatar: relation.asked.image_url,
        },
      }));

      return data;
    } catch (error: any) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError(error.message, 'user_on_friend', error);
    }
  },
  findRequest: async (args: { userId: number, friendId: number }) => {
    try {
      const result = await prisma.user_on_friend.findFirst({
        where: {
          asked_id: args.userId,
          asker_id: args.friendId,
          status: {
            in: ['pending', 'accepted'],
          },
        },
        include: {
          asker: true,
        },
      });
      await prisma.$disconnect();
      if (!result) throw new NotFoundError('No pending request found');

      const data = {
        friend_id: result.asker_id,
        status: result.status,
        created_at: result.created_at,
        updated_at: result.updated_at,
        user: {
          id: result.asker.id,
          email: result.asker.email,
          username: result.asker.username,
          avatar: result.asker.image_url,
        },
      };

      return data;
    } catch (error: any) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError(error.message, 'user_on_friend', error);
    }
  },
  findManyRequest: async (userId: number) => {
    try {
      const result = await prisma.user_on_friend.findMany({
        where: {
          asked_id: userId,
          status: 'pending',
        },
        include: {
          asker: true,
        },
      });
      await prisma.$disconnect();
      if (result.length === 0) throw new NotFoundError('No pending request found');
      // @ts-ignore
      const data = result.map((relation) => ({
        user_id: relation.asked_id,
        status: relation.status,
        created_at: relation.created_at,
        updated_at: relation.updated_at,
        friend: {
          id: relation.asker.id,
          email: relation.asker.email,
          username: relation.asker.username,
          avatar: relation.asker.image_url,
        },
      }));

      return data;
    } catch (error: any) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError(error.message, 'user_on_friend', error);
    }
  },
  create: async ({ asker_id, asked_id }: Record<string, number>) => {
    if (asker_id === asked_id) throw new UserInputError('You can\'t send a friend request to yourself');
    try {
      const isExist = await prisma.user_on_friend.findFirst({
        where: {
          asker_id,
          asked_id,
        },
      });
      if (isExist) throw new UserInputError('Friend request already sent');

      const isExistReverse = await prisma.user_on_friend.findFirst({
        where: {
          asker_id: asked_id,
          asked_id: asker_id,
        },
      });

      if (isExistReverse) throw new UserInputError('You already have a pending request from this user');
      const result = await prisma.user_on_friend.create({
        data: {
          asker_id,
          asked_id,
          status: 'pending',
        },
      });
      await prisma.$disconnect();
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user_on_friend', error);
    }
  },
  update: async (askerId: number, askedId: number, status: RequestStatus) => {
    const firstQuery = prisma.user_on_friend.update({
      where: {
        asked_id_asker_id: {
          asker_id: askerId,
          asked_id: askedId,
        },
      },
      data: {
        status,
      },
    });
    const secondeQuery = prisma.user_on_friend.create({
      data: {
        asker_id: askedId,
        asked_id: askerId,
        status,
      },
    });
    try {
      const result = await prisma.$transaction([firstQuery, secondeQuery]);
      await prisma.$disconnect();
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user_on_friend', error);
    }
  },

  reject: async (askerId: number, askedId: number) => {
    try {
      const result = await prisma.user_on_friend.delete({
        where: {
          asked_id_asker_id: {
            asker_id: askerId,
            asked_id: askedId,
          },
        },
      });
      await prisma.$disconnect();
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user_on_friend', error);
    }
  },
};
