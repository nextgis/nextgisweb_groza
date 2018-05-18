const Redis = require('ioredis');
const config = require('./config');

const redisIo = new Redis({
    host: config.redisConfig.host,
    port: config.redisConfig.port,
    db: config.redisConfig.db
});

module.exports = new class Subscriber {
    constructor() {
        this._subscriber = {};
        this._subscribeOnMessage();
    }

    _subscribeOnMessage(){
        const that = this;
        redisIo.on('message', (channel, message) => {
            if (channel in that._subscriber) {
                const callback = that._subscriber[channel];
                callback(channel, message);
            }
        });
    }

    subscribeKeySpaceEvent(eventName, callback) {
        const that = this;
        const promise = (resolve, reject) => {
            redisIo.on('ready', () => {
                redisIo.config('SET', 'notify-keyspace-events', 'KEA').then(() => {
                    console.log(`RedisDb ${config.redisConfig.db} on ${config.redisConfig.host}:${config.redisConfig.port} set notify-keyspace-events`);
                    const channel = `__keyevent@${config.redisConfig.db}__:${eventName}`;
                    redisIo.subscribe(channel).then(() => {
                        console.log(`Subscriber:subscribeEvent => channel "${channel}"`);
                        if (channel in that._subscriber) {
                            throw Exception(`Subscriber.subscribeKeySpaceEvent: channel "${channel}" already registered.`)
                        }
                        that._subscriber[channel] = callback;
                        resolve();
                    });
                });
            })
        };
        return new Promise(promise);
    }
}();