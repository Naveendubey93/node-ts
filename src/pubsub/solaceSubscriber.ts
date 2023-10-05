import { Session, Message, SolclientFactory, SessionOptions } from 'solace';

export class SolaceSubscriber {
  private session: Session;

  constructor(options: SessionOptions) {
    this.session = new Session(options);
    this.session.connect();
  }

  public subscribeToTopic(topic: string, messageHandler: (topic: string, message: string) => void) {
    const subscription = SolclientFactory.createTopicSubscription(topic);
    this.session.subscribe(subscription);

    this.session.on('message', (message: Message) => {
      const topic = message.getDestination().getName();
      const messageBinary = message.getBinaryAttachment();
      const messageText = messageBinary ? messageBinary.toString() : '';
      console.log('Received message:', messageText);

      messageHandler(topic, messageText);
    });
  }

  public disconnect() {
    this.session.disconnect();
  }
}
