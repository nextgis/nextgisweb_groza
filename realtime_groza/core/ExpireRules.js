const _ = require('lodash');
const RedisSubscriber = require('../redis.subscriber').default;
const config = require('../config');

class ExpireRules {
    static getRangeExpire(tsEvent, tsNow) {
        const diff = tsNow - tsEvent;
        const rule = config.expireRules.find((rule) => {
            return _.inRange(diff, rule[0], rule[1]);
        });

        if (!rule) return [null, null];

        const expire = rule[1] - diff;
        return [expire, rule[0]];
    }

    static subscribeExpire() {
        const eventName = 'expired';
        RedisSubscriber.subscribeEvent(eventName).then(() => {
            console.log(`ExpireRules.subscribeExpire: subscribed to ${eventName} events`);
            RedisSubscriber.on('message', (channel, message) => {
                console.log(`${channel} => ${message}`);
            });
        });
    }
}

module.exports = ExpireRules;