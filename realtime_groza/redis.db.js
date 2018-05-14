const Redis = require('ioredis');
const redisConfig = require('./config');
const ExpireRules = require('./core/expireRules').ExpireRules;

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
            eventItem.rule = this._makeExpireKey(eventItem, tsNow, multi);
            const eventJson = JSON.stringify(eventItem);
            const jsonKey = `event:${eventId}:json`;
            multi.set(jsonKey, eventJson);
        }
        multi.exec()
    }

    _makeExpireKey(eventItem, tsNow, multi) {
        const expireKey = `event:${eventItem.id}:ex`;
        const [expire, rule] = ExpireRules.getRangeExpire(eventItem.lm_ts, tsNow);

        if (expire === null) {
            console.log(`RedisDb.createEventsItems: Event "${eventItem.id}" is not in range for ${eventItem.lm_ts} sec. Now ${tsNow} sec.`)
        }

        multi
            .set(expireKey, rule)
            .expire(expireKey, expire);

        return rule;
    }
}

const redisDb = new RedisDb();
module.exports = redisDb;