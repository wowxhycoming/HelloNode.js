/**
 * Created by xuhuaiyu on 2015/10/24.
 */

var https = require('https');
var fs = require('fs');

var options = {
    pfx:fs.readFileSync('server.pfx'),
    passphrase:'123456'
};

https.createServer(options,function(req,res){
    req.setEncoding('utf8');
    req.on('data', function(data){
        console.log(data);
    });

    res.writeHead(200);
    res.end('hello world\n');
}).listen(9001,'127.0.0.1');
