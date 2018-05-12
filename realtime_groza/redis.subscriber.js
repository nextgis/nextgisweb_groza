const Redis = require('ioredis');
const config = require('./config');

const subscriber = new Redis({
    host: config.redisConfig.host,
    port: config.redisConfig.port,
    db: config.redisConfig.db
});

exports.default = new class Subscriber {
    subscribeKeyEvent(eventName, keyName = '') {
        const db = config.redisConfig.db;
        const channel = `__keyevent@${db}__:${eventName} ${keyName}`;
        subscriber.subscribe(channel);
        console.log(`Subscriber:subscribeKeyEvent => channel "${channel}"`);
    }

    on(event, callback) {
        subscriber.on(event, (channel, message) => {
            callback(channel, message);
        });
    }
}();