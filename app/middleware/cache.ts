// import { NextFunction, Request, Response } from 'express';
// import logger from '../helpers/logger.js';
// import Cache from '../service/cache.js';

// export default (key: string) => async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   if (!key) next();
//   let paramsKey = key;
//   if (req.params.id) paramsKey = key + req.params.id;
//   try {
//     const cacheValue = await Cache.get(paramsKey);
//     req.body.cacheKey = paramsKey;
//     if (req.method === 'GET' && cacheValue) {
//       return res.status(200).json({ message: 'cached data', data: cacheValue });
//     }
//     return next();
//   } catch (error) {
//     logger.error(error);
//     return next();
//   }
// };
