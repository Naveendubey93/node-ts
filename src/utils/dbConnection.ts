import { MongoClient, MongoClientOptions, Db } from 'mongodb';
import env from '../config/env';

class Database {
  private client: MongoClient;
  private db: Db | null;

  constructor() {
    const uri = env.URI;
    const options: MongoClientOptions = {};

    // @ts-ignore
    options.useUnifiedTopology = true;
    
    this.client = new MongoClient(uri, options);
    this.db = null;
  }

  async connectToMongo(): Promise<void> {
    try {
      await this.client.connect();
      this.db = this.client.db();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      throw error;
    }
  }

  getDb(): Db {
    if (!this.db) {
      throw new Error('Database connection not established');
    }
    return this.db;
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.close();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Failed to disconnect from MongoDB', error);
      throw error;
    }
  }
}

export default new Database();
