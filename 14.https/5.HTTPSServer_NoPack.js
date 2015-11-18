/**
 * Created by xuhuaiyu on 2015/10/24.
 */

/**
 * 证书机构
 * 1.生成证书服务器 私钥
 * openssl genrsa -out ./ca/ca.key 1024
 * 2.生成证书服务器 csr（证书的请求文件，就是要请求生成一个证书）
 * openssl req -new -key ./ca/ca.key -out ./ca/ca.csr
 */

var https = require('https');
var fs = require('fs');

var options = {
    key: fs.readFileSync('server-key.pem'),
    ca: [fs.readFileSync('ca-cert.pem')],
    cert: fs.readFileSync('server-cert.pem')
};

https.createServer(options,function(req,res){
    res.writeHead(200);
    res.end('hello world\n');
}).listen(9000,'localhost');
