import winston, { createLogger, format, transports } from 'winston';
import env from '../config/env';

const { combine, timestamp, printf, errors, splat } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const errorFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${message}\n${stack}`;
});

const apiPayloadFormat = printf(({ req }) => {
  return `API Payload: ${JSON.stringify(req?.body)}`;
});

const timingFormat = printf(({ timing }) => {
  return `Response Time: ${timing}ms`;
});

const logger = createLogger({
  level: env.logLevel,
  format: combine(
    timestamp(),
    errors({ stack: true }),
    splat(),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error', format: combine(timestamp(), errorFormat) }),
    new transports.File({ filename: 'logs/combined.log', format: combine(timestamp(), apiPayloadFormat, timingFormat, logFormat) }),
  ],
});

export default logger;
