/**
 * Created by xuhuaiyu on 2015/10/2.
 */

var fs = require('fs');

fs.writeFile('write.txt',new Buffer('第一行'),{flag:'w',encoding:'utf8'},function(err){
    if(err){
        console.error(err);
    } else{
        console.log('覆盖写入成功');
    }
});

fs.writeFile('write.txt',new Buffer('第二行'),{flag:'a',encoding:'utf8'},function(err){
    if(err){
        console.error(err);
    } else{
        console.log('追加写入成功');
    }
});

// appendFile 本是追加写入的方法
fs.appendFile('write.txt',new Buffer('第三行'),{flag:'w'}, function(err){
    if(err){
        console.error(err);
    } else{
        console.log('追加写入成功');
    }
});

// base64  A-Za-z0-9+
fs.readFile('baidu.png','base64',function(err,data){
    fs.writeFile('b.png',data,'base64',function(){
        console.log('copy');
    })
});

var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
console.log(str[57]+str[56]+str[62]+str[32]);