const RedisSubscriber = require('./redis.subscriber');

class RedisExpireController {
    static subscribeExpire(app) {
        const expireService = app.service('expire'),
            eventName = 'expired';
        RedisSubscriber.subscribeKeySpaceEvent(eventName, (channel, expireKey) => {
            expireService.create({expireKey});
        });
    }
}

module.exports = RedisExpireController;