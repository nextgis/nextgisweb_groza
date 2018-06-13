const io = require('socket.io-client');
const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');


export default class EventsSocket {
  constructor() {
    const that = this;

    this._socket = io(window.grozaConfig.rgUrl, {
      transports: ['websocket'],
      path: window.grozaConfig.rgPath
    });

    this._client = feathers();
    this._client.configure(socketio(this._socket));
  }

  onExpireCreate(callback) {
    const expireService = this._client.service('expire');
    expireService.on('created', callback);
  }

  offExpireCreate(callback) {
    const expireService = this._client.service('expire');
    expireService.removeListener('created', callback);
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

  destroy() {
    this._socket.disconnect();
  }
}
