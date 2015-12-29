/**
 * Created by xuhuaiyu on 2015/12/29.
 */

// 创建websocket客户端
var WebSocket = require('ws');
var ws = new WebSocket('ws://127.0.0.1:8080/');

ws.on('open', function() {
    console.log('node client connected');
    ws.send('node client say hello');
});

ws.on('message', function(message) {
    console.log(message.toString());
});

