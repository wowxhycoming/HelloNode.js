/**
 * Created by xuhuaiyu on 2015/9/29.
 */

var EventEmitter = require('events').EventEmitter;
var util = require('util');

function Person(name) {
    this.name = name;
}

// 如果希望一个对象可以处理事件，只要继承这个类就可以了
util.inherits(Person, EventEmitter);

// Person的实例就拥有EventEmitter的方法了
var me = new Person('xhy');

me.on('饿了', eat);
me.on('饿了', deprecated);

me.addListener('渴了', drink);

me.once('love',function(){
    console.log('结婚');
});

function eat() {
    console.log('吃饭');
}

function deprecated () {
    console.log('忍着下顿一起吃');
}

function drink() {
    console.log('喝水');
}

me.emit('饿了');
me.emit('渴了');
me.emit('love');

me.removeListener('饿了',eat);
console.log(me.listeners('饿了').length);
me.emit('饿了');
console.log('second time to love');
me.emit('love');
console.log('second time to love');

