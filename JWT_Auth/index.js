const logEvents = require('./logevents');
const EventEmitter  = require('events');

class MyEmitter extends EventEmitter {};

const myEmitter = new MyEmitter();

myEmitter.on('log', (msg) => logEvents(msg));


setTimeout(() => {
    myEmitter.emit('log', 'This the log event created by Yasin Alhadi\n');
}, 2000)