import { Prisma } from '@prisma/client';
import prisma from '../helpers/db.client.js';
import DatabaseError from '../helpers/errors/database.error.js';

export default {
  // @ts-ignore
  create: async (data: Prisma.Event_chat_on_userCreateInput) => {
    try {
      await prisma.event_chat_on_user.create({
        data: {
          // @ts-ignore
          event_id: data.event,
          // @ts-ignore
          user_id: data.user,
          message: data.message,
        },
      });
    } catch (error: any) {
      throw new DatabaseError(error.message, 'message', error);
    }
  },
  findOne: async (id: number) => {
    try {
      const result = await prisma.event_chat_on_user.findFirst({
        where: { id },
      });

      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'message', error);
    }
  },
  findMany: async (event_id: number) => {
    try {
      const result = await prisma.event_chat_on_user.findMany({
        where: { event_id },
        orderBy: { created_at: 'desc' },
        include: {
          user: true,
        },
      });

      const historic = result.map((message) => ({
        id: message.id,
        event_id: message.event_id,
        message: message.message,
        created_at: message.created_at,
        updated_at: message.updated_at,
        user: {
          id: message.user.id,
          username: message.user.username,
          avatar: message.user.image_url,
        },
      }));

      return historic;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'message', error);
    }
  },
  update: async (id: number, message: string) => {
    const today = new Date();
    try {
      await prisma.event_chat_on_user.update({
        where: { id },
        data: { message, updated_at: today },
      });
    } catch (error: any) {
      throw new DatabaseError(error.message, 'message', error);
    }
  },
  destroyOne: async (id: number) => {
    try {
      await prisma.event_chat_on_user.delete({
        where: { id },
      });
    } catch (error: any) {
      throw new DatabaseError(error.message, 'message', error);
    }
  },
  destroyMany: async (event_id: number) => {
    try {
      await prisma.event_chat_on_user.deleteMany({
        where: { event_id },
      });
    } catch (error: any) {
      throw new DatabaseError(error.message, 'message', error);
    }
  },
};
