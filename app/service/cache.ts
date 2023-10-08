import { Redis } from 'ioredis';

const redis = new Redis({
  port: Number(process.env.REDIS_PORT), // Redis port
  host: process.env.REDIS_HOST, // Redis host
  username: process.env.REDIS_USER, // needs Redis >= 6
  password: process.env.REDIS_PASSWORD,
  db: Number(process.env.REDIS_DB), // Defaults to 0
});

export default class CacheService {
  static DEFAULT_EXPIRATION = 300; // 5 minutes

  static async get(key: string) {
    const cacheValue = await redis.get(key);
    return cacheValue ? JSON.parse(cacheValue) : null;
  }

  static async set(
    key: string,
    data: any,
    expiration: number = CacheService.DEFAULT_EXPIRATION,
  ) {
    redis.set(key, JSON.stringify(data), 'EX', expiration);

    // Automatically remove the data from the cache after the specified time.
    setTimeout(async () => {
      await redis.del(key);
    }, this.DEFAULT_EXPIRATION);
  }
}
