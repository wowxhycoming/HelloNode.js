/**
 * useCrypto.js
 * @auther xuhuaiyu
 * @create 2016-07-24 14:44
 */

/**
 * 摘要算法：把任意长的字符串转成固定长的字符串。输入的值相同，输出的值一定相同；输入的值不同，输出的值也不同。
 * 应用：云盘，秒上传视频，先对视频进行摘要算法，如果该文件的摘要已存在，再上传的文件有相同的摘要，则不需要重复上传
 */
var crypto = require('crypto');

// 类似MD5的摘要算法，要比MD5层级更高、更安全
var shasum = crypto.createHash('sha1');
shasum.update('123'); // 这里 update 的原因是update可以写多次
shasum.update('456'); // 为什么要分多次 update 呢？比如上传视频的例子，不可能缓存几个G的内容然后再生成摘要，分批计算，解约内存
var digest = shasum.digest('base64'); // 按 base64 生成摘要信息
console.log(digest);