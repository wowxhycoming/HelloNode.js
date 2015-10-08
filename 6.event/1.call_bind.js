/**
 * Created by xuhuaiyu on 2015/9/24.
 */

// 1.call
var xhy = {
    name : 'xhy',
    say : function(words) { // words2
        console.log(this.name + ' say ' + words); // , words2
    }
};

xhy.say('hello');

var rr = {
    name : 'rr'
};

xhy.say.call(rr,'123'); // rr会替换this关键字

// 2.bind
// bind 的意思是 把第一个参数（rr）绑定成xhy的this ， xhy的say方法的参数绑定成第二个参数（456）
var someone = xhy.say.bind(rr, '456'); // this指向rr ， 参数指向456
someone('hello'); // 这里的参数将被安排到 绑定参数（456） 之后传入，如果say方法有多个参数，先取456 再取 hello

someone.call(xhy); // rr say 456
// 这表示，当bind后，this将不会再改变，但是参数可以合并
