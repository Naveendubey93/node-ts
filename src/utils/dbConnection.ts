import mongoose, { Connection, Mongoose } from 'mongoose';

import env from '../config/env';

class Database {
  private mongooseInstance: Mongoose;
  private connection: Connection | null = null;

  constructor(private dbUri: string) {
    this.mongooseInstance = mongoose;
    this.mongooseInstance.Promise = global.Promise;
  }

  async connectToMongo(): Promise<void> {
    try {
      if (!this.connection) {
        // this.mongooseInstance = mongoose;
        // this.mongooseInstance.Promise = global.Promise; // Use native Node.js promises

         this.connection = await this.mongooseInstance.createConnection(this.dbUri, {
          // useNewUrlParser: true,
          // useUnifiedTopology: true,
        });
      }
    } catch (error) {
      throw new Error(`Error connecting to the database: ${error}`);
    }
  }


 getDB(): Connection {
    if (!this.connection) {
      throw new Error('Database connection has not been established.');
    }
    return this.connection;
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
    }
  }
}

const dbUri = 'mongodb://127.0.0.1:27017/mydatabase'; // Replace with your MongoDB URI
const database = new Database(dbUri);

// async function start() {
//   try {
//     await database.connectToMongo();
//     const db = database.getDB();
//     console.log(`Starting db connection`);
//     // Use db for database operations

//     // When finished, disconnect from the database
//     await database.disconnect();
//   } catch (error) {
//     console.error(error);
//   }
// }

// start();
export default new Database(dbUri);
