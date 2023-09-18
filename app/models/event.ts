// @ts-nocheck
import { Prisma } from '@prisma/client';
import prisma from '../helpers/db.client.js';
import UserInputError from '../helpers/errors/userInput.error.js';
import DatabaseError from '../helpers/errors/database.error.js';
// import exclude from '../utils/exclude.fields.ts';

interface AllowedEventUpdate {
  date?: string;
  location?: string;
  duration?: number;
  scoreTeam1?: number;
  scoreTeam2?: number;
  eventStatus?: string;
  winnerTeam?: number;
  nbMaxParticipant?: number;
  sportId?: number;
}

export default {
  createEvent: async (data: Prisma.EventCreateInput) => {
    const result = await prisma.event.create(
      {
        data,
      },
    );
    await prisma.$disconnect();
    return result;
  },

  findOne: async ({ eventId }: { eventId: any }) => {
    try {
      const result = await prisma.event.findUnique(
        {
          where: {
            id: eventId,
          },
        },
      );
      await prisma.$disconnect();
      if (!result) throw new UserInputError('This event doesn\'t exist', 'Event not found');
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'event', error);
    }
  },

  validateEvent: async (status: string, eventId: number) => {
    const eventUpdated = await prisma.event.update(
      {
        where: {
          id: eventId,
        },
        data: {
          status,
        },
      },
    );
    await prisma.$disconnect();
    return eventUpdated;
  },

  updateEvent: async (eventId: number, data: AllowedEventUpdate) => {
    // We can't use directly sport connect in the prisma.event.update
    // because prisma schema of sport force to have an id
    const eventData: any = {
      date: data.date,
      location: data.location,
      duration: data.duration,
      status: data.eventStatus,
      winner_team: data.winnerTeam,
      score_team_1: data.scoreTeam1,
      score_team_2: data.scoreTeam2,
      nb_max_participant: data.nbMaxParticipant,
    };

    // If we don't have a sport in the data provided, we don't insert the
    // sport to update in the prisma event update
    if (data.sportId !== undefined) {
      eventData.sport = {
        connect: {
          id: data.sportId,
        },
      };
    }

    const eventUpdated = await prisma.event.update(
      {
        where: {
          id: eventId,
        },
        data: eventData,
      },
    );
    await prisma.$disconnect();
    return eventUpdated;
  },

  getEvents: async (userId: number) => {
    const result = await prisma.$queryRaw`
        SELECT
    event.id,
    event.date,
    event.location,
    event.duration,
    event.nb_team,
    event.nb_max_participant,
    event.status,
    event.winner_team,
    event.score_team_1,
    event.score_team_2,
    sport.name as sport_name,
    participant.status as user_status,
    participant.team as user_team
  FROM "Event" AS event
  INNER JOIN "Event_on_user" AS participant ON participant.event_id = event.id
  INNER JOIN "Sport" AS sport ON sport.id = event.sport_id
  WHERE participant.user_id = ${userId} AND (participant.status = 'accepted' OR participant.status = 'pending')
  ORDER BY event.date DESC
`;
    await prisma.$disconnect();
    return result;
  },
};
