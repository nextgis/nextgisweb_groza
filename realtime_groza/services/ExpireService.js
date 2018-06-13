const redisDb = require('../redis.db');

const NEW_EXPIRE_TYPE = 'NEW_EXPIRE';
const REMOVE_EVENT = 'REMOVE_EVENT';

class ExpireService {

    create(expireKeyData) {
        return new Promise((resolve, reject) => {
            let createdResult = {};
            const expireKey = expireKeyData.expireKey;
            redisDb.handleExpiredEvent(expireKey).then((handleExpiredEventResult) => {
                if (handleExpiredEventResult.type === 'NEW_EXPIRE') {
                    createdResult = {
                        success: true,
                        data: {
                            type: NEW_EXPIRE_TYPE,
                            rule: handleExpiredEventResult.event.rule,
                            id: handleExpiredEventResult.event.id
                        }
                    }
                } else if (handleExpiredEventResult.type === 'REMOVED_EVENT') {
                    createdResult = {
                        success: true,
                        data: {
                            type: REMOVE_EVENT,
                            id: handleExpiredEventResult.event.id
                        }
                    }
                }
               resolve(createdResult);
            });
        });
    }

    async find(params) {

    }
}

module.exports = new ExpireService();
