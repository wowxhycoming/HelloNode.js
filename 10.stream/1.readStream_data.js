/**
 * Created by xuhuaiyu on 2015/10/4.
 */

/**
 * fs.readFile
 * 优点：操作简单
 * 缺点：将文件一次性读入，可能出现内存溢出
 */

/**
 * fs.read
 * 优点：可以设置缓冲区，不会出现内存溢出
 * 缺点：需要掌控文件读取过程，从哪里读、读多少、要维护很多所以、计算等
 */

/**
 * 有些时候，不关心文件内容、文件大小
 * 往往只需要关注是否有数据，以及接到到数据如何处理，合适结束。
 * 流是有序的，按字节进行传输
 *
 * 读取流分为二种读取模式
 * 流动模式 迫使操作系统尽快读出数据，
 * 非流动模式  需要通过代码去读取
 *
 * ReadStream 继承 Readable 继承 Stream
 *  path 文件路径
 *  [options] 选项，例：{flags:w, start:3, end:8}
 *      fd 文件索引 可空
 *      flags 打开方式 w r w+ r+ xw xr a
 *      mode 文件权限
 *      start 文件的起始位置
 *      end 文件的结束位置
 *          *** 这里注意，一般结束坐标是不包含结束字符的，但是只有这个方法的结束坐标包含结束字符，所以结束坐标是常规值-1
 *      autoClose  是否自动关闭
 */

/**
 * 常用的可读流
 *  fs.ReadStream 读取文件流
 *  http.IncomingMessage 客户端请求对象
 *  net.Socket TCP客户端
 *  gzip deflate 数据压缩流
 */

var fs = require('fs');
var fileName1 = 'msg1.txt';
var fileName2 = 'msg2.txt';
var fileName3 = 'msg3.txt';

// 创建一个65K的文件
fs.writeFile(fileName1, new Buffer(65 * 1024));
fs.writeFile(fileName2, new Buffer(65 * 1024));
fs.writeFile(fileName3, new Buffer(65 * 1024));

// ReadStream 默认一次读取64K的数据
// 如果读取65K的文件将触发2次on data事件， 如果读取64K的文件将触发1次on data事件
// 也就是，无论数据缓冲区和数据源之间如何取值，都不会产生多余的读取次数（来确定文件是否已经读完）
var rs1 = fs.createReadStream(fileName1 ,{highWaterMark : 2 * 1024});

rs1.on('open', function(){
    console.log('open_1');
});

// 如果不监听data事件，就默认为暂停，那么end事件和close事件也不会触发了
rs1.on('data', function(data) {
    setTimeout(function() {
        console.log('data_1:' + data.length);
    }, 5000);
});

rs1.on('end', function () {
   console.log('end_1');
});

rs1.on('close', function(){
    console.log('close_1');
});

// ------------
// 当监听了data事件，就会不停的触发，如何才能停止，停止了又如何重新触发

var rs2 = fs.createReadStream(fileName2);

rs2.on('open', function() {
   console.log('open_2');
});

// 暂停触发data事件
// 如果不回复监听，则与上面不对data事件进行监听一样，后面跟流有关的代码将不会执行了；但是不会阻碍跟流无关的代码执行
rs2.pause();

// 1秒钟之后再次触发
setTimeout(function(){
    // 相当于再次触发data事件
    rs2.resume();
},1000);

// ?这里就不是一定可以读到数据的了?，可以多运行几次，下面模拟场景
rs2.on('data', function(data) {
    console.log('data_2:' + data.length);
});


// ------------
// 在resume()后，稍等片刻再读取数据
var rs3 = fs.createReadStream(fileName3);

rs3.on('open', function() {
    console.log('open_3');
});

// 触发data事件，数据已经流走，再也找不回来了
rs3.resume();

setTimeout(function() {
    // 事件已经发射完毕，再监听就没有用了
    rs3.on('data', function(data) {
        console.log('data3:' + data.length);
    })
},1000);

rs3.on('close', function(){
    console.log('close_3');
});