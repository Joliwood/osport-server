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

export default redis;
