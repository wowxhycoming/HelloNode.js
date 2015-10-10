/**
 * Created by xuhuaiyu on 2015/10/10.
 */

var Readable = require('stream').Readable;
var util = require('util');

/**
 * 自定义一个流，可以从流里读取数据
 * 目的是了解流的原理
 */

/**
 * 自动以一个流对象
 * @constructor
 */
function MyReadStream(opt) {
    Readable.call(this); // 用 Readable 的构造函数初始化 this 的内部变量
    this._start = opt.start; // 1
    this._end = opt.end; // 10
}

/**
 * 要使 MyReadStream 有流的功能，就要继承 Readable，MyReadStream 就拥有了 Readable的所有方法。
 * Readable 读取数据，调用的是read方法，但是 Readable.prototype._read 是一个抽象方法， 其内部的实现是直接抛错。
 * 这就需要继承 Readable 的子类自己实现 _read 方法。
 */
util.inherits(MyReadStream, Readable);

/**
 * 实现打印从 opt.start 到 opt.end 之间的数字
 * 所有 Readable 的子类都必须提供一个 _read 方法用来抓取数据
 * Readable 工作原理：将数据读入一个队列，当readable事件发生时，调用read方法，数据从队列里取出
 * push null表示结束 触发EOF
 *
 * @private
 */
MyReadStream.prototype._read = function() {
    if(this._start>this._end){
        this.push(null); //null 意味着流读取结束 触发end事件
    }else{
        this.push(new Buffer(this._start+""));
    }
    this._start++;
};

var myReadStream = new MyReadStream({start:1,end:10});
myReadStream.setEncoding('utf8');
myReadStream.on('data',function(data){
    console.log(data);
}).on('end',function(){
    console.log('end');
});