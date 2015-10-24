/**
 * Created by xuhuaiyu on 2015/10/24.
 */

var https = require('https');
var fs = require('fs');

var options = {
    hostname:'localhost',
    port:9000,
    path:'/',
    method:'GET',
    key:fs.readFileSync('client-key.pem'),
    cert:fs.readFileSync('client-cert.pem'),
    ca: [fs.readFileSync('ca-cert.pem')],
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
