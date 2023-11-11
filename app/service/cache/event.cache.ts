import redis from './redisConnection.js';

export default class EventCacheService {
  static DEFAULT_EXPIRATION = 300;

  static async getEvent(key: string, res: any) {
    const event = await redis.hgetall(key);

    const formattedEvent: any = {
      id: Number(event.id),
      date: new Date(event.date),
      location: event.location,
      duration: Number(event.duration),
      nb_team: Number(event.nb_team),
      nb_max_participant: Number(event.nb_max_participant),
      status: event.status,
      winner_team: Number(event.winner_team) || null,
      creator_id: Number(event.creator_id),
      score_team_1: Number(event.score_team_1) || null,
      score_team_2: Number(event.score_team_2) || null,
      sport_id: Number(event.sport_id),
      created_at: new Date(event.created_at),
      updated_at: new Date(event.updated_at),
    };
    if (!formattedEvent.id) return null;

    await redis.expire(key, this.DEFAULT_EXPIRATION);
    res.setHeader('X-Redis-Source', 'true');
    return formattedEvent;
  }

  static async setEvent(key: string, data: any) {
    await redis.hset(key, data);
    await redis.expire(key, this.DEFAULT_EXPIRATION);
  }
}
