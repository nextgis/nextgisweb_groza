const _ = require('lodash');
const RedisSubscriber = require('./redis.subscriber');
const config = require('./config');

class RedisSetController {
    static subscribeSet() {
        const eventName = 'set';
        RedisSubscriber.subscribeKeySpaceEvent(eventName, (channel, key) => {
            console.log(`${channel} => ${key}`);
        });
    }
}

module.exports = RedisSetController;