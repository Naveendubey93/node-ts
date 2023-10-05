import express, { Express } from 'express';
// import dotenv from 'dotenv';
import { config } from 'dotenv';
// import userRoutes from './routes/users';
import cmnRouter from './routes/commonRoutes'
import { errorHandler, notFoundHandler } from './utils/errorHandler';
import env from './config/env';
import logger from './logger';
import { loggerMiddleware } from './utils/loggerMiddleware';
import Database from "./utils/dbConnection"
// import { SolaceSubscriber } from './pubsub/solaceSubscriber';
import { SolaceConnection } from './pubsub/solaceConnection';
// import { SessionOptions } from 'solace';
const dbUri = 'mongodb://localhost:27017/mydatabase'; // Replace with your MongoDB URI
// const database = new Database(dbUri);
// Initialize Solace connection
// const solaceConnection = new SolaceConnection({
//   url: 'your-solace-url',
//   vpnName: 'your-vpn-name',
//   userName: 'your-username',
//   password: 'your-password',
// });
class Server {
  private app: Express;
  // private solaceSubscriber: SolaceSubscriber;
  // private solaceConnection: SolaceConnection;

  constructor() {
    this.app = express();
    config(); // Load environment variables
    // this.solaceSubscriber = new SolaceSubscriber();
    // this.solaceConnection = this.setupSolaceConnection();

    this.configureEnvironment();
    this.configureMiddleware();
    this.configureRoutes();
    this.connectDB();
  }

  private configureEnvironment(): void {
   // dotenv.config();
  }

  private connectDB(): void {
    Database.connectToMongo()
    console.log("Connecting to Mongo", Database.getDB);
  }

  private configureMiddleware(): void {
    this.app.use(express.json());
    this.app.use(loggerMiddleware); // Add logger middleware here
  }

  private configureRoutes(): void {
    this.app.use('/api', cmnRouter);
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  private setupSolaceConnection(): SolaceConnection {
    // const solaceSessionOptions: SessionOptions = {
    //   url: env.solaceUrl,
    //   vpnName: env.solaceVpn,
    //   userName: env.solaceUsername,
    //   password: env.solacePassword,
    // };
    const solaceOptions = {
      // Specify any additional Solace connection options here
    };
    // const solaceConnection = new SolaceConnection({url:env.solaceUrl, vpnName:env.solaceVpn, userName:env.solaceUsername, password:env.solacePassword});
    // solaceConnection.setupSolaceConnection();
    return new SolaceConnection(env.solaceUrl, env.solaceVpn, env.solaceUsername, env.solacePassword, solaceOptions);
  }

  //   private configurePubSub() {
  //     this.solaceSubscriber.subscribeToTopic('user_created', (topic, message) => {
  //       console.log(`Received message on topic '${topic}': ${message}`);
  //     // Handle the user_created message here
  //   });

  //   this.solaceSubscriber.subscribeToTopic('user_updated', (topic, message) => {
  //     console.log(`Received message on topic '${topic}': ${message}`);
  //     // Handle the user_updated message here
  //   });

  //   this.solaceSubscriber.subscribeToTopic('user_deleted', (topic, message) => {
  //     console.log(`Received message on topic '${topic}': ${message}`);
  //     // Handle the user_deleted message here
  //   });

  //   process.on('SIGINT', () => {
  //     this.solaceSubscriber.disconnect();
  //     process.exit();
  //   });
  // }
  public start(port: string | number): void {
    this.app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  }
}

const server = new Server();
server.start(env.port);
