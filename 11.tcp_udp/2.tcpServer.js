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

// 保存所有连接上来的socket对象
var sockets = [];

server.on('connection', function(socket){

    // unref() 不是立即关闭服务器，而是等待所有的客户端都断开了，才关闭。期间新客户端是可以连接的
    setTimeout(function(){
        server.unref();
        console.log('unref');
    }, 10000);

    console.log('connected');
    sockets.push(socket); // 保存socket
    socket.setEncoding('utf8');

    // 在写入文件之前，判断当前文件大小
    // 用pipe无法实时监控文件大小，这种方式只能在新客户端连接上来后创建新文件；或者用 on data 事件来实现。
    var stat = fs.statSync('tcp2_'+count+'.txt'); // 同步方法，知识为了代码方便
    if(stat.size > 10) { //
        count++;
        console.log(count);
        sockets.forEach(function(s){
            s.unpipe(out); // 解绑原来输出流
            out = fs.createWriteStream('tcp2_'+count+'.txt');
            s.pipe(out,{end:false});// 指向新的输出流
        });
    } else {
        socket.pipe(out, {end:false});
    }

    socket.on('end',function(){
        console.log('end');
    });

    socket.on('close',function(socket){
        console.log('close',socket);
    });

    socket.on('error',function(socket){
        console.log('error',socket);
        socket.destroy();
    });

});

server.listen(9000);