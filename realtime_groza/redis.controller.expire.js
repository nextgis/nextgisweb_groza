const _ = require('lodash');
const RedisSubscriber = require('./redis.subscriber');
const config = require('./config');

class RedisExpireController {
    static getRangeExpire(tsEvent, tsNow) {
        const diff = tsNow - tsEvent;
        const rule = config.expireRules.find((rule) => {
            return _.inRange(diff, rule[0], rule[1]);
        });

        if (!rule) return [null, null];

        const expireTimeSec = rule[1] - diff;
        return [expireTimeSec, rule[0]];
    }

    static subscribeExpire() {
        const eventName = 'expired';
        RedisSubscriber.subscribeKeySpaceEvent(eventName, (channel, key) => {
            console.log(`${channel} => ${key}`);
        });
    }
}

module.exports = RedisExpireController;