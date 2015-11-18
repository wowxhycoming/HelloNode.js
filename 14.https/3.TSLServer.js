/**
 * Created by xuhuaiyu on 2015/10/24.
 */

var tls = require('tls');
var fs = require('fs');
var options = {
    key:fs.readFileSync('server-key.pem'),//指定私钥
    cert:fs.readFileSync('server-cert.pem'),//指定证书
    requestCert:false,
    ca:fs.readFileSync('ca-cert.pem')//指定合法的证书机构
};

var server = tls.createServer(options,function(socket){
    socket.write('hello');
    socket.setEncoding('utf8');
    socket.pipe(socket);
});
server.listen(8080,'localhost');
