/**
 * Created by xuhuaiyu on 2015/9/29.
 */

/**
 * 观察者模式 订阅发布模式
 * 最简单的事件发布和订阅的实现
 * 一对多的依赖，用多个观察者对象监听一个对象，当这个对象发生状态改变的时候就会通知这些观察者，做出处理
 */


function MyEmitter() {

}
// 参数：事件的名字 、 回调函数
MyEmitter.prototype.on = function addListener(type, listener) {
    if(typeof  listener != 'function') {
        throw new TypeError('监听器不是一个函数');
    }

    // 如果此对象不存在，进行初始化
    if(!this._events) {
        this._events = [];
    }

    // 同一个事件可以注册多个监听函数
    // 如果事件存在，则把监听器放到这个事件集合集合中
    if(this._events[type]) {
        this._events[type].push(listener);
    } else { // 如果事件不存在，创建该事件的集合
        this._events[type] = [listener];
    }
};

MyEmitter.prototype.emit = function emit(type) {
    if(!this._events) {
        this._events = [];
    }

    var listeners = this._events[type];
    if(listeners) {
        listeners.forEach(function (listener) {
            listener.apply(this);
        });
    }
};

function Girl(){

}

// 继承 ： 让原型指向实例
Girl.prototype = new MyEmitter();

var girl = new Girl();

girl.on('21', function(){
   console.log('marry me');
});

console.log('on 18');
girl.emit('18');
console.log('on 21');
girl.emit('21');

