/**
 * Created by xuhuaiyu on 2015/10/1.
 */

var path = require('path');
var fs = require('fs');

console.log('__dirname = ' + __dirname);

/**
 * normalize 将非标准化的路径转化成标准化的路径
 * 1.解析. 和 ..
 * 2.多个斜杠会转成一个斜杠
 * 3.window下的斜杠会转成正斜杠
 * 4.如果以斜杠会保留
 **/
console.log(path.normalize('./a////b//..\\c//e//..//'));  // a\c\

//多个参数字符串合并成一个路径 字符串
console.log(path.join(__dirname,'a','b'));

/**
 * resolve
 * 以应用程序为根目录，做为起点，根据参数解析出一个绝对路径
 *  1. 以应用程序为根起点
 *  2. .. .
 *  3. 普通 字符串代表子目录
 *  4. /代表绝对路径根目录
 */
console.log(path.resolve());// 空代表当前的目录 路径
console.log(path.resolve('a','c'));
console.log(path.resolve('a','/c','/d'));// /d

/**
 * 可以获取 两个路径 之间的相对关系
 */
console.log(path.relative(__dirname, 'd:'));

//返回指定路径的所在目录
console.log(path.dirname(__filename));
console.log(path.dirname('./1.path.js'));

//basename 获取路径中的文件名
console.log(path.basename(__filename));
console.log(path.basename(__filename,'.js'));
console.log(path.extname(__filename));

// 分隔符
console.log(path.sep); //文件分隔符 window \ linux /
console.log(path.delimiter); //路径 分隔符 window ; linux :