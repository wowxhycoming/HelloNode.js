/**
 * Created by xuhuaiyu on 2015/10/17.
 */

var net = require('net');
var fs = require('fs');
var util = require('util');

var buffer = new Buffer(128 * 1024);
buffer.fill('a');
fs.writeFile('tcp1.txt',buffer);


var server = net.createServer();
server.on('connection', function(socket){

    // 流是不可再生资源，为每个客户端都建立一个流，保证有数据写给客户端
    var out = fs.createReadStream('tcp1.txt');

    socket.setEncoding('utf8');

    out.on('data',function(chunk){
        var flag = socket.write(chunk);
        console.log('flag:',flag,chunk.length);
        console.log('当前socket缓存队列中缓存了%d字符',socket.bufferSize);
    });

    socket.on('data', function(chunk){
        console.log('当前客户端接收%d字节', chunk.length);
        console.log('已经接收到的%d字节',socket.bytesRead);
    });

    socket.on('drain',function(){
        console.log('TCP缓存区里的数据发送完毕');
    });

});

server.listen(9000);