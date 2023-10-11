import { NextFunction, Request, Response } from 'express';
import logger from '../helpers/logger.js';
import UserCacheService from '../service/cache/user.cache.js';
import RatingCacheService from '../service/cache/rating.cache.js';
import EventCacheService from '../service/cache/event.cache.js';

const getCache = (key: string) => async (req: Request, res: Response, next: NextFunction) => {
  // If 'key' is falsy, simply move to the next middleware
  if (!key) return next();

  const paramsKey = req.params.id ? `${key}:${req.params.id}` : key;

  try {
    if (key === 'user') {
      const cacheValue = await UserCacheService.getUser(paramsKey, res);
      if (cacheValue) return res.status(200).json({ message: 'User cache data', data: cacheValue });
    }

    if (key === 'own_rating') {
      const cacheValue = await RatingCacheService.getOwnRating(paramsKey, res);
      if (cacheValue) return res.status(200).json({ message: 'Own user rating cache data', data: cacheValue });
    }

    if (key === 'event') {
      const cacheValue = await EventCacheService.getEvent(paramsKey, res);
      if (cacheValue) return res.status(200).json({ message: 'Event cache data', data: cacheValue });
    }

    // If not cached or not a GET request, continue to the next middleware
    return next();
  } catch (error) {
    logger.error(error);
    return next();
  }
};

export default getCache;
