const
    feathers = require('@feathersjs/feathers'),
    express = require('@feathersjs/express'),
    socketio = require('@feathersjs/socketio'),
    RedisExpireController = require('./redis.controller.expire'),
    RedisSetController = require('./redis.controller.set'),
    EventsService = require('./services/EventsService'),
    InitService = require('./services/InitService'),
    config = require('./config');

const app = express(feathers());

app.use(express.json({
    limit: '20mb'
}));

app.use(express.urlencoded({
    limit: '20mb',
    extended: true,
    parameterLimit: 20000
}));

app.configure(express.rest());
app.configure(socketio());

app.use('init', new InitService());
app.use('events', new EventsService());

app.use(express.errorHandler());

app.on('connection', connection => {
    console.log('connection');
    console.log(connection);
    app.channel('everybody').join(connection);
});
app.publish(data => {
    console.log('data');
    console.log(data);
    app.channel('everybody')
});

RedisExpireController.subscribeExpire();
RedisSetController.subscribeSet();

app.listen(config.rgConfig.port, config.rgConfig.host).on('listening', () =>
    console.log(`Feathers server listening on ${config.rgConfig.host}:${config.rgConfig.port}`)
);