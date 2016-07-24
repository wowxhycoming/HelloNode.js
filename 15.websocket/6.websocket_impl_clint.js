/**
 * 6.websocket_impl_clint.js
 * @auther xuhuaiyu
 * @create 2016-07-23 22:42
 *
 * 自己实现一个websocket客户端
 */

var url = require('url'); // 需要连接地址
var http = require('http'); // 第一次需要依靠HTTP建立连接
var crypto = require('crypto'); // 交换密钥
var util = require('util');
var EventEmitter = require('events').EventEmitter; // 需要事件

util.inherits(MyWebSocket,EventEmitter); // 使 MyWebSocket 可以发射事件

function shaKey(key){
    var shasum = crypto.createHash('sha1');
    shasum.update(key+'258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
    var digestResult = shasum.digest('base64');
    console.log(digestResult);
    return  digestResult;
}

function MyWebSocket(address) { // var ws = new WebSocket('ws://127.0.0.1:8080/');  实现通过构造函数创建对象
    var self = this;
    var serverUrl = url.parse(address);
    // 生成key。key 是客户端发送给服务器，用于服务器生成摘要信息返回的；expKey 是客户端希望收到服务器返回的摘要信息
    var key = new Buffer(('-'+Date.now()).toString('base64'));
    var expKey = shaKey(key);
    // 发送HTTP请求需要的对象
    var requestOptions = {
        host:serverUrl.hostname,
        port:serverUrl.port,
        // 构造头信息
        headers:{
            Connection: "Upgrade", // Connection: Upgrade
            Upgrade: "websocket", // Upgrade: websocket
            "Sec-WebSocket-Version": 13, // Sec-WebSocket-Version: 13
            "Host":serverUrl.host, // Host: 127.0.0.1:8080
            "Sec-WebSocket-Key":key // Sec-WebSocket-Key: yaPZD6O/4uOMH41iKdC4vw==
            //
        }
    }

    // 开始与服务器进行连接
    var req = http.request(requestOptions);

    // 连接完成后，http接受服务器信息的方式是 req.on('data', function)，但是这里不是
    req.on('upgrade',function(res,socket,upgradeHead){
        self.socket = socket;
        socket.setEncoding('utf8');
        console.log(res.headers);
        var serverkey = res.headers['sec-websocket-accept']; // 获取 server 返回的key
        console.log(expKey);
        console.log(serverkey);
        if(expKey == serverkey){
            self.emit('open'); // 发射 open 事件
        }
        socket.on('data',function(data){
            self.emit('message',data);
        })
    });

    //真正发起http请求
    req.end();
}

MyWebSocket.prototype.send = function(data){
    this.socket.write(data); // 真正发消息的方式，通过 socket 发送
}

// 应用
var ws = new MyWebSocket('ws://localhost:8080');
ws.on('open',function(){ // 监听 open 事件
    console.log('opened');
    ws.send('你好服务器');
});
ws.on('message',function(data){
    console.log(data);
});