/**
 * Created by xuhuaiyu on 2015/10/1.
 */

/**
 * Buffer 暂时存放输入输出数据的一段内存
 * Buffer 是全局对象
 **/
var os = require('os');

// 创建buffer对象的三种方法
// 1.new Buffer(size);
console.log('1.new Buffer(size)');
var buf1 = new Buffer(12); // 按指定大小初始化
console.log(buf1); //
buf1.fill(0);
console.log(buf1);

// 2.数组方式
console.log(os.EOL + '2.数组方式');
var buf2 = new Buffer([0x01,0x02,0x03]);
console.log(buf2);// 01 02 03

// 3.字符串来创建
console.log(os.EOL + '3.字符串来创建');
var buf3 = new Buffer('一个字符串');
//utf8 一个汉字对应3个字节
console.log(buf3);

// 字符串和buffer的长度
console.log(os.EOL + '字符串和buffer的长度');
var str = '一个字符串';
var buf = new Buffer(str);
console.log(str.length);
console.log(buf.length);

// 字符串不可修改，buf可修改
console.log(os.EOL + '字符串不可修改，buf可修改');
str[0] = '我';
console.log(str);//没有变化 ，字符串是只读的
buf[0] = 1;
console.log(buf);//类似于数组

// slice
console.log(os.EOL + 'slice');
var subStr = str.slice(1,3);
console.log(subStr);
var subBuf = buf.slice(1,3);
console.log(subBuf);
console.log('===');
console.log(buf);
subBuf[0] = 0;  // 这样修改subBuf会使buf的内容改变
console.log(buf);
console.log('===');

// buffer 字符串
console.log(os.EOL + 'buffer 字符串');
buf = new Buffer('一个字符串');
// Buffer.toString(encoding, start, end)
console.log(buf.toString('utf8',3,11));

// Buffer.write(string, offset, length, encoding)
console.log(os.EOL + 'Buffer.write');
buf = new Buffer(12);
buf.write('一个', 0, 6, 'utf8');
buf.write('字符', 6, 6, 'utf8');
console.log(buf.toString());

// 拼接Buffer
console.log(os.EOL + 'Buffer.concat  拼接Buffer');
buf = new Buffer('一个字符串');
console.log(buf);
buf1 = buf.slice(0,7);
buf2 = buf.slice(7);
console.log(buf1.toString());
console.log(buf2.toString());
console.log(Buffer.concat([buf1,buf2]).toString());

// StringDecoder
console.log(os.EOL + 'StringDecoder');
var StringDecoder = require('string_decoder').StringDecoder;
var decoder1 = new StringDecoder();
console.log(decoder1.write(buf1));
var decoder2 = new StringDecoder();
console.log(decoder2.write(buf2));

//Number 双精度的 Double
//value, offset
console.log(os.EOL + 'Number');
buf = new Buffer(4);
console.log(buf);

buf.writeInt8(0,0);
console.log(buf);

buf.writeInt8(16,1);
console.log(buf);

buf.writeInt8(32,2);
console.log(buf);

buf.writeInt8(64,3);//16*4*/
console.log(buf);

console.log(buf.readInt8(0));
console.log(buf.readInt8(1));
console.log(buf.readInt8(2));
console.log(buf.readInt8(3));

/**
 * 高位字节 低位字节
 * big 高位在前
 * little  低位在前
 */
console.log(os.EOL + '高位字节 低位字节');
buf = new Buffer(4);
console.log(buf);
buf.writeInt16BE(Math.pow(2,8),0);
buf.writeInt16BE(9,2);
console.log(buf);
console.log(buf.readInt16BE(0));
console.log(buf.readInt16BE(2));

//复制缓存
console.log(os.EOL + '复制缓存');
var srcBuf = new Buffer([4,5,6]);
var tarBuf = new Buffer(6);
tarBuf[0] = 1;
tarBuf[1] = 2;
tarBuf[2] = 3;
/**
 * targetBuffer 目标buffer
 * targetStart 目标的起始位置
 * sourceStart 源的起始位置
 * sourceEnd 源的结束位置
 */
srcBuf.copy(tarBuf,3,0,3);
console.log(tarBuf);

console.log(Buffer.isBuffer(srcBuf));//判断 是否是buffer
console.log(Buffer.byteLength("我喜欢"));//返回字符串的字节长度
console.log(Buffer.isEncoding('utf8'));

Buffer.prototype.copy = function(targetBuffer,targetStart,sourceStart,sourceEnd){
    var _this=this;
    for(var i=sourceStart;i<sourceEnd;i++){
        targetBuffer[targetStart]=_this[i];
        targetStart++;
    }
};