/**
 * Created by xuhuaiyu on 2015/9/22.
 */

/**
 * 会在源码中频繁的被发现
 * 推迟一个函数到下一个同步方法执行完毕后执行  或 异步回调方法执行前执行
 */

function say() {
    console.log('1');
}

// 如果想要是say方法异步执行，可以使用setTimeout方法
setTimeout(say, 0);

// 以上目标更好的实现方式是使用process.nextTick(function)
// nextTick的效率要比setTimeout高，是推荐使用的方法
process.nextTick(say);  // 输出 2 1 1

console.log('2'); // 先输入同步方法的2，在输入异步方法的1

// 另外一种实现方式
setImmediate(say);

// nextTick的优先级比setImmediate的高，总是先于setImmediate执行
// nextTick被放到当前事件环结尾，必须当前事件环执行完毕后才进入下一个事件环
process.nextTick(function() {
    console.log('nextTick延迟');
});

setImmediate(function() {
    console.log('immediate延迟');
});

///////////////////////

process.on('uncaughtException', function(err) {
    console.log(err);
});

ddd();// 报错的程序

