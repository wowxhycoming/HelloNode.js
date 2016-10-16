/**
 * Created by xuhuaiyu on 2015/11/20.
 */

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Person = function(name) {
    this.name = name;
};

util.inherits(Person, EventEmitter);

var me = new Person('xhy');

me.on('饿了', function() {
    console.log('我饿了');
});
me.on('饿了', eat);

me.emit('饿了');

function eat() {
    console.log('吃大餐');
}

function MyEmitter_() {

}

MyEmitter_.prototype.on = function(type, listener) {
    if(typeof listener != 'function') {
        new Error('这玩意不是一个方法：listener');
    }

    if(!this._events) {
        this._events = [];
    }

    if(this._events[type]) {
        this._events[type].push(listener);
    } else {
        this._events[type] = [listener];
    }
};

MyEmitter_.prototype.emit = function(type) {
    if(!this._events) {
        this._events = [];
    }

    var listeners = this._events[type];
    listeners.forEach(function(listener) {
        listener.apply();
    });
};

function Boy(name) {
    this.name = name;
}

//Boy.prototype = new MyEmitter_();
util.inherits(Boy, MyEmitter_);

var littleBoy = new Boy();

littleBoy.on('饿了', function(){
   console.log('wawawa......');
});

littleBoy.on('饿了', function(){
    console.log('wawawa1......');
});

littleBoy.emit('饿了');