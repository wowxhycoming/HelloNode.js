/**
 * Created by xuhuaiyu on 2015/10/24.
 */

var https = require('https');
var fs = require('fs');

var options = {
    hostname:'127.0.0.1',
    port:9001,
    path:'/',
    method:'GET',
    pfx:fs.readFileSync('server.pfx'),
    passphrase:'123456',
    agent:false
};

options.agent = new https.Agent(options);
var req = https.request(options,function(res){
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);
    res.setEncoding('utf-8');
    res.on('data',function(d){
        console.log(d);
    })
});
req.write('事件');
req.end();

req.on('error',function(e){
    console.log(e);
});