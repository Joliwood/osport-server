// can't destructurate import without conflict
import winston from 'winston';
import 'winston-daily-rotate-file';

const { createLogger } = winston;

// colors is nice
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

// colors is still nice
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// just get the transport and store them on server with a daily rotation
const transports = [
  new winston.transports.DailyRotateFile({
    filename: 'logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    frequency: '24h',
    maxFiles: 5,
    format,
  }),
  new winston.transports.DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    frequency: '24h',
    maxFiles: 5,
    level: 'error',
    format,
  }),
  new winston.transports.DailyRotateFile({
    filename: 'logs/access-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    frequency: '24h',
    maxFiles: 5,
    level: 'http',
    format,
  }),
];

const logger = createLogger({
  level: level(),
  levels,
  format,
  transports,
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    level: 'debug',
    format,
  }));
}

export default logger;
