/**
 * Created by xuhuaiyu on 2015/10/19.
 */

var net = require('net');

var server = net.createServer({allowHalfOpen:true}); //不允许对方主动断开

server.on('connection', function(socket){
    console.log('server : ',socket.remoteAddress,socket.remotePort,socket.localAddress,socket.localPort);

    socket.setEncoding('utf8');
    socket.on('data',function(data){
        console.log('客户端说 ： ', data);
        socket.write('服务说:'+data);
    });
    setTimeout(function(){
        socket.close();
    },10 * 1000);

    // 客户端发起end请求
    socket.on('end',function(){
        console.log('end');
    });

    // 不管何种原因，只要关闭了都会触发
    socket.on('close',function(){
        console.log('close');
    });

    socket.on('error',function(err){
        // 客户端直接关闭是不科学的关闭方法，应该由客户端发起end请求来断开连接
        console.log('error', err);
        socket.destroy();
    });
});

server.listen(9000);