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
// TODO 为啥 数组[元素] = obj 的时候会有空元素在数组里
var clients = []; // 存放所有的用户
// 也可以定义成 clients = {}  移除的时候用 delete clients[key]

var server = net.createServer(function(socket) {
    var nickName;
    socket.write('欢迎，请输入昵称\r\n');
    socket.setEncoding('utf8');
    console.log(clients);
    socket.on('data', function(chunk){
        if(nickName){
            broadcast(null, nickName + " ： " + chunk);
        } else {
            console.log(clients);
            if(clients[nickName]){
                socket.write('昵称已被占用，请重新输入昵称\r\n');
            } else {
                chunk = chunk.replace('\r\n', '');
                nickName = chunk;
                clients[nickName] = socket; // 保存用户名和socket的关系
                // 广播加入
                console.log(clients);
                broadcast(nickName, '系统： ' + nickName + ' 加入聊天室，目前有' + (clients.length - 1) + '人在聊天室');
            }
        }
    });

    socket.on('close', function() {
        delete clients[nickName];
        // 客户端发出close请求，socket已经关闭了，不能再对socket进行操作了。
        socket.destroy();
        broadcast(nickName, '系统： ' + nickName + ' 离开聊天室，目前有' + (clients.length-1) + '人在聊天室');
    });

    socket.on('error', function(error){
        console.log(error);
    });


});

function broadcast(nickName, msg) {
    msg += '\r\n';
    for(var name in clients) {
        if(name != nickName) {
            clients[name].write(msg);
        }
    }
}

server.listen(9000);

