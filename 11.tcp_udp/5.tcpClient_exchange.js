/**
 * Created by xuhuaiyu on 2015/10/19.
 */

var net = require('net');

var socket = new net.Socket();
socket.setEncoding('utf8');

socket.connect(9000,'127.0.0.1',function(){

    console.log('client : ',socket.remoteAddress,socket.remotePort,socket.localAddress,socket.localPort);

    socket.write('你好');

    socket.on('data', function(chunk){
        console.log(chunk);
    });

    setTimeout(function(){
        socket.end('坏蛋');
    },3000);

    socket.on('error',function(err){
        console.log('error', err);
        socket.destroy();
    });
});