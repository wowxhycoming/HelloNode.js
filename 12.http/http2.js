/**
 * Created by xuhuaiyu on 2015/11/3.
 */


var http = require("http");
var domain = require('domain');


var server = http.createServer(listener);

function listenerImpl(request, response) {
    console.log("123");
    setTimeout(function(){
        var r = Math.random() * 10;
        console.log("async num is " + r);
        if (r > 5) {
            throw new Error("async: random num" + r + " > 5");
        }
    },1);
}

var d = domain.create();

d.on('error',function(err){
    console.log(err);
});


function listener(request,response) {
    d.run(listenerImpl(request, response));
}

server.listen(9000);