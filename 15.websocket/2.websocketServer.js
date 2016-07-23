/**
 * Created by xuhuaiyu on 2015/12/29.
 */

// 创建 WebSocketServer
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port:8080});

// 服务器监听客户端的连接事件
wss.on('connection', function(ws) {
    console.log('server : client connected');
    // 服务器监听客户端发送消息的事件
    ws.on('message', function(message) {
        console.log("server : received:%s", message);
        // 服务器向客户端发消息
        ws.send('server say hello');
    })
});