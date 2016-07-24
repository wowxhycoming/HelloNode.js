/**
 * 7.websocket_impl_server.js
 * @auther xuhuaiyu
 * @create 2016-07-24 15:57
 *
 * 自己实现一个websocket服务端
 */

var url = require('url');
var http = require('http');
var crypto = require('crypto');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
util.inherits(MyWebSocketServer,EventEmitter);

//创建自己的websocket服务器
function MyWebSocketServer(options,callback){
    var self = this;
    function shaKey(key){
        var shasum = crypto.createHash('sha1');
        shasum.update(key+'258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
        return  shasum.digest('base64');
    }
    this._server = http.createServer(function(req,res){
        var upgrade = req.headers['upgrade'];
        if(upgrade){
            // this.emit('abc');   // 什么情况
        }else{
            res.end('over');
        }
    });
    this._server.listen(options.port,options.host);
    this._server.on('abc', function(){
        console.log("123");
    });
    this._server.on('upgrade',function(req,socket,upgradeHead){
        console.log('upgrade');
        self.socket = socket;
        socket.setEncoding('utf8');
        var key = req.headers['sec-websocket-key'];
        key = shaKey(key);
        var headers = [
            "HTTP/1.1 101 Switching Protocols",
            "Upgrade: websocket",
            "Connection: Upgrade",
            "Sec-WebSocket-Accept: "+key
        ];
        socket.write(headers.concat('','').join('\r\n')); // 请求头后加两个空行
        socket.on('data',function(data){
            self.emit('message',data);
        });
    });
}
MyWebSocketServer.prototype.send = function(data){
    this.socket.write(data);
}
var wss = new MyWebSocketServer({port:8080});
wss.on('message',function(message){
    console.log('received:%s',message);
    //服务器向客户端发消息
    wss.send('你好 客户端');
});
