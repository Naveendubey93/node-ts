import { Session, Message } from 'solace';

class SolaceConnection {
  private session: Session;

  constructor(session: Session) {
    this.session = session;
  }

  public publishMessage(destination: string, payload: string): void {
    const message = new Message(payload);
    message.setDestination(destination);

    this.session.send(message);
  }
}

export { SolaceConnection };
