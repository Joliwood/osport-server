import redis from './redisConnection.js';

export default class UserCacheService {
  static DEFAULT_EXPIRATION = 300; // 5 minutes

  // key === user with the userId attached
  static async getUser(key: string, res: any) {
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

    await redis.expire(key, this.DEFAULT_EXPIRATION);

    // We can now show the provenance of the data with winston logger
    res.setHeader('X-Redis-Source', 'true');

    return formatedUser;
  }

  static async setUser(key: string, data: any) {
    // Create a hash to stock the user object
    await redis.hset(key, data);

    // Set the TTL (expiration) for the hash key
    await redis.expire(key, this.DEFAULT_EXPIRATION);
  }

  static async deleteUser(key: string) {
    await redis.del(key);
  }

  static async updateUser(key: string, data: any) {
    await redis.hset(key, data);
    await redis.expire(key, this.DEFAULT_EXPIRATION);
  }
}
