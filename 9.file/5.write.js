/**
 * Created by xuhuaiyu on 2015/10/2.
 */

var fs = require('fs');
/**
 * fd
 * buffer buffer
 * offset 从buffer中读取的偏移量
 * length 写入的长度
 * position 写入文件的位置
 * callback
 */
// 覆盖写入
//fs.open('msg.txt','w',function(err,fd){
//    fs.write(fd,new Buffer('一个fs.write的例子'),3,6,0,function(err,bytesWritten,buff){
//        console.log(buff);
//        console.log('写入成功,写入了'+bytesWritten);
//    })
//});

// position null 当前位置
// 追加写入
//fs.open('msg.txt','a',function(err,fd){
//    fs.write(fd,new Buffer('fs.write的参数中，position为null的例子'),0,6,null,function(err,bytesWritten,buff){
//        console.log('写入成功,写入了'+bytesWritten);
//        fs.write(fd,new Buffer('fs.write的参数中，position为null的例子'),6,6,null,function(err,bytesWritten,buff){
//            console.log('写入成功,写入了'+bytesWritten);
//        });
//    });
//});

/**
 * 写入文件之后，要关闭文件
 **/
// flags = x 是保证 path 是一个新建文件
fs.open('msg.txt','xa',function(err,fd){
    if(err)
        console.log(err);
    console.log(fd);
    fs.write(fd,new Buffer('写入文件之后，要关闭文件'),0,6,null,function(){
        fs.fsync(fd,function(){ // 同步磁盘缓存
            fs.close(fd);
        });//把缓存区里的数据立刻马上迅速同步到目标文件里去
    });
});

setTimeout(function(){
    // 就算没有写入操作，也会覆盖文件
    fs.open('msg.txt','w',function(err,fd){
        if(err)
            console.log(err);
        console.log(fd);
    });
},10000);

/**
 * 注意：
 *  在 Linux 上，无法对以追加 (append) 模式打开的文件进行指定位置的写入操作。 内核会忽略位置参数并且总是将数据追加到文件尾部。
 */

/**
 * fs.open方法中 flags 参数展开
 * 'r'  - 以【只读】的方式打开文件. 当文件不存在时产生异常.
 * 'r+' - 以【读写】的方式打开文件. 当文件不存在时产生异常.
 * 'rs' - 同步模式下，以【只读】的方式打开文件. 指令绕过操作系统的本地文件系统缓存.
 *  该功能主要用于打开 NFS 挂载的文件, 因为它可以让你跳过默认使用的过时本地缓存. 但这实际上非常影响 I/O 操作的性能, 因此除非你确实有这样的需求, 否则请不要使用该标志.
 *  注意: 这并不意味着 fs.open() 变成了一个同步阻塞的请求. 如果你想要一个同步阻塞的请求你应该使用 fs.openSync().
 * 'rs+' - 同步模式下, 以【读写】的方式打开文件. 请谨慎使用该方式, 详细请查看 'rs' 的注释.
 * 'w' - 以【只写】的形式打开文件. 文件会被创建 (如果文件不存在) 或者覆盖 (如果存在).
 * 'wx' - 类似 'w' 区别是如果文件存在则操作会失败.
 * 'w+' - 以【读写】的方式打开文件. 文件会被创建 (如果文件不存在) 或者覆盖 (如果存在).
 * 'wx+' - 类似 'w+' 区别是如果文件存在则操作会失败.
 * 'a' - 以【附加】的形式打开文件，即新写入的数据会附加在原来的文件内容之后. 如果文件不存在则会默认创建.
 * 'ax' - 类似 'a' 区别是如果文件存在则操作会失败.
 * 'a+' - 以【读取】和【附加】的形式打开文件. 如果文件不存在则会默认创建.
 * 'ax+' - 类似 'a+' 区别是如果文件存在则操作会失败.
 *
 * 排除 (exclusive) 标识 'x' （对应 open(2) 的 O_EXCL 标识） 保证 path 是一个新建的文件。
 *  POSIX 操作系统上，即使 path 是一个指向不存在位置的符号链接，也会被认定为文件存在。 排除标识在网络文件系统不能确定是否有效。
 */

/**
 * fs.open方法中 [mode]， 为可选参数
 * 参数 mode 用于设置文件模式 (permission and sticky bits), 不过前提是这个文件是已存在的. 默认情况下是 0666, 有可读和可写权限.
 */