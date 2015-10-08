/**
 * Created by xuhuaiyu on 2015/10/1.
 */

var os = require('os');

console.log(os.platform()); //  返回操作系统平台的名字（如Linux, Windows)
console.log(os.type()); // 返回操作系统的名字
console.log(os.hostname()); // 返回主机名
console.log(os.arch()); // 返回体系架构（如ia32)
console.log(os.release()); // 返回操作系统内核版本号（如2.6.32）
console.log(os.cpus()); // 返回每核CPU的参数（型号/主频/用于基础进程的毫秒数等）
console.log(os.totalmem()); // 返回总内存数
console.log(os.freemem()); // 返回自由内存数
console.log(os.networkInterfaces()); // 返回网络接口（网卡的名称/地址/IP等）
console.log(os.EOL); // 返回系统换行符（如 '\n'）
console.log(os.tmpdir()); //返回系统临时文件的文件夹
console.log(os.endianness()); // 返回系统大小尾特征（如'LE')
