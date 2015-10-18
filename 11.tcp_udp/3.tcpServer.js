/**
 * Created by xuhuaiyu on 2015/10/17.
 */

var net = require('net');
var fs = require('fs');
var util = require('util');

var out = fs.createReadStream('tcp1.txt');

var server = net.createServer();
server.on('connection', function(socket){

    out.on('data',function(chunk){
        var flag = socket.write(chunk);
        console.log('已经接收到的%d字节',socket.bytesRead);
        console.log('flag:',flag,chunk.length);
        console.log('当前缓存队列中缓存了%d字符',socket.bufferSize);
    });

    socket.on('drain',function(){
        console.log('TCP缓存区里的数据发送完毕');
    });

});