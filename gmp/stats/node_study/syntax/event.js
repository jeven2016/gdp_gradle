var events = require('events');

var emitter = new events.EventEmitter();

emitter.on('evt', function (arg1, arg2) {
    console.log("get a event: %s, %s", arg1, arg2);
});

emitter.emit('evt', 'haha','one event');
