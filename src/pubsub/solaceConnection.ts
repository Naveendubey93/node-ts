import { Session, Message, SolclientFactory, SessionOptions } from 'solace';
// import { SessionOptions, SolclientFactory } from 'solclientjs';
interface SessionProperties {
  url?: string;
  vpnName?: string;
  userName?: string;
  password?: string;
  [key: string]: any; // Add additional properties if needed
}
export class SolaceConnection {
  // private session: Session;

  // private session: Session;
  private url: string;
  private vpnName: string;  
  private username: string;
  private password: string;
  private options: SessionProperties;
 constructor(url: string,vpnName:string, username: string, password: string, options: SessionProperties
 ) {
  //  this.session = session;
    this.url = url;
    this.vpnName = vpnName;
    this.username = username;
    this.password = password;
    this.options = options;
  }
 public setupSolaceConnection(): void {
    // const session = new Session(this.options as any);
    
    // Set up session event listeners and other configuration
    // ...

    // session.connect();
  }
//  public publishMessage(topic: string, message: string) {
//     const session = new Session(this.options as any);
    
//     // Set up session event listeners and other configuration
//     // ...

//     session.connect();
//       // const session = new Session(this.options as any);

//     const messageObj: Message = SolclientFactory.createMessage();
//     messageObj.setDestination(SolclientFactory.createTopicDestination(topic));
//     messageObj.setBinaryAttachment(message);

//     session.send(messageObj);
//     session.disconnect();
//   }
  // public setupSolaceConnection(): void {
  //   const factoryProps = new SolclientFactory.SolclientFactoryProperties(
  //     SolclientFactory.SOLCLIENT_LOG_DEPRECATION | SolclientFactory.SOLCLIENT_LOG_DEBUG,
  //     SolclientFactory.SOLCLIENT_LOG_DEBUG,
  //   );
  //   SolclientFactory.init(factoryProps);

  //   const sessionProps = new SolclientFactory.SolclientSessionProperties();
  //   sessionProps.url = this.url;
  //   sessionProps.userName = this.username;
  //   sessionProps.password = this.password;

  //   const session = SolclientFactory.createSession(sessionProps, new SolclientFactory.SolclientSessionEventCallback());

  //   // Set up session event listeners and other configuration
  //   // ...

  //   session.connect();
  // }

  // public getSession(): Session {
  //   return this.session;
  // }

  public disconnect() {
        const session = new Session(this.options as any);

        session.disconnect();
  }
}
