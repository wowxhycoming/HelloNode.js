/**
 * Created by xuhuaiyu on 2015/9/5.
 */

var http = require('http');

// 方式1
var server = http.createServer(function(req,res) {
    res.end("nice");
});

// http://127.0.0.1:8080/ 可以访问
server.listen(8080,'127.0.0.1');

// 方式2
var server2 = http.createServer(server2Process);

// var会预解释，但是不会赋值
var server2Process = function(req,res) {
    res.end("nice 2");
}

// http://127.0.0.1:8081/ 无法访问
server2.listen(8081,'127.0.0.1');

// 方式3
var server3 = http.createServer(server3Process);

// function会预解释，也会赋值
function server3Process(req,res) {
    res.end("nice 3");
}

// http://127.0.0.1:8082/ 可以访问
server3.listen(8082,'127.0.0.1');