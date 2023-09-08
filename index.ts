import http from 'http';
import logger from './app/helpers/logger.js';
import './app/helpers/env.load.js';
import app from './app/index.app.js';

const PORT = process.env.PORT || 5000;

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  logger.info(`HTTP Server is running on port ${PORT}`);
});
