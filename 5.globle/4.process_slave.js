/**
 * Created by xuhuaiyu on 2015/9/8.
 */

// 主要功能就是被杀死

// 输出当前进程pid，方便主人锁定目标
console.log(process.pid);

// 为了被kill而挂起
process.stdin.on('data', function(chunk) {
    process.stdout.write(chunk);
});


