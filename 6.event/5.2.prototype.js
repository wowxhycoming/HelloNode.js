/**
 * Created by xuhuaiyu on 2015/9/22.
 */

/**
 * 通过原型和构造函数生成对象，与自变量定义对象不同
 * 1.构造函数内定义的属性继承方式与原型对象不同
 *  在构造函数内定义的构造函数，不能直接集成，子类要通过call关键字来继承
 * 2.构造函数内部的任何属性，包括函数在内，会被重复创建，new多少个，就创建多少份，不同对象不共享实例。
 * 3.构造函数运行时有闭包的开销。
 *
 *
 *
 */

// ==== 解释3
function Person() {

}

// 在原型上定义方法
Person.prototype.name = 'person1';
Person.prototype.showName = function() {
    console.log(this.name);
    console.log(this.name === this.__proto__.name); // true 只有构造函数才有prototype属性
};

var person1 = new Person();
person1.showName(); // this.name 中的 this指的是 person1
// ==== 解释3
