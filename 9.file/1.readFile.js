/**
 * Created by xuhuaiyu on 2015/10/2.
 */

var fs = require('fs');

/**
 * 同步方式读取文件
 */
var content = fs.readFileSync('msg.txt','utf-8');
console.log(content);

/**
 * 异步方式读取文件
 * 尽量使用异步的方式，只有要读取文件作为前置条件的时候
 */
fs.readFile('msg.txt','utf8',function(err,data){
    console.log(err);
    console.log(data);
});


fs.readFile('msg.txt',{ encoding: 'utf8', flag: 'r' },function(err,data){
    console.log(err);
    console.log(data);
});