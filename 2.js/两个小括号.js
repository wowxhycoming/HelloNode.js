/**
 * Created by xuhuaiyu on 2015/8/29.
 */

/**
 * Created by xuhuaiyu on 2015/8/29.
 */


function Foo() {
    (function() {
        this.b = 789;
    })();
    (function() {
        console.log(this.b); // 789         
        var b = 0;
        console.log(b); // 0     
    })();
}

var f = new Foo();
(function() {
    console.log(this.b); // 789     
    console.log(b); // 789 
})();

// 从上，我们可以看出，取值时、没有加 this 时：如果当前 () 中不存在同名的局部变量，则等同于加 this 处理；如果当前 () 中存在同名的局部变量，则按常规处理。
// 20行的console.log(b)，当前小括号中没有变量b，则变成this.b；


function Foo2() {
    var a = 123;
    this.a = 456;
    (function() {
        console.log(a); // 123 
        console.log(this.a); // undefined
    })(this.a);
}
var f2 = new Foo2();

// 以上代码，先显示 123，再显示 undefined，说明 alert(this.a); 
// 这句中 this 是指本 function 的，而不是其外部 function 的。如果要使用外部的成员，可使用参数的形式传入：
// var a = 123; 和 this.a = 456; 都是定义在两个小括号之外的变量

// 传参
//var a = '000';
function Foo3() {
    (function() {
        console.log(a); // 123
    })(a = '1');
}
var f3 = new Foo3();