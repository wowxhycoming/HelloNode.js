/**
 * Created by xuhuaiyu on 2015/10/10.
 */

var Writable = require('stream').Writable;
var util = require('util');

// 继承
util.inherits(MyWriteStream, Writable);


function MyWriteStream(){
    Writable.call(this);
}

/**
 * Writable 的子类都必须实现 _write 方法
 * @param data
 * @param encoding
 * @param callback
 * @private
 */
MyWriteStream.prototype._write = function(data, encoding, callback) {
    console.log(data.toString());
    callback();
};


var myWriteStream = new MyWriteStream();
myWriteStream.write('徐怀宇1', 'utf8', function(){
    console.log('callback输出 写入成功1');

    myWriteStream.write('徐怀宇2', 'utf8', function(){
        console.log('callback输出 写入成功2');
    });

});