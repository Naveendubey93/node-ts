
import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

export function loggerMiddleware(req: Request, res: Response, next: NextFunction): void {
  const start = new Date().getTime();
  const { method, url, body } = req;

  const logMessage = `[${method}] ${url}`;
  logger.info(logMessage);

  // Logging the API payload if available
  if (body) {
    logger.debug('API Payload:', body);
  }

  // Add timing information to the response object
  res.locals.timing = 0;

  res.on('finish', () => {
    const end = new Date().getTime();
    const timing = end - start;
    res.locals.timing = timing;

    const responseLog = `${logMessage} - ${res.statusCode} (${timing}ms)`;
    logger.info(responseLog);
  });

  next();
}

