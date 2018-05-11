const errors = require('restify-errors');
const Router = require('restify-router').Router;
const RedisClient = require('../redisClient');
const router = new Router();

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
            RedisClient.rg.initEvents(getEventsResult);
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
            next(new errors.InternalServerError());
        }
    }
);

module.exports = router;