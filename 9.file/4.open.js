/**
 * Created by xuhuaiyu on 2015/10/2.
 */

var fs = require('fs');
/**
 * fs.open(path, flags, mode, callback_)
 * path : 文件路径
 * flags : 模式，r读、w写、a追加
 * mode : 权限
 * callback_(err, fd) : fs会取参数列表中最后一个参数作为回调函数。
 *  err : 错误信息
 *  fd : 文件描述符，这是一个开发文件的索引，是累加的
 *   0 stdin 标准输入
 *   1 stdout 标准输出
 *   2 stderr 错误输出
 *   3 打开一个文件（开发文件 +1，关闭文件 -1）
 *   4 又打开一个文件
 */
fs.open('msg.txt','r',function(err,fd) {
    console.log("open 1:",err, fd);
    fs.close(fd); // 关闭fd
    fs.open('msg.txt','r',function(err,fd){
        console.log("open 2:",err, fd);
    });
});


/**
 * 读取文件 可以多次读取，每次读一小部分
 * fs.read(fd, buffer, offset, length, position, callback)
 * fd 文件描述符
 * buffer 读到哪个buffer里
 * offset buffer偏移量，从buffer的哪里开始写
 * length 读写多少个字节。可能发生读不满的情况
 * position 从文件的哪个位置开始读
 * callback(err,bytesRead,buf)
 *  err : 错误信息
 *  bytesRead : 实际读到的字节数
 *  buf :
 */
fs.open('msg.txt','r',function(err,fd) {
    var buffer = new Buffer(9);
    fs.read(fd,buffer,0,6,3,function(err,bytesRead,buf){
        console.log(buffer === buf); // true 就是同一个对象
        console.log(bytesRead); // 实际读取到的长度
        console.log(buffer.slice(0,bytesRead).toString()); // 没有读满buffer
        fs.read(fd,buffer,6,3,9,function(err,bytesRead,buf){
            console.log(buffer.toString());
        });
    });
});