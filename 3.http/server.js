/**
 * Created by xuhuaiyu on 2015/9/5.
 */

var http = require('http');
var server = http.createServer(serverProcess);

function serverProcess(req,res) {

    var url = req.url;
    console.log(url);
    // �������Ϊ  http://127.0.0.1:8080/a/b/c/s/d/d/g/a/s  �� ���  /a/b/c/s/d/d/g/a/s


    res.end("nice");
}

server.listen(8080,'127.0.0.1');