/**
 * Created by xuhuaiyu on 2015/9/5.
 */

var http = require('http');

// ��ʽ1
var server = http.createServer(function(req,res) {
    res.end("nice");
});

// http://127.0.0.1:8080/ ���Է���
server.listen(8080,'127.0.0.1');

// ��ʽ2
var server2 = http.createServer(server2Process);

// var��Ԥ���ͣ����ǲ��ḳֵ
var server2Process = function(req,res) {
    res.end("nice 2");
}

// http://127.0.0.1:8081/ �޷�����
server2.listen(8081,'127.0.0.1');

// ��ʽ3
var server3 = http.createServer(server3Process);

// function��Ԥ���ͣ�Ҳ�ḳֵ
function server3Process(req,res) {
    res.end("nice 3");
}

// http://127.0.0.1:8082/ ���Է���
server3.listen(8082,'127.0.0.1');