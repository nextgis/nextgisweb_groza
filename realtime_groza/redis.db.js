const Redis = require('ioredis');
const redisConfig = require('./config');
const RedisExpireController = require('./redis.controller.expire');

class RedisDb {
    constructor() {
        this.redis = new Redis({
            host: redisConfig.redisConfig.host,
            port: redisConfig.redisConfig.port,
            db: redisConfig.redisConfig.db
        });
    }

    get(key) {
        return this.redis.get(key);
    }

    getKeys(template) {
        return this.redis.keys(template);
    }

    getValues(keys) {
        const multi = this.redis.multi();
        for (let key of keys) {
            multi.get(key);
        }
        return multi.exec();
    }

    flushdb() {
        return this.redis.flushdb();
    }

    createEventsItems(eventItems) {
        const tsNow = Math.floor(Date.now() / 1000);

        const multi = this.redis.multi();
        for (let eventItem of eventItems) {
            const eventId = eventItem.id;

            const [expireTimeSec, rule] = RedisExpireController.getRangeExpire(eventItem.lm_ts, tsNow);
            if (expireTimeSec === null) {
                console.log(`RedisDb.createEventsItems: Event "${eventItem.id}" is not in range for ${eventItem.lm_ts} sec. Now ${tsNow} sec.`);
                continue;
            }
            const expireKey = `event:${eventItem.id}:ex`;
            multi
                .set(expireKey, rule)
                .expire(expireKey, expireTimeSec);

            eventItem.rule = rule;
            const eventJson = JSON.stringify(eventItem);
            const jsonKey = `event:${eventId}:json`;
            multi.set(jsonKey, eventJson);
        }
        multi.exec()
    }
}

const redisDb = new RedisDb();
module.exports = redisDb;