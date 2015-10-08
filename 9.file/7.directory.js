var fs = require('fs');
var path = require('path');

// 1. 创建一个目录。mkdir 只能创建最后一层目录，不能级联创建
fs.mkdir('a/b',function(err){
    if(err)
        console.log(err);
    else
        console.log('创建成功');
});

// 2.读取一个目录。 files是一个数组，陈列该文件夹下的所有文件夹和文件
fs.readdir('a',function(err,files){
    if(err)
        console.error(err);
    else{
        console.log(files);
    }
});

// 3.查看状态
fs.stat('a',function(err,stat){
    console.log(stat);
    console.log(stat.isFile());
    console.log(stat.isDirectory());
    console.log(stat.size);
    console.log(stat.ctime); // 文件状态上次改变的时间
     // 在Node v0.12 版本之前, ctime 持有Windows系统的 birthtime 值. 注意在v.0.12版本中, ctime 不再是"creation time", 而且在Unix系统中，他从来都不是。
    console.log(stat.birthtime); // 创建时间
    console.log(stat.mtime); // 文件上次被修改的时间
    console.log(stat.atime); // 文件数据上次被访问的时间
});

// 4.判断一个文件或目录 是否存在
fs.exists('a/b/c',function(exists){
    console.log(exists);
});

// 5.相对路径到绝对路径
fs.realpath('a',function(err,path){
    console.log('a',path);
});
console.log('path ',path.resolve('a'));

// 6. 修改目录的信息 path, atime, mtime, callback
fs.utimes('msg.txt',new Date(),new Date(),function(){
    console.log('utimes');
});

// 7.修改权限 path, mode, callback
// r:4、w:2、x:1、-: 0
fs.chmod('msg.txt',0600,function(){

});

// 8.重命名
fs.rename('msg.txt','msg2.txt',function(){

});

// 9.文件内容截取
var currPath = 'msg2.txt';
fs.stat(currPath,function(err,stat){
    console.log('before',stat.size);
    fs.truncate(currPath,3,function(){
        fs.stat(currPath,function(err,stat){
            console.log('after',stat.size);
        });
    });
});