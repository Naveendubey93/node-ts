// const solace = require('solace');
import { Session, SessionProperties, createSession  } from 'solace';
import * as solace from 'solace';
// import { Session, SessionProperties, createSession } from 'solclientjs';

interface SessionOptions {
  url: string;
  vpnName: string;
  userName: string;
  password: string;
  // Other session options you might need
}

export class SolacePublisher2 {
  // private session: Session;

 constructor(sessionOptions: SessionOptions) {
  
    // this.session = this.createSession(sessionOptions);
    // this.setupSessionEventHandlers();
    // this.connect();
  }

  private createSession(sessionOptions: SessionOptions): Session {
    const sessionProps: SessionProperties = {
      url: sessionOptions.url,
      vpnName: sessionOptions.vpnName,
      userName: sessionOptions.userName,
      password: sessionOptions.password,
      // Assign other session options as needed
    };

    return this.createSession(sessionProps);
  }


  private setupSessionEventHandlers(): void {
    // this.session.on(solace.SessionEventCode.UP_NOTICE, () => {
    //   console.log('Solace session is up and running.');
    // });

    // this.session.on(solace.SessionEventCode.CONNECT_FAILED_ERROR, () => {
    //   console.log('Solace session connection has failed.');
    // });
  }

  private connect(): void {
    try {
      // this.session.connect();
    } catch (error) {
      console.error('Failed to connect to Solace session:', error);
    }
  }

  // public publishMessage(payload: string, destination: string): void {
  //   const message = solace.SolclientFactory.createMessage();
  //   message.setDestination(solace.SolclientFactory.createTopic(destination));
  //   message.setBinaryAttachment(payload);

  //   try {
  //     this.session.send(message);
  //     console.log('Message published successfully.');
  //   } catch (error) {
  //     console.error('Failed to publish message:', error);
  //   }
  // }
  public publishMessage(payload: string, destination: string): void {
  const message = new solace.Message(payload);
  message.setDestination(destination);
  
  try {
    // this.session.send(message);
    console.log('Message published successfully.');
  } catch (error) {
    console.error('Failed to publish message:', error);
  }
}


  public disconnect(): void {
    try {
      // this.session.disconnect();
      console.log('Disconnected from Solace session.');
    } catch (error) {
      console.error('Failed to disconnect from Solace session:', error);
    }
  }
}
