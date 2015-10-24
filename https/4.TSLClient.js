/**
 * Created by xuhuaiyu on 2015/10/24.
 */

var tls = require('tls');
var fs = require('fs');
var options = {
    key:fs.readFileSync('client-key.pem'),
    cert:fs.readFileSync('client-cert.pem'),
    ca:fs.readFileSync('ca-cert.pem')//,
    //rejectUnauthorized:false //不加会报错
};
// 一定要注意，common name要匹配服务器域名，请求的时候也要指定
var client = tls.connect(8080,'localhost',options,function(){
    console.log('connected');
    client.write('hello');
});
client.setEncoding('utf8');
client.on('data',function(data){
    console.log(data);
});
client.on('end',function(){
    client.close();
});
client.on('error',function(err){
    console.error(err);
});
