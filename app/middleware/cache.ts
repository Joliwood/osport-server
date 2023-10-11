import { NextFunction, Request, Response } from 'express';
import logger from '../helpers/logger.js';
import UserCacheService from '../service/cache/user.cache.js';
// import RatingCacheService from '../service/cache/rating.cache.js';

export default (key: string) => async (req: Request, res: Response, next: NextFunction) => {
  // If 'key' is falsy, simply move to the next middleware
  if (!key) return next();

  const paramsKey = req.params.id ? `${key}:${req.params.id}` : key;

  try {
    if (key === 'user') {
      const cacheValue = await UserCacheService.getUser(paramsKey);
      if (cacheValue) return res.status(200).json({ message: 'User cache data', data: cacheValue });
    }
    // if (key === 'rating') cacheValue = await RatingCacheService.getRating(paramsKey);

    // If not cached or not a GET request, continue to the next middleware
    return next();
  } catch (error) {
    logger.error(error);
    return next();
  }
};
