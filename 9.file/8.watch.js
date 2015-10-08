
var fs = require('fs');
/**
 * 监视文件或目录
 * curr fs.Stat
 * prev fs.Stat
 **/

var func1 = function(curr,prev){
   // console.log(curr,prev);
    if(Date.parse(prev.ctime)==0){
        console.log('文件刚刚创建');
    }else if(Date.parse(curr.ctime)==0){
        console.log('文件刚刚删除');
    }else{
        console.log('文件修改');
    }
};

/**
 * fs.watchFile(filename, [options], listener(curr, prev))
 *  filename 文件路径
 *  [options] 如果提供此参数，options 应该是包含两个成员persistent和interval的对象。
 *      其中persistent值为boolean类型。persistent指定进程是否应该在文件被监视（watch）时继续运行。
 *      interval指定了目标文件被查询的间隔，以毫秒为单位。
 *      缺省值为{ persistent: true, interval: 5007 }。
 *  listener(curr, prev) curr为文件现在的状态，prev为文件的前一个状态。
 */
fs.watchFile('cucumber.txt',{interval:0},func1);

setTimeout(function(){
    fs.unwatchFile('cucumber.txt',func1);
},10000);