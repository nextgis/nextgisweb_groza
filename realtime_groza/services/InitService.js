const redisDb = require('../redis.db');

class InitService {

    async create(getEventsResult, params) {
        try {
            const result = redisDb.flushdb();
            redisDb.createEventsItems(getEventsResult.data);

            return {
                success: true,
                data: {
                    count: getEventsResult.data.length,
                    start: getEventsResult.start,
                    stop: getEventsResult.stop
                }
            };
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new InitService();
