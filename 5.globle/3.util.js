/**
 * Created by xuhuaiyu on 2015/9/6.
 */

var util = require('util');

// 用util实现继承

function Xhy() {
    this.name = 'xhy';
    this.age = 30;
    this.say = function() {
        console.log('I am ' + this.name);
    };
}

// 原型链扩展属性
Xhy.prototype.showName = function() {
    // this的值： 谁来调用它， this就是谁； 下面用person对象调用的该方法，this就是person，this.name就是Xhy
    console.log(this.name);
};

function Rr() {
    //this.name = 'rr';
    Xhy.call(this); // 让子类可以调用say方法
    this.name = 'rr';
}

util.inherits(Rr, Xhy); // 等价于 Rr.prototype = new Xhy();


var xhy = new Xhy();
xhy.showName(); // xhy ,  在构造函数上定义的原型方法，对他的所有实例都是可以访问的
xhy.say(); // I am xhy

var rr = new Rr();
rr.showName(); // util实现继承的方法是，让子类原型链指向父类的原型链，在原型上扩展的属性，自然能访问
rr.say(); // 子类本没有say方法，是父类的自由属性，在子类中加上Xhy.call(this)使其调用时不报错。
          // 先Xhy.call再this.name='rr'，是先初始化父类属性，在覆盖属性。否则输出的内容都为父类属性。


function Person() {
    this.name = 'someone';
    this.toString = function() {
        return this.name;
    }
}

var p = new Person();
console.log(p.toString()); // someone
console.log(util.inspect(p)); // 对象的描述信息
console.log(util.inspect(p, true)); // 第二个参数表示显示隐藏属性（对对象进行递归），默认值是false。

console.log(util.isArray([])); // 判断是不是一个数组