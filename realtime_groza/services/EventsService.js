const redisDb = require('../redis.db');

class EventsService {

    constructor () {
        this.events = ['createdEvents'];
    }

    async create(getEventsResult, params) {
        try {
            const eventItems = redisDb.createEventsItems(getEventsResult.data);
            const countEvents = getEventsResult.data.length;

            this.emit('createdEvents', {
                count: countEvents,
                events: eventItems
            });

            return {
                success: true,
                data: {
                    count: countEvents,
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
}

module.exports = new EventsService();
