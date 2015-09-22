/**
 * Created by xuhuaiyu on 2015/9/22.
 */

// bind
var xhy = {
    name : 'xhy',
    say : function(words) {
        console.log(this.name + ' say ' + words);
    }
};

xhy.say('hello');

var rr = {
    name : 'rr'
};

xhy.say.call(rr,'123'); // rr会替换this关键字

var someone = xhy.say.bind(rr, '456');
someone('hello');