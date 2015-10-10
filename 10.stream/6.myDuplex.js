/**
 * Created by xuhuaiyu on 2015/10/10.
 */

var Duplex = require('stream').Duplex;
var util = require('util');
var fs = require('fs');

util.inherits(ChangeDuplex,Duplex);

/**
 * 要把一个原始文件加成一个加密文件
 * origin-pwd.txt -> encrypt-pwd.txt -> decrypt-pwd.txt
 * @constructor
 */
function ChangeDuplex(){
    Duplex.call(this);
}

/**
 * 全双工的读写实现 需要实现_read 和 _write 两个方法
 */

ChangeDuplex.prototype._read = function(){

};

ChangeDuplex.prototype._write = function(data){
    for(var i=0;i<data.length;i++){
        data[i] = 255 - data[i];// 255- (255-x)=x
    }
    this.push(data);
    this.push(null);
};

var change = new ChangeDuplex();
// 原始文件 转 加密文件
fs.createReadStream('origin-pwd.txt').pipe(change)
    .pipe(fs.createWriteStream('encrypt-pwd.txt'));

// 加密文件 转 解密文件
fs.createReadStream('encrypt-pwd.txt').pipe(change)
    .pipe(fs.createWriteStream('decrypt-pwd.txt'));