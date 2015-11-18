/**
 * Created by xuhuaiyu on 2015/10/23.
 */
var http = require("http");
var domain = require('domain');

var server = http.createServer(listener);
var d = domain.create();

d.on('error',function(err){
    console.log(err);
});

function listenerImpl(request, response) {
    console.log("123");
    setTimeout(function(){
        var r = Math.random() * 10;
        console.log("async num is " + r);
        if (r > 5) {
            throw new Error("async: random num" + r + " > 5");
        }
    },10);
}

function listener(request,response) {
    d.run(listenerImpl(request, response));
}

server.listen(9000);