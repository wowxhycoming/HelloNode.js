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


// 不想被随意kill的slave，处理不同的kill类型的信号量
// 来自键盘的信号量
process.on('SIGINT',function() {
    console.log("接收到来自键盘kill进程的信号量，但是并没有什么卵用");
});

//
process.on('SIGTERM',function() {
    console.log("接收到来自键盘kill进程的信号量，但是并没有什么卵用");
});