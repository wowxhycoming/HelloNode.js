/**
 * Created by xuhuaiyu on 2015/9/8.
 */

/**
 * 应用程序是进行类的对象实例
 * 在node.js里，process 对象代表node.js应用程序，可以在任何模块中访问（globle的一个实例）
 * 可以通过process获取应用程序的用户，运行环境等各种信息
 *
 * 1.mainModule 主模块
 *  在哪里run，哪个JS就是主模块，可以在mainModule的属性中看到
 */



//console.log(process); // PID 进程ID

// 标准输入，目的是挂起nodejs服务，可以在任务管理器中查看PID
process.stdin.on('data', function(chunk){
    // 这里有个问题，这个on函数是怎么来的，为什么有数据进来的是时候会触发函数执行？ -- 将在“事件”中解决
    process.stdout.write(chunk);
});

// 命令行参数
process.argv.forEach(function(val){
    console.log(val);
    // 如果是带参数 a b c 启动，将输出
    /*
     D:\DevSoftIns\nodejs\node.exe
     d:\NodeJSProject\HelloNode.js\5.globle\4.process.js
     a
     b
     c
     */
    // nodejs有两个默认参数，第一个是nodejs的可执行文件，第二个是当前文件，之后才是按顺序的输入参数
});

// 内存使用量
console.log(process.memoryUsage()); // { rss: 11603968, heapTotal: 4083456, heapUsed: 2234168 }
// rss：内存消耗量；heapTotal：堆内存总量；heapUsed：堆内存使用量


// cwd current working directory 当前工作目录
console.log(process.cwd()); // 就是当前文件所在目录


// 更改工作路径
process.chdir('../'); // 向上移动了一层
// 如果要读取要读取某个文件，如果当前目录下没有，就去上级目录找
var fs = require('fs');
//console.log(fs.readFileSync('a.txt')); // 报错，因为在上级目录没有a.txt


// 控制进程本身
// 任务管理器本身是一个进程，可以通过他kill掉其他的进程，说明进程之间是可以通信的
process.kill(); // kill指定PID的进程
// kill并不能杀死任意的程序，只是给指定的PID发一个请求关闭的信号，到底是不是要关闭由接收的进程自己决定


// 下面有process属性详解
/**
 * { title: 'D:\\NodeJSProject\\WebStorm-9.0.1\\bin\\runnerw.exe',
  version: 'v0.10.33',
  moduleLoadList:
   [ 'Binding evals',
     'Binding natives',
     'NativeModule events',
     'NativeModule buffer',
     'Binding buffer',
     'NativeModule assert',
     'NativeModule util',
     'NativeModule path',
     'NativeModule module',
     'NativeModule fs',
     'Binding fs',
     'Binding constants',
     'NativeModule stream',
     'NativeModule _stream_readable',
     'NativeModule _stream_writable',
     'NativeModule _stream_duplex',
     'NativeModule _stream_transform',
     'NativeModule _stream_passthrough',
     'NativeModule console',
     'Binding tty_wrap',
     'NativeModule net',
     'NativeModule timers',
     'Binding timer_wrap',
     'NativeModule _linklist',
     'Binding cares_wrap',
     'Binding pipe_wrap' ],
  versions:
   { http_parser: '1.0',
     node: '0.10.33',
     v8: '3.14.5.9',
     ares: '1.9.0-DEV',
     uv: '0.10.29',
     zlib: '1.2.3',
     modules: '11',
     openssl: '1.0.1j' },
  arch: 'x64',
  platform: 'win32',
  argv:
   [ 'D:\\DevSoftIns\\nodejs\\node.exe',
     'd:\\NodeJSProject\\HelloNode.js\\5.globle\\4.process.js' ],
  execArgv: [],
  env:
   { ALLUSERSPROFILE: 'C:\\ProgramData',
     APPDATA: 'C:\\Users\\11\\AppData\\Roaming',
     CLASSPATH: '.;D:\\DevSoftIns\\java\\jdk1.6\\lib\\dt.jar;D:\\DevSoftIns\\java\\jdk1.6\\lib\\tools.jar;',
     CommonProgramFiles: 'C:\\Program Files\\Common Files',
     'CommonProgramFiles(x86)': 'C:\\Program Files (x86)\\Common Files',
     CommonProgramW6432: 'C:\\Program Files\\Common Files',
     COMPUTERNAME: 'XUHUAIYU-PC',
     ComSpec: 'C:\\Windows\\system32\\cmd.exe',
     FP_NO_HOST_CHECK: 'NO',
     HOMEDRIVE: 'C:',
     HOMEPATH: '\\Users\\11',
     JAVA_HOME: 'D:\\DevSoftIns\\java\\jdk1.6',
     LOCALAPPDATA: 'C:\\Users\\11\\AppData\\Local',
     LOGONSERVER: '\\\\XUHUAIYU-PC',
     NUMBER_OF_PROCESSORS: '4',
     OS: 'Windows_NT',
     Path: 'D:\\DevSoftIns\\oracle11g\\product\\11.1.0\\db_1\\bin;C:\\Program Files (x86)\\Intel\\iCLS Client\\;C:\\Program Files\\Intel\\iCLS Client\\;C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\Program Files (x86)\\Intel\\OpenCL SDK\\3.0\\bin\\x86;C:\\Program Files (x86)\\Intel\\OpenCL SDK\\3.0\\bin\\x64;C:\\Program Files\\Intel\\Intel(R) Management Engine Components\\DAL;C:\\Program Files\\Intel\\Intel(R) Management Engine Components\\IPT;C:\\Program Files (x86)\\Intel\\Intel(R) Management Engine Components\\DAL;C:\\Program Files (x86)\\Intel\\Intel(R) Management Engine Components\\IPT;C:\\Program Files (x86)\\Common Files\\Acronis\\SnapAPI\\;D:\\DevSoftIns\\java\\jdk1.6\\bin;D:\\DevSoftIns\\java\\jdk1.6\\jre\\bin;D:\\DevSoftIns\\python2.7;C:\\Program Files (x86)\\Microsoft SQL Server\\90\\Tools\\binn\\;D:\\DevSoftIns\\apache-maven-3.2.3\\bin;D:\\DevSoftIns\\nodejs\\;D:\\DevSoftIns\\MongoDB\\Server\\3.0\\bin;E:\\软件安装\\TortoiseSVN-1.8.3\\bin;D:\\DevSoftIns\\UltraEdit\\;C:\\Program Files (x86)\\Java\\jre7\\bin;C:\\Users\\11\\AppData\\Roaming\\npm',
     PATHEXT: '.COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC',
     PROCESSOR_ARCHITECTURE: 'AMD64',
     PROCESSOR_IDENTIFIER: 'Intel64 Family 6 Model 60 Stepping 3, GenuineIntel',
     PROCESSOR_LEVEL: '6',
     PROCESSOR_REVISION: '3c03',
     ProgramData: 'C:\\ProgramData',
     ProgramFiles: 'C:\\Program Files',
     'ProgramFiles(x86)': 'C:\\Program Files (x86)',
     ProgramW6432: 'C:\\Program Files',
     PSModulePath: 'C:\\Windows\\system32\\WindowsPowerShell\\v1.0\\Modules\\',
     PUBLIC: 'C:\\Users\\Public',
     Rav: 'G:\\Program Files (x86)\\Rising\\Rav',
     RavData: 'C:\\ProgramData\\Rising\\Rav\\',
     SESSIONNAME: 'Console',
     SMARTTRKBASE: 'C:\\SmartSource',
     SystemDrive: 'C:',
     SystemRoot: 'C:\\Windows',
     TEMP: 'C:\\Users\\11\\AppData\\Local\\Temp',
     TMP: 'C:\\Users\\11\\AppData\\Local\\Temp',
     USERDOMAIN: 'XUHUAIYU-PC',
     USERNAME: '11',
     USERPROFILE: 'C:\\Users\\11',
     VS90COMNTOOLS: 'e:\\MicrosoftVisualStudio9.0\\Common7\\Tools\\',
     windir: 'C:\\Windows',
     windows_tracing_flags: '3',
     windows_tracing_logfile: 'C:\\BVTBin\\Tests\\installpackage\\csilogfile.log' },
  pid: 11888,
  features:
   { debug: false,
     uv: true,
     ipv6: true,
     tls_npn: true,
     tls_sni: true,
     tls: true },
  _needImmediateCallback: false,
  execPath: 'D:\\DevSoftIns\\nodejs\\node.exe',
  debugPort: 5858,
  _getActiveRequests: [Function],
  _getActiveHandles: [Function],
  _needTickCallback: [Function],
  reallyExit: [Function],
  abort: [Function],
  chdir: [Function],
  cwd: [Function],
  umask: [Function],
  _kill: [Function],
  _debugProcess: [Function],
  _debugPause: [Function],
  _debugEnd: [Function],
  hrtime: [Function],
  dlopen: [Function],
  uptime: [Function],
  memoryUsage: [Function],
  binding: [Function],
  _usingDomains: [Function],
  _tickInfoBox: { '0': 0, '1': 0, '2': 0 },
  _events: {},
  domain: null,
  _maxListeners: 10,
  EventEmitter: { [Function: EventEmitter] listenerCount: [Function] },
  _fatalException: [Function],
  _exiting: false,
  assert: [Function],
  config:
   { target_defaults:
      { cflags: [],
        default_configuration: 'Release',
        defines: [],
        include_dirs: [],
        libraries: [] },
     variables:
      { clang: 0,
        host_arch: 'ia32',
        node_has_winsdk: true,
        node_install_npm: true,
        node_prefix: '',
        node_shared_cares: false,
        node_shared_http_parser: false,
        node_shared_libuv: false,
        node_shared_openssl: false,
        node_shared_v8: false,
        node_shared_zlib: false,
        node_tag: '',
        node_unsafe_optimizations: 0,
        node_use_dtrace: false,
        node_use_etw: true,
        node_use_openssl: true,
        node_use_perfctr: true,
        node_use_systemtap: false,
        openssl_no_asm: 0,
        python: 'C:\\Python27\\python.exe',
        target_arch: 'x64',
        v8_enable_gdbjit: 0,
        v8_no_strict_aliasing: 1,
        v8_use_snapshot: true,
        visibility: '',
        want_separate_host_toolset: 1 } },
  nextTick: [Function: nextTick],
  _currentTickHandler: [Function: _nextTick],
  _nextDomainTick: [Function: _nextDomainTick],
  _tickCallback: [Function: _tickCallback],
  _tickDomainCallback: [Function: _tickDomainCallback],
  _tickFromSpinner: [Function: _tickFromSpinner],
  maxTickDepth: 1000,
  stdout: [Getter],
  stderr: [Getter],
  stdin: [Getter],
  openStdin: [Function],
  exit: [Function],
  kill: [Function],
  addListener: [Function],
  on: [Function],
  removeListener: [Function],
  mainModule:
   { id: '.',  // 模块的ID（其实就是文件路径），如果是.的话代表当前文件；如果不是.将是文件的绝对路径。
     exports: {}, // 导出对象，nodejs是符合CommonJS规范的，这个模块其实就是一个函数，里面的任何属性都不能被外界访问。如果函数内部的属性想被外界访问，那放到exports上就可以了。
     parent: null, // 父模块（依赖的模块）
     filename: 'd:\\NodeJSProject\\HelloNode.js\\5.globle\\4.process.js', // 文件名
     loaded: false, // 是否加载成功，（为什么是false，什么情况下才是加载成功？当这个模块的所有代码执行完毕，才会变成true）
     children: [], // 子模块（谁来依赖他）
     paths: // 找模块的顺序，是个数组，
      [ 'd:\\NodeJSProject\\HelloNode.js\\5.globle\\node_modules', // 当前文件夹的node_modules
        'd:\\NodeJSProject\\HelloNode.js\\node_modules', // 继续向上找
        'd:\\NodeJSProject\\node_modules',
        'd:\\node_modules' ] } } // 找到根目录为止
 */