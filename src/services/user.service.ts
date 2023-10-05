import { UserModel } from '../models/user.model';
import { IUser } from '../models/user.model';
// import { SolacePublisher } = require('../pubsub/solacePublisher');
// import { SolacePublisher } from '../pubsub/solacePublisher';
// import SolacePublisher = require('solacePublisher');

// import { SolacePublisher } from  '../pubsub/solacePublisher.js';
const SolacePublisher = require('../pubsub/solacePublisher.js'); // Adjust the path as needed

import env from '../config/env';
// const solacePublisher = new SolacePublisher(env.solaceUrl, env.solaceVpn, env.solaceUsername, 'your-password');

// import { SolaceConnection } from '../pubsub/solaceConnection';

// const solacePublisher = new SolaceConnection(solaceSession);

export class UserService {
  //  private solacePublisher: typeof SolacePublisher;
     constructor() {
    // Initialize the SolacePublisher with the session options
    const sessionOptions = {
      // url: 'your-solace-broker-url',
      // vpnName: 'your-vpn-name',
      // userName: 'your-username',
      // password: 'your-password'
      url: env.solaceUrl,
      vpnName: env.solaceVpn,
      userName: env.solaceUsername,
      password: env.solacePassword
    };
    // this.solacePublisher = new SolacePublisher(sessionOptions);
  }
  public async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      console.log(`error at line 10`);
      throw new Error('Error retrieving users: ' + error);
    }
  }

  public async createUser(id: number, firstName: string, lastName: string,email: string, password: string): Promise<IUser> {
    try {
      const user = await UserModel.create({id, firstName, lastName, email, password });
      // new SolaceConnection(env.solaceUrl, env.solaceVpn, env.solaceUsername, env.solacePassword, {});
      // this.publishData(`${user}`);
       const destination = 'freedo/sms/send/> '; // Specify the destination topic
      await  this.publishMessage(`${user}`, destination);
      return user;
    } catch (error) {
      throw new Error('Error creating user: ' + error);
    }
  }

  public async getUserById(id: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findById(id).exec();
      return user;
    } catch (error) {
      throw new Error('Error retrieving user: ' + error);
    }
  }

  public async updateUser(id: string, name: string, email: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findByIdAndUpdate(id, { name, email }, { new: true }).exec();
      return user;
    } catch (error) {
      throw new Error('Error updating user: ' + error);
    }
  }

  public async deleteUser(id: string): Promise<void> {
    try {
      await UserModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error('Error deleting user: ' + error);
    }
  }
  //  public async publishData(data: string): Promise<void> {
  //   try {
  //     // const solacePublisher = new SolaceConnection(env.solaceUrl, env.solaceVpn, env.solaceUsername, env.solacePassword, {});
  //     // const solacePublisher = new SolacePublisher({
  //     //   url: env.solaceUrl,
  //     //   vpnName: env.solaceVpn,
  //     //   userName: env.solaceUsername,
  //     //   password: env.solacePassword,
  //     // });
  //     const solacePublisher = new SolacePublisher()

  //     const destination = 'freedo/sms/send/> '; // Specify the destination topic
  //     await  solacePublisher.publishMessage(destination, data);
  //     console.log('Message published successfully');
  //   } catch (error) {
  //     console.error('Failed to publish message:', error);
  //     throw new Error('Failed to publish message');
  //   }
  // }
   public publishMessage(payload: string, destination: string): void {
    // Use the SolacePublisher to publish a message
    
    // this.solacePublisher.publishMessage(payload, destination);
  }
}
