const redis = require('redis');
const config = require('./config');

const RedisClient = redis.createClient(config.redisConfig.port, config.redisConfig.host);

RedisClient.on('connect', () => {
    console.log(`connected to redis`);
});

RedisClient.on('error', err => {
    console.log(`Error: ${err}`);
});

RedisClient.rg = {};

RedisClient.rg.initEvents = (getEventsResult) => {
    RedisClient.flushdb();


    const multi = RedisClient.multi();
};

module.exports = RedisClient;