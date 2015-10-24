/**
 * Created by xuhuaiyu on 2015/10/23.
 */

/**
 * 1.创建服务器；客户端可以连接服务器
 * 2.可以统计当前在线人数
 * 3.可以接受客户端信息，转发给其他客户端
 * 4.当客户端进入或退出时通知所有客户端
 * 5.用户连接的时候自定义名称
 */

var net = require('net');
var util = require('util');

var clients = []; // 存放所有的用户
// 也可以定义成 clients = {}  移除的时候用 delete clients[key]

var server = net.createServer(function(socket) {
    console.log(clients);
    var nickName;
    socket.write('欢迎，请输入用户名\r\n');
    socket.setEncoding('utf8');
    socket.on('data', function(chunk){
        if(nickName){
            broadcast(null, nickName + " ： " + chunk);
        } else {
            if(clients[nickName]){
                socket.write('用户名已被占用，请重新输入用户名\r\n');
            } else {
                chunk = chunk.replace('\r\n', '');
                nickName = chunk;
                clients[nickName] = socket; // 保存用户名和socket的关系
                // 广播加入
                broadcast(nickName,"系统： " + nickName + " 加入聊天室，目前有" + clients.length-1 + '人在聊天室');
            }
        }
    });

    socket.on('close', function() {
        clients.remove(clients);
        socket.destroy();
        broadcast(nickName,"系统： " + nickName + " 离开聊天室，目前有" + clients.length-1 + '人在聊天室');
    });

    function broadcast(nickName, msg) {
        msg += '\r\n';
        for(var name in clients) {
            if(name != nickName) {
                clients[name].write(msg);
            }
        }
    }
});

server.listen(9000);

