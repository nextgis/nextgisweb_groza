const Redis = require('ioredis');
const redisConfig = require('./config');
const ExpireRules = require('./expire.rules');

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

    static getExpiredKey(eventId) {
        return `event:${eventId}:ex`;
    }

    static getJsonKey(eventId) {
        return `event:${eventId}:json`;
    }

    static getEventIdFromExpiredKey(expiredKey) {
        return expiredKey.split(':')[1];
    }

    createEventsItems(eventItems) {
        const multi = this.redis.multi();
        for (let eventItem of eventItems) {
            RedisDb._makeEventItemKeys(multi, eventItem);
        }
        multi.exec();
        return eventItems;
    }

    static _makeEventItemKeys(multi, eventItem) {
        const [expireTimeSec, rule] = RedisDb._makeExpireKey(multi, eventItem);
        if (expireTimeSec === null && rule === null) return false;

        eventItem.rule = rule;
        const eventJson = JSON.stringify(eventItem);
        const jsonKey = RedisDb.getJsonKey(eventItem.id);
        multi.set(jsonKey, eventJson);

        return eventItem;
    }

    static _makeExpireKey(multi, eventItem) {
        const tsNow = Math.floor(Date.now() / 1000);
        const [expireTimeSec, rule] = ExpireRules.getRangeExpire(eventItem.ev_ts, tsNow);
        if (expireTimeSec === null) {
            console.log(`RedisDb.createEventsItems: Event "${eventItem.id}" is not in range for ${eventItem.lm_ts} sec. Now ${tsNow} sec.`);
            return [null, null];
        }
        const expireKey = RedisDb.getExpiredKey(eventItem.id);
        multi
            .set(expireKey, rule)
            .expire(expireKey, expireTimeSec);

        return [expireTimeSec, rule];
    }

    handleExpiredEvent(expiredKey) {
        const that = this;
        return new Promise((resolve, reject) => {
            const eventId = RedisDb.getEventIdFromExpiredKey(expiredKey);
            const jsonKey = RedisDb.getJsonKey(eventId);
            this.redis.get(jsonKey, function (err, eventJsonString) {
                const eventItem = JSON.parse(eventJsonString);
                const multi = that.redis.multi();
                const _makeEventItemResult = RedisDb._makeEventItemKeys(multi, eventItem);
                if (_makeEventItemResult) {
                    multi.exec();
                    resolve({
                        type: 'NEW_EXPIRE',
                        event: _makeEventItemResult
                    });
                } else {
                    const multiRemove = that.redis.multi();
                    multiRemove
                        .del(RedisDb.getJsonKey(eventItem.id))
                        .exec();
                    resolve({
                        type: 'REMOVED_EVENT',
                        event: eventItem
                    });
                }
            });
        });
    }
}

const redisDb = new RedisDb();
module.exports = redisDb;