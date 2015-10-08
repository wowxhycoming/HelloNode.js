/**
 * Created by xuhuaiyu on 2015/10/7.
 */

/**
 * ReadStream 的 on data 事件带来的问题
 * 只要path有数据，就会不停的触发on data事件，是不考虑on data事件的回调函数的处理速度的
 * 为了解决这个问题，采用非流模式来处理
 */

var fs = require('fs');

var fileName1 = 'msg1.txt';
var fileName2 = 'msg2.txt';

fs.writeFile(fileName1, new Buffer(65 * 1024));

// ReadStream 默认一次读取64的文件，读取65K的文件将触发两次on data事件
// 这里设置缓冲区大小
var rs1 = fs.createReadStream(fileName1 /*,{highWaterMark : 64 * 1024}*/);
var arr = [];

rs1.on('open', function(){
    console.log('open_1');
});

rs1.on('readable', function() {
    var data;
    console.log('readable_1');
    var count = 0;
    // 这里设置每次从缓冲区读取的大小，缓冲区64 * 1024， 每次读取1024 ，一共读取64次；
    // 缓冲区被读取完毕，才会触发下一次 on readable
    while(null != (data = rs1.read(1024))){
        console.log(count ++);
        arr.push(data);
    }
    // 在 on readable 中， 如果不对数据进行处理，与流有关的程序就结束了
});

rs1.on('end', function () {
    var result = Buffer.concat(arr);
    console.log('end_1:' + result.length);
});

// ------
var rs2 = fs.createReadStream(fileName2 /*,{highWaterMark : 64 * 1024}*/);

rs2.on('open', function () {
   console.log('open_2')
});

rs2.on('readable', function() {
    // 只会触发一次readable事件
    // 与data事件不同，如果不将缓冲区的数据读完，是不会触发下一次readable事件的
    console.log('readable_2');
});

rs2.on('end', function() {
   console.log('end_2');
});
