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

//从上，我们可以看出，取值时、没有加 this 时：如果当前 () 中不存在同名的局部变量，则等同于加 this 处理；如果当前 () 中存在同名的局部变量，则按常规处理。
// 20行的console.log(b)，当前小括号中没有变量b，则变成this.b；
