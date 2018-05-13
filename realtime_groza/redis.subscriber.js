const Redis = require('ioredis');
const config = require('./config');

const subscriber = new Redis({
    host: config.redisConfig.host,
    port: config.redisConfig.port,
    db: config.redisConfig.db
});

exports.default = new class Subscriber {
    subscribeEvent(eventName) {
        const promise = (resolve, reject) => {
            subscriber.on('ready', () => {
                subscriber.config('SET', 'notify-keyspace-events', 'KEA').then(() => {
                    console.log(`RedisDb ${config.redisConfig.db} on ${config.redisConfig.host}:${config.redisConfig.port} set notify-keyspace-events`);
                    const channel = `__keyevent@${config.redisConfig.db}__:${eventName}`;
                    subscriber.subscribe(channel).then(() => {
                        console.log(`Subscriber:subscribeEvent => channel "${channel}"`);
                        resolve();
                    });
                });
            })
        };
        return new Promise(promise);
    }

    psubscribe(template) {
        const promise = (resolve, reject) => {
            subscriber.on('ready', () => {
                subscriber.config('SET', 'notify-keyspace-events', 'KEA').then(() => {
                    console.log(`RedisDb ${config.redisConfig.db} on ${config.redisConfig.host}:${config.redisConfig.port} set notify-keyspace-events`);
                    subscriber.psubscribe(template).then(() => {
                        console.log(`Subscriber:psubscribe => template "${template}"`);
                        resolve();
                    });
                });
            })
        };
        return new Promise(promise);
    }

    on(event, callback) {
        subscriber.on(event, (channel, message) => {
            callback(channel, message);
        });
    }
}();