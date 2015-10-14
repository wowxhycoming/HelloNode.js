/**
 * Created by xuhuaiyu on 2015/9/29.
 */


var util = require('util');
/**
 * 这是一个基于对象间原型继承的函数。
 *
 **/
console.log(util.inspect({name:'zfpx'}));

function Person() {
    this.name = 'someone';
    this.toString = function() {
        return this.name;
    }
}

var p = new Person();
console.log(util.inspect(p));
console.log(util.inspect(p, true)); // 第二个参数表示显示隐藏属性（对对象进行递归），默认值是false。

console.log(util.isArray([]));
console.log(util.isRegExp(/\d/));
console.log(util.isDate(new Date()));
console.log(util.isError(new Error));
