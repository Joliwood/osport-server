import prisma from '../helpers/db.client.js';
import DatabaseError from '../helpers/errors/database.error.js';
import UserInputError from '../helpers/errors/userInput.error.js';
import type { SportLevel } from '../@types/index.js';

export default {

  addOwnSportRating: async (user_id: number, sport_id: number, rating: number) => {
    try {
      const isExist = await prisma.user_on_sport.findFirst({
        where: {
          user_id,
          sport_id,
          rater_id: user_id,
        },
      });

      if (isExist) throw new UserInputError('Sport already rated');

      const result = await prisma.user_on_sport.create({
        data: {
          user_id,
          sport_id,
          rating,
          rater_id: user_id,
        },
      });
      return result;
    } catch (error: any) {
      if (error instanceof UserInputError) throw error;
      throw new DatabaseError(error.message, 'user_on_sport', error);
    }
  },

  addSportRating: async (data: {
    user_id: number,
    sport_id: number,
    rating: number,
    rater_id: number,
    event_id: number
  }) => {
    try {
      // conditions if the user already rated the other user in this particular event
      const alreadyRated = await prisma.user_on_sport.findFirst({
        where: {
          user_id: data.user_id,
          rater_id: data.rater_id,
          event_id: data.event_id,
        },
      });

      if (alreadyRated) throw new UserInputError('You already rated this user for this event');

      const isUpdate = await prisma.user_on_sport.create({
        data: {
          user_id: data.user_id,
          sport_id: data.sport_id,
          rating: data.rating,
          rater_id: data.rater_id,
          event_id: data.event_id,
        },
      });
      return isUpdate;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user_on_sport', error);
    }
  },

  getRatings: async (user_id: number) => {
    try {
      const footAvgRating = await prisma.user_on_sport.aggregate({
        where: {
          sport_id: 1,
          user_id,
        },
        _avg: {
          rating: true,
        },
        _count: {
          rating: true,
        },
      });

      const basketAvgRating = await prisma.user_on_sport.aggregate({
        where: {
          sport_id: 2,
          user_id,
        },
        _avg: {
          rating: true,
        },
        _count: {
          rating: true,
        },
      });

      const sports: SportLevel[] = [
        ...(footAvgRating._avg.rating ? [{
          name: 'Football',
          gb_rating: footAvgRating._avg.rating,
          nb_rating: footAvgRating._count.rating,
        }] : []),

        ...(basketAvgRating._avg.rating ? [{
          name: 'Basketball',
          gb_rating: basketAvgRating._avg.rating,
          nb_rating: basketAvgRating._count.rating,
        }] : []),
      ];

      return sports;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user_on_sport', error);
    }
  },

  getRating: async (user_id: number, sport_id: number) => {
    try {
      const sportLevelResult: any = await prisma.$queryRaw`
        SELECT sport.name ,
          (SUM(level.rating) + (SELECT rating
            FROM (SELECT
              ratee.rating,
              ratee.sport_id,
              ratee.user_id
              FROM "User_on_sport" AS ratee
              WHERE ratee.user_id = ratee.rater_id ) AS own_rating
            WHERE own_rating.user_id = ${user_id} AND own_rating.sport_id = ${sport_id} ) * 5 )
          /( COUNT(level.rating) + 5) AS gb_rating
        FROM "User_on_sport" as level
        INNER JOIN "Sport" AS sport ON level.sport_id = sport.id
        WHERE level.sport_id = ${sport_id} AND level.user_id = ${user_id} AND level.user_id <> level.rater_id
        GROUP BY sport.name
      `;

      const result: SportLevel = sportLevelResult[0];
      // need to return a default rating of 5 if no rating is found
      // in order to not break the algorithm
      // this is the only role for this function in the app
      const sport = { name: sport_id === 1 ? 'Football' : 'Basketball', gb_rating: result ? Number(result.gb_rating) : 5, user_id };

      return sport;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user_on_sport', error);
    }
  },

  getOwnRating: async (user_id: number) => {
    // In this context, the query Raw is faster than Prisma queries
    // 90 to 150ms ---> 30 to 85ms
    const result: any = await prisma.$queryRaw`
      SELECT
        level.rating,
        sport.name
      FROM "User_on_sport" AS level
      INNER JOIN "Sport" AS sport ON level.sport_id = sport.id
      WHERE level.rater_id = level.user_id AND level.user_id = ${user_id}
    `;

    if (!result) return null;

    return result;
  },
};
