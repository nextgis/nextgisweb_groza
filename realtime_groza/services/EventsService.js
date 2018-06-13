const redisDb = require('../redis.db');

class EventsService {

    async create(getEventsResult, params) {
        try {
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

    async find(params) {
        try {
            const keys = await redisDb.getKeys('event:*:json');
            const jsonValues = await redisDb.getValues(keys);
            return jsonValues.map(v => JSON.parse(v[1]));
        } catch (e) {
            console.log(e);
        }
    }

    expire(data){
        this.emit('expire', { data: data });
    }
}

module.exports = new EventsService();
