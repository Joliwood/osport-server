import { Request, Response } from 'express';
import UserOnSport from '../models/user_on_sport.js';
import associateStringToNumber from '../utils/associate.js';
import UserInputError from '../helpers/errors/userInput.error.js';
import checkParams from '../utils/checkParams.js';
// import Cache from '../service/cache.js';

export default {
  rate: async (req: Request, res: Response) => {
    const { user_id, sport_id, rating: stringRating } = req.body;

    const rating = associateStringToNumber(stringRating);

    await UserOnSport.addOwnSport(user_id, sport_id, rating);

    // await Cache.del([`sport${user_id}`, `own_rating${user_id}`]);

    res.status(201).json({ message: 'Sport rated' });
  },
  updateRating: async (req: Request, res: Response) => {
    const {
      user_id, sport_id, rating, rater_id,
    } = req.body;

    if (rater_id === user_id) throw new UserInputError('You cannot rate yourself');

    await UserOnSport.updateSportRating({
      user_id, sport_id, rating, rater_id,
    });

    // await Cache.del([`sport${user_id}`]);

    res.status(200).json({ message: 'Rating updated' });
  },
  getStartRating: async (req: Request, res: Response) => {
    const id = checkParams(req.params.id);
    // const { cacheKey } = req.body;

    const result = await UserOnSport.getStartRating(id);

    // await Cache.set(cacheKey, result);

    return res.status(200).json({ message: 'User start rating', data: result ?? null });
  },
  getSports: async (req: Request, res: Response) => {
    const id = checkParams(req.params.id);
    // const { cacheKey } = req.body;

    const sports = await UserOnSport.getRatings(id);

    // await Cache.set(cacheKey, sports);

    return res.status(200).json({ message: 'Sport(s) that the user master', data: sports });
  },

};
