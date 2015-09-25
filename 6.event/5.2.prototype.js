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
    console.log(this.name === this.__proto__.name); // true 只有构造函数才有prototype属性 ，说明原型对象的name是一样的
};

var person1 = new Person();
person1.showName(); // this.name 中的 this指的是 person1


function Animal(name , food) {
    this.name = name;
    this.food = food;
    this.getName = function() {
      return this.name;
    };
}

Animal.prototype.food = 'meat';
Animal.prototype.eat = function () {
    console.log('I an eating ' + this.food);
};

var tiger = new Animal('tiger');
var mouse = new Animal('mouse', 'rice');
// false ： 在创建Animal的两个实例tiger和mouse的时候，getName是被重复创建的， 他们之间是不相等的
console.log(tiger.getName ==  mouse.getName);

// true ：原型上创建的属性是共用的，不会被重复创建
console.log(tiger.eat == mouse.eat);

console.log(tiger.getName()); // 返回函数执行结果
console.log(tiger.getName); // 返回属性，是个函数对象[Function]

// 原型上有个food、对象内部也有food。内部私有变量会覆盖原型上的变量，创建tiger的时候又没有传入food，就是undefined
tiger.eat(); // I an eating undefined
mouse.eat(); // I an eating rice

function a() {
    var a = 'a';
    function b() {
        console.log(a);
        var a = undefined; // 在b()的作用域内，定义了变量a，并且会预解释，预解释的范围是整个函数内部。
    }
    b();
}
a();

// ==== 解释3

/**
 * 原型链
 * Function 、 Object 都是构造函数，用于生成对象
 * 所有的构造函数，包括Object都是Function构造函数的实例
 * Object.prototype 是所有对象的祖先
 * Function.prototype 是所有函数的祖先
 *
 */
