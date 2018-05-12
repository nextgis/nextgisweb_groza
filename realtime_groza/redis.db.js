const Redis = require('ioredis');
const config = require('./config');

exports.default = class RedisDb {
    constructor() {
        this.redis = new Redis({
            host: config.redisConfig.host,
            port: config.redisConfig.port,
            db: config.redisConfig.db
        });
        this.redis.on('ready', () => {
            this.redis.config('SET', 'notify-keyspace-events', 'KEx');
            console.log('RedisDb set notify-keyspace-events');
        });
    }

    get(key) {
        return this.redis.get(key);
    }

    flushdb() {
        return this.redis.flushdb();
    }

    createEvents(eventItems, expire) {
        const multi = this.redis.multi();

        for (let eventItem of eventItems) {
            const eventId = eventItem.id;
            const eventJson = JSON.stringify(eventItem);
            const key = `event:${eventId}:json`;

            multi
                .set(key, eventJson)
                .set(key, expire)
                .expire(key, expire);
        }

        multi.exec()

    }
};