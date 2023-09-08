import prisma from '../helpers/db.client.js';
import DatabaseError from '../helpers/errors/database.error.js';
import NotFoundError from '../helpers/errors/notFound.error.js';
import type { RequestStatus } from '../@types/index.js';

export default {
  find: async (event_id?: number, user_id?: number) => {
    try {
      const userOnEvent = await prisma.event_on_user.findMany({
        where: {
          user_id,
          event_id,
        },
        include: { user: true },
      });
      await prisma.$disconnect();
      if (!userOnEvent) throw new NotFoundError('No user on event found');
      // @ts-ignore
      const data = userOnEvent.map((user) => ({
        event_id: user.event_id,
        status: user.status,
        team: user.team,
        created_at: user.created_at,
        user: {
          id: user.user.id,
          username: user.user.username,
          email: user.user.email,
          avatar: user.user.image_url,
        },
      }));
      return data;
    } catch (error: any) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError(error.message, 'user_on_event', error);
    }
  },

  createMany: async (event_id: number, userIds: number[] | number) => {
    let ids: number[];
    if (typeof userIds === 'number') {
      ids = [userIds];
    } else {
      ids = userIds;
    }

    const queries = ids.map((id) => prisma.event_on_user.create({
      data: {
        user_id: id,
        event_id,
        status: 'pending',
      },
    }));

    try {
      const result = await Promise.allSettled(queries);
      await prisma.$disconnect();
      return !!result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user_on_event', error);
    }
  },
  update: async (user_id: number, event_id: number, status: RequestStatus, team?: number) => {
    try {
      const result = await prisma.event_on_user.update({
        where: {
          event_id_user_id: { user_id, event_id },
        },
        data: { status, team },
      });
      await prisma.$disconnect();
      return !!result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user_on_event', error);
    }
  },

  findConfirmed: async (event_id: number) => {
    try {
      const result = await prisma.event_on_user.count({
        where: {
          event_id,
          status: 'accepted',
        },
      });
      await prisma.$disconnect();
      if (!result) throw new NotFoundError('No user on event found');
      return result;
    } catch (error: any) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError(error.message, 'user_on_event', error);
    }
  },
};
