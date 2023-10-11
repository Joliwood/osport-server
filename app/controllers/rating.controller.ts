import { Request, Response } from 'express';
import UserOnSport from '../models/user_on_sport.js';
import associateStringToNumber from '../utils/associate.js';
import UserInputError from '../helpers/errors/userInput.error.js';
import checkParams from '../utils/checkParams.js';
import RatingCacheService from '../service/cache/rating.cache.js';

export default {
  rate: async (req: Request, res: Response) => {
    const {
      user_id, sport_id, rating, rater_id, event_id,
    } = req.body;

    if (rater_id === user_id) throw new UserInputError('You cannot rate yourself');
    if (!event_id) throw new UserInputError('An user can only be rated at the end of an event, provide an event_id');

    await UserOnSport.addSportRating({
      user_id, sport_id, rating, rater_id, event_id,
    });

    // await Cache.del([`sport${user_id}`, `own_rating${user_id}`]);

    res.status(201).json({ message: 'Sport rated' });
  },

  ownRate: async (req: Request, res: Response) => {
    const { user_id, sport_id, rating: stringRating } = req.body;

    const rating = associateStringToNumber(stringRating);

    await UserOnSport.addOwnSportRating(user_id, sport_id, rating);

    // await Cache.del([`sport${user_id}`, `own_rating${user_id}`]);

    res.status(201).json({ message: 'Sport rated' });
  },

  getOwnRating: async (req: Request, res: Response) => {
    const id = checkParams(req.params.id);

    const result = await UserOnSport.getOwnRating(id);

    await RatingCacheService.setOwnRating(`own_rating:${id}`, result);

    return res.status(200).json({ message: 'User start rating', data: result ?? null });
  },

  getSports: async (req: Request, res: Response) => {
    const id = checkParams(req.params.id);

    const sports = await UserOnSport.getRatings(id);

    return res.status(200).json({ message: 'Sport(s) that the user master', data: sports });
  },

};
