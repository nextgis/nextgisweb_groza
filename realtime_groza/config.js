module.exports.expireRules = [
    [0, 60],
    [61, 300],
    [301, 600],
    [601, 1200],
    [1201, 1800],
    [1801, 2400],
    [2401, 3000],
    [3001, 3600],
    [3601, 10000],
    [10001, 50000],
    [50001, 86400]
];

module.exports.rgConfig = {
    host: '{YOUR_REARTIME_GROZA_HOST}',
    port: '{YOUR_REALTIME_GROZA_PORT}'
};

module.exports.redisConfig = {
    host: 'localhost',
    port: 6379,
    db: 1
};