const restify = require('restify');
const socketio = require('socket.io');
const fs = require('fs');

const RedisClient = require('./redisClient');
const apiEventsRouter = require('./api/events');
const viewRouter = require('./view');

const server = restify.createServer({
    name: 'realtime_groza',
    version: '1.0.0'
});

server.use(restify.plugins.bodyParser({
    mapParams: true
}));

const io = socketio.listen(server.server);

apiEventsRouter.applyRoutes(server);
viewRouter.applyRoutes(server);

io.sockets.on('connection', function (socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

server.on('uncaughtException', (req, res, route, err) => {
    console.log(err); // Logs the error
    console.log('uncaughtException');
});

server.listen(8085, function () {
    console.log('socket.io server listening at %s', server.url);
});

process.on('SIGINT', function () {
    RedisClient.quit();
    console.log('Finished all requests');
    process.exit(0)
});