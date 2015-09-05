/**
 * Created by xuhuaiyu on 2015/9/5.
 */

var http = require('http');
var server = http.createServer(serverProcess);

function serverProcess(req,res) {

    var url = req.url;
    console.log(url);
    // 如果访问为  http://127.0.0.1:8080/a/b/c/s/d/d/g/a/s  ， 输出  /a/b/c/s/d/d/g/a/s


    res.end("nice");
}

server.listen(8080,'127.0.0.1');