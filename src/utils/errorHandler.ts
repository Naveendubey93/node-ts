import { Request, Response, NextFunction } from 'express';
import { HTTPError } from '../utils/httpError';
import logger from '../logger';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  const statusCode = err instanceof HTTPError ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  logger.error(err.stack || err.message);

  res.status(statusCode).json({
    error: {
      message: message,
      statusCode: statusCode,
    },
  });
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    error: {
      message: 'Not Found',
      statusCode: 404,
    },
  });
}
