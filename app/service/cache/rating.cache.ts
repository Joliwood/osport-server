import redis from './redisConnection.js';

export default class CacheService {
  static DEFAULT_EXPIRATION = 300; // 5 minutes

  // We could stock only in string redis type the rating for each sport
  // but it doesn't change the performances and it needs to reformat the data after redis get

  // key === user with the userId attached
  static async getOwnRating(key: string, res: any) {
    const footballRating = await redis.hgetall(`${key}:football`);
    const basketRating = await redis.hgetall(`${key}:basketball`);

    if (Object.keys(footballRating || basketRating).length === 0) return null;

    await redis.expire(`${key}:football`, this.DEFAULT_EXPIRATION);
    await redis.expire(`${key}:basketball`, this.DEFAULT_EXPIRATION);

    const formatedOwnRating = [
      {
        rating: Number(footballRating.rating),
        name: footballRating.name,
      },
      {
        rating: Number(basketRating.rating),
        name: basketRating.name,
      },
    ];

    res.setHeader('X-Redis-Source', 'true');

    return formatedOwnRating;
  }

  static async setOwnRating(key: string, sports: any) {
    sports.forEach(async (sport: any) => {
      await redis.hset(`${key}:${sport.name}`, sport);
      await redis.expire(`${key}:${sport.name}`, this.DEFAULT_EXPIRATION);
    });
  }

  static async delOwnRating(key: string) {
    await redis.del(`${key}:football`);
    await redis.del(`${key}:basketball`);
  }
}
