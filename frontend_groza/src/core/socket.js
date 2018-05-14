import io from 'socket.io-client';

export default class EventsSocket {
  constructor() {
    const that = this;

    this.socket = io(window.grozaConfig.rgUrl, {
      transports: ['websocket'],
      // upgrade: false,
      // path: '/'
    });

    this.socket.on('connection', function (socket) {
      that.socket.on('events', function (msg) {
        console.log('message: ' + msg);
      });
    });
  }

  getEvents() {
    const that = this;
    return new Promise((resolve, reject) => {
      that.socket.emit('find', 'events', (error, events) => {
        if (error) reject(error);
        resolve(events);
      });
    });
  }
}
