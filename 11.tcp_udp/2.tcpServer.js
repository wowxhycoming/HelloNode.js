/**
 * Created by xuhuaiyu on 2015/10/15.
 */

/**
 * 功能描述，接收客户端连接，接收客户端数据，并保存到文件中
 * 当文件达到某一大小后，新建文件保存
 */

var net = require('net');
var fs = require('fs');
var util = require('util');

var count =0;
var out = fs.createWriteStream('tcp2_'+count+'.txt');

out.on('finish',function(){
    console.log('finished');
});

var server = net.createServer();

server.on('connection', function(socket){
    console.log('connected');

    socket.setEncoding('utf8');

    // 在写入文件之前，判断当前文件大小
    var stat = fs.stat('tcp2_'+count+'.txt'); // 同步方法
    if(stat.size > 10 * 1024) { //
        count++;
        out = fs.createWriteStream('tcp2_'+count+'.txt');
    } else {
        socket.pipe(out, {end:false});
    }

    socket.on('end',function(){
        console.log('end');
    });

    socket.on('close',function(){
        console.log('close');
    });

    socket.on('error',function(){
        console.log('error');
        socket.destroy();
    });
});

server.listen(9000);