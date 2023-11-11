import morgan, { StreamOptions } from 'morgan';
import logger from '../helpers/logger.js';

// Define a custom token to indicate the source of the response
morgan.token('source', (_, res) => {
  // Check if the response is from Redis based or Postgres
  if (res.getHeader('X-Redis-Source')) {
    return 'Redis';
  }
  return 'Postgres';
});

const stream: StreamOptions = {
  write: (message) => {
    if (message.includes('From Redis')) {
      logger.warn(message);
    } else {
      logger.http(message);
    }
  },
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

const accesHttp = morgan(
  ':method | :url | :status | :res[content-length] Bytes | :response-time ms | From :source',
  { stream, skip },
);

export default accesHttp;
