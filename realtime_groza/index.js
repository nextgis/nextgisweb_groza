const
    feathers = require('@feathersjs/feathers'),
    express = require('@feathersjs/express'),
    socketio = require('@feathersjs/socketio'),
    RedisExpireController = require('./redis.controller.expire'),
    RedisSetController = require('./redis.controller.set'),
    EventsService = require('./services/EventsService'),
    InitService = require('./services/InitService'),
    ExpireService = require('./services/ExpireService'),
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

app.use('init', InitService);
app.use('events', EventsService);
app.use('expire', ExpireService);

app.use(express.errorHandler());

RedisExpireController.subscribeExpire(app);
RedisSetController.subscribeSet(app);

app.service('expire').publish((data, context) => {
    return app.channel(`anonymous`);
});

app.service('events').publish('createdEvents', (data, context) => {
    console.log(data);
    return app.channel('anonymous').send(data);
});

app.on('connection', connection => {
    app.channel('anonymous').join(connection);
    console.log('anonymous');
});

app.listen(config.rgConfig.port, config.rgConfig.host).on('listening', () =>
    console.log(`Feathers server listening on ${config.rgConfig.host}:${config.rgConfig.port}`)
);