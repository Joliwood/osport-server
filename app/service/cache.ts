import { Redis } from 'ioredis';

const redis = new Redis({
  port: Number(process.env.REDIS_PORT), // Redis port
  host: process.env.REDIS_HOST, // Redis host
  username: process.env.REDIS_USER, // needs Redis >= 6
  password: process.env.REDIS_PASSWORD,
  db: Number(process.env.REDIS_DB), // Defaults to 0
  tls: {
    rejectUnauthorized: false,
  },
});

export default class CacheService {
  static DEFAULT_EXPIRATION = 300; // 5 minutes

  // key === user with the userId attached
  static async get(key: string) {
    // We want to receive all fields of the hash === user redis object like
    const user = await redis.hgetall(key);

    // In Redis, if we don't find the hash with a key, it return an empty object
    if (Object.keys(user).length === 0) return null;

    // We reformat because redis hash stock in string and we test
    // at different places the id as a number
    const formatedUser = {
      ...user,
      id: Number(user.id),
    };

    return formatedUser;
  }

  static async userSet(key: string, data: any) {
    // Create a hash to stock the user object
    await redis.hset(key, data);

    // Set the TTL (expiration) for the hash key
    await redis.expire(key, this.DEFAULT_EXPIRATION);
  }
}
