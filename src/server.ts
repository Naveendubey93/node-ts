import express, { Express } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/users';
import { errorHandler, notFoundHandler } from './utils/errorHandler';
import env from './config/env';
import logger from './logger';
import { loggerMiddleware } from './utils/loggerMiddleware';
import Database from "./utils/dbConnection"

class Server {
  private app: Express;

  constructor() {
    this.app = express();
    this.configureEnvironment();
    this.configureMiddleware();
    this.configureRoutes();
    this.connectDB();
  }

  private configureEnvironment(): void {
    dotenv.config();
  }

  private connectDB(): void {
    Database.connectToMongo()
  }

  private configureMiddleware(): void {
    this.app.use(express.json());
    this.app.use(loggerMiddleware); // Add logger middleware here
  }

  private configureRoutes(): void {
    this.app.use('/api/users', userRoutes);
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  public start(): void {
    this.app.listen(env.port, () => {
      logger.info(`Server is running on port ${env.port}`);
    });
  }
}

const server = new Server();
server.start();
