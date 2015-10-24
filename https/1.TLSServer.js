/**
 * Created by xuhuaiyu on 2015/10/24.
 */

var tls = require('tls');
var fs = require('fs');

var options = {
    key : '', // 服务器的私钥
    cert : '', // 服务器证书
    ca : '' // 合法的证书认证机构
};

var server =  tls.createServer(options, function(socket){
    socket.setEncoding('utf8');
    socket.write('hello');
    socket.pipe(socket);
});

server.listen(9000);