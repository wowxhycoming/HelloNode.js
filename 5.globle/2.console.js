/**
 * Created by xuhuaiyu on 2015/9/5.
 */

// 可以看到 { ....,console: [Getter] } ，
//console.log(global);

console.log('%s','这是个字符串'); // 字符串


console.log('%j',{key:'按json形式输出对象'}); // 对象转JSON

console.log('%d',99.99); // 数字

console.log('%s',99.99);
console.log('%d','99.99');

console.log('%s forever %d', 'xhy' , 30); // 多个占位符

var a = 1, b = 1, c = 2, d = '2';
console.log('1+1'); // 1+1
console.log(1+1); // 2
console.log(a + c); // 3
console.log(c == d); // true
console.log(c === d); // false

// JSON对象转字符串
var person = {
    name:'xhy',
    age:'30',
    add:"bj"
};

console.log(JSON.stringify(person)); // {"name":"xhy","age":"30","add":"bj"}

console.dir(person); // 查看对象内容并输出 { name: 'xhy', age: '30', add: 'bj' }

console.trace(); // 打印堆栈信息

console.assert(1==1);
console.assert(1==2);

console.info('info');
console.warn('warn');
console.error('error');
