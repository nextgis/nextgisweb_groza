import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';


export default class EventsSocket {
  constructor() {
    const that = this;

    this._socket = io(window.grozaConfig.rgUrl, {
      transports: ['websocket'],
      // upgrade: false,
      path: window.grozaConfig.rgPath
    });

    this._app = feathers().configure(socketio(this._socket));

    const eventsService = this._app.service('events');
    eventsService.on('created', function (message) {
      console.log('Created a message', message);
    });
    eventsService.on('expire', function (message) {
      console.log('Created a message', message);
    });

    // that.socket.on('events created', function (msg) {
    //   console.log('message: ' + msg);
    // });
    //
    // this.socket.on('connection', function (socket) {
    //
    // });
  }

  getEvents() {
    const that = this;
    return new Promise((resolve, reject) => {
      that._socket.emit('find', 'events', (error, events) => {
        if (error) reject(error);
        resolve(events);
      });
    });
  }
}
