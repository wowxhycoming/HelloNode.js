/**
 * Created by xuhuaiyu on 2015/10/15.
 */

/*
 * UDP 用户数据报
 * UDP 不需要创建连接，直接发数据；TCP 需要先创建连接，再发数据
 * TCP 是可靠的传输手段，如果收不到数据，会提示重发。可靠，慢。
 * UDP 不可靠的传输手段。不可靠，快。
 * TCP 中，server 和 client 是两个对象，server 是 Server 对象， client 是 net.Socket 对象。
 * UDP 中，server 和 client 是同一个对象，都是 Socket 对象。
 */

var dgram = require('dgram');
var server = dgram.createSocket('udp4'); // udp4 是版本号
//当客户端发送消息的时候触发
/**  send方法参数
 * buffer,
 * offset, buffer的偏移量  从第几个字节开始
 * length,
 * port,
 * address,
 * callback
 */

// UDP 不是流的对象，所以没有 data 等事件。
// 在 server 绑定成功后会触发
server.on('listening',function(){
    var address = server.address();
    console.log('服务器开始监听,地址为',address);
});

// 当客户端发消息的时候触发
server.on('message',function(msg,remoteInfo){
    console.log(msg.toString());
    console.log(remoteInfo);
    server.send(new Buffer('爱克斯诶吃歪'),3,6,remoteInfo.port,remoteInfo.address);
});

server.bind(9100,'localhost');