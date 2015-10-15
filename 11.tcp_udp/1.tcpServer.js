/**
 * Created by xuhuaiyu on 2015/10/14.
 */

var net = require('net');
var fs = require('fs');
var util = require('util');

var count =0;
var out = fs.createWriteStream('./tcp'+count+'.txt');
// 当socket关闭的时候，查看 WriteStream 的状态
out.on('finish',function(){
    console.log('finished');
});
var server = net.createServer();

server.on('connection', function(socket){
    // socket 继承了 Duplex ， 是一个可读可写的双工流（Readable、Writable）
    // console.log(socket);
    console.log('connected');

    // 设置字符集（buffer转成字符串）
    socket.setEncoding('utf8');

    // ** pipe() 一定不能写到 on data 事件中，会多次触发，多次写入重复数据
    // 当有客户端断开连接的时候，socket 和 out 都会关闭，如果在发生向 out 的写入操作，将会报错，Error: write after end
    // 这里设置 pipe() 的 option 参数为false ， {end:false} ，禁止自动关闭
    socket.pipe(out/*, {end:false}*/);
    /*socket.on('data',function(chunk){
        console.log(chunk);
        // 向客户端写数据
        socket.write("server:"+chunk);
    });*/

    socket.on('end',function(){
        console.log('end');
        //console.log('end out:',util.inspect(out, true));
        //console.log('end socket:',util.inspect(socket, true));
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