/**
 * 写入流的流程
 */
var fs = require('fs');

var fileName1 = 'msg1.txt';
var fileName2 = 'msg2.txt';
var fileName3 = 'msg3.txt';

/*var ws1  = fs.createWriteStream(fileName1);

var count = 100000;
for(var i=0;i<count;i++) {
    var flag = ws1.write(i.toString()); // 是否成功写入
    console.log(flag);
}

/!**
 * 当写入速度跟不上程序处理速度，WriteStream会把滞后的数据放入缓冲区，然后再从缓冲区取数据继续写入
 * 当缓冲区的数据排干，就触发drain事件
 *!/
ws1.on('drain',function(){
    console.log('缓存区中的数据全部输出');
});

ws1.on('error',function(err){
    console.log(err);
});

ws1.write('123');
ws1.end('123'); // fs.close()
ws1.write('456');*/

// ------------
// 复制文件 让fileName2文件中预先有数据  fs.writeFile(fileName2, new Buffer( 10 * 64 * 1024));
// 如果ReadStream每次读取数据的大小和缓冲区大小都是默认值64*1024， 那么会发生9次drain事件

// ReadStream每次读取的数据越小，延迟写入文件数据的缓冲区交换就会越频繁，发生写满再排干次数就会越少
var read  = fs.createReadStream(fileName2, {highWaterMark : 2 * 1024});
var write  = fs.createWriteStream(fileName3, {flags : 'a'}); // 追加写入

/*
// 如果读取速度快，写入速度慢，数据将会丢失
read.on('data', function(data) {
    write.write(data);
});

read.on('end', function() {
    write.end();
});*/

read.on('data',function(data){
    console.log('data_2');
    var flag = write.write(data);
    if(!flag){
        console.log('pause_2');
        read.pause();
    }
});

read.on('end',function(){
    console.log('end_2');
    write.end();
});

write.on('drain',function(){
    console.log('drain_2');
    read.resume();
});


// -------
// 复制文件这件事儿，一个pipe()搞定了

//read.pipe(write);