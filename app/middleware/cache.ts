import { NextFunction, Request, Response } from 'express';
import logger from '../helpers/logger.js';
import CacheService from '../service/cache.js';

export default (key: string) => async (req: Request, res: Response, next: NextFunction) => {
  // If 'key' is falsy, simply move to the next middleware
  if (!key) return next();

  const paramsKey = req.params.id ? `${key}${req.params.id}` : key;

  try {
    const cacheValue = await CacheService.get(paramsKey);
    console.log(cacheValue);

    // Attach the cache key to 'req.body'
    // req.body.cacheKey = paramsKey;

    // if (req.method === 'GET' && cacheValue) {
    //   return res.status(200).json({ message: 'cached data', data: cacheValue });
    // }

    // If not cached or not a GET request, continue to the next middleware
    return next();
  } catch (error) {
    logger.error(error);
    return next();
  }
};
