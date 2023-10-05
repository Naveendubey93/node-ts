

// function connectSolacePublisher(url, vpnName, username, password) {
//   const session = solace.SolclientFactory.createSession({
//     url: url,
//     vpnName: vpnName,
//     userName: username,
//     password: password,
//   });

//   session.on(solace.SessionEventCode.UP_NOTICE, function (sessionEvent) {
//     console.log('Solace session connected successfully.');
//     publishMessage(session);
//   });

//   session.on(solace.SessionEventCode.CONNECT_FAILED_ERROR, function (sessionEvent) {
//     console.error('Failed to connect Solace session:', sessionEvent.infoStr);
//   });

//   session.connect();
// }

// function publishMessage(session) {
//   const topic = solace.SolclientFactory.createTopicDestination('your/topic');
//   const message = solace.SolclientFactory.createMessage();
//   message.setDestination(topic);
//   message.setBinaryAttachment('Hello, Solace!');

//   try {
//     session.send(message);
//     console.log('Message published successfully.');
//   } catch (error) {
//     console.error('Failed to publish message:', error);
//   }
// }

// // Call the function to connect the Solace publisher
// connectSolacePublisher(env.solaceUrl, env.solaceVpn, env.solaceUsername, env.solacePassword);

// url: env.solaceUrl,
// vpnName: env.solaceVpn,
// userName: env.solaceUsername,
// password: env.solacePassword

const solace = require('solclientjs');
import env from '../config/env';
const solaceConfig = new solace.SolclientFactoryProperties();
// Initialize the Solace factory
solace.SolclientFactory.init(solaceConfig);
export class SolacePublisher1 {
  constructor(url, vpnName, username, password) {
    this.session = solace.SolclientFactory.createSession({
      url: url, //env.solaceUrl,
      vpnName: vpnName, // env.solaceVpn,
      userName: username, //env.solaceUsername,
      password: password, //env.solacePassword
    });

    this.connect();
  }

  connect() {
    try {
      this.session.connect();
      console.log('Solace session connected successfully.');
    } catch (error) {
      console.error('Failed to connect Solace session:', error);
    }
  }

  publishMessage(topic, payload) {
    if (this.session.isConnecting()) {
      console.log('Cannot publish message while the session is connecting.');
      return;
    }

    if (this.session.isClosed()) {
      console.log('Cannot publish message. The session is closed.');
      return;
    }

    const message = solace.SolclientFactory.createMessage();
    message.setDestination(solace.SolclientFactory.createTopicDestination(topic));
    message.setBinaryAttachment(payload);

    try {
      this.session.send(message);
      console.log(`Message published to topic: ${topic}`);
    } catch (error) {
      console.error('Failed to publish message:', error);
    }
  }
}

class SolacePublisher {
  constructor(url, vpnName, username, password) {
    this.session = solace.SolclientFactory.createSession({
      url: url,
      vpnName: vpnName,
      userName: username,
      password: password,
    });

    this.connect();
  }

  connect() {
    try {
      this.session.connect();
      console.log('Solace session connected successfully.');
    } catch (error) {
      console.error('Failed to connect Solace session:', error);
    }
  }

  publishMessage(topic, payload) {
    if (this.session.isConnecting()) {
      console.log('Cannot publish message while the session is connecting.');
      return;
    }

    if (this.session.isClosed()) {
      console.log('Cannot publish message. The session is closed.');
      return;
    }

    const message = solace.SolclientFactory.createMessage();
    message.setDestination(solace.SolclientFactory.createTopicDestination(topic));
    message.setBinaryAttachment(payload);

    try {
      this.session.send(message);
      console.log(`Message published to topic: ${topic}`);
    } catch (error) {
      console.error('Failed to publish message:', error);
    }
  }
}

module.exports = SolacePublisher;

// module.exports = SolacePublisher;
