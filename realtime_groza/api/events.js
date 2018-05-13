const errors = require('restify-errors');
const Router = require('restify-router').Router;
const router = new Router();
const RedisDb = require('../redis.db').default;

const redisDb = new RedisDb();

router.post('/events', function indexHTML(req, res, next) {
        const events = JSON.parse(req.body);
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end('OK');
        next();
    }
);

router.post('/events/init', function indexHTML(req, res, next) {
        try {
            const getEventsResult = JSON.parse(req.body);

            const result = redisDb.flushdb();
            redisDb.createEventsItems(getEventsResult.data, 10);

            res.json({
                success: true,
                data: {
                    count: getEventsResult.data.length,
                    start: getEventsResult.start,
                    stop: getEventsResult.stop
                }
            });

            next();
        } catch (e) {
            console.log(e);
            next(new errors.InternalServerError());
        }
    }
);

module.exports = router;