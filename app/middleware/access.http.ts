import morgan, { StreamOptions } from 'morgan';
import logger from '../helpers/logger.js';

// middleware to get some information about the request
// and we log it using our logger
// to help us debug the app

const stream: StreamOptions = {
  write: (message) => logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

const accesHttp = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip },
);

export default accesHttp;
