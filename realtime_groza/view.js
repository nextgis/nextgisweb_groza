const Router = require('restify-router').Router;

const router = new Router();

router.get('/', function (req, res, next) {
    res.send('Real-time groza application');
    return next();
});

module.exports = router;