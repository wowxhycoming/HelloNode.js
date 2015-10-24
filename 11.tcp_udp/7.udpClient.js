var dgram = require('dgram');
var client = dgram.createSocket('udp4');

/** send方法参数
 * buffer,
 * offset, buffer的偏移量  从第几个字节开始
 * length,
 * port,
 * address,
 * callback
 */
var i = 0;

client.send(new Buffer('某人的名字'),0,6,9100,'127.0.0.1');

client.on('message',function(msg,remoteInfo){
    i++;

    console.log(msg.toString());
    client.send(new Buffer('某人的名字'),6,6,remoteInfo.port,remoteInfo.address);

    if(i > 2){
        client.close();
    }
});