[node深入](http://www.inode.club/node/)
## Node.js 单线程误区
开启 Node.js 服务 Demo
```js
const http = require('http');

const server = http.createServer();
server.listen(3000,()=>{
    process.title='程序员成长指北测试进程';
    console.log('进程id',process.pid)
})
```
看这段代码，创建了http服务，开启了一个进程，都说了Node.js是单线程，所以 Node 启动后线程数应该为 1，但是事实并非如此，mac打开活动监视器，发现是11个线程.难道Javascript不是单线程？

解释一下这个原因：
Node 中最核心的是 v8 引擎，在 Node 启动后，会创建 v8 的实例，这个实例是多线程的。

主线程：编译、执行代码。
编译/优化线程：在主线程执行的时候，可以优化代码。
分析器线程：记录分析代码运行时间，为 Crankshaft 优化代码执行提供依据。
垃圾回收的几个线程。

所以大家常说的 Node 是单线程的指的是 JavaScript 的执行是单线程的(开发者编写的代码运行在单线程环境中)，但 Javascript 的宿主环境，无论是 Node 还是浏览器都是多线程的因为 libuv 中有线程池的概念存在的，libuv 会通过类似线程池的实现来模拟不同操作系统的异步调用，这对开发者来说是不可见的。

## V8中什么时候会创建额外进程

### 某些异步 IO 会占用额外的线程

还是上面那个例子，我们在定时器执行的同时，去读一个文件：
```js
const fs = require('fs')
setInterval(() => {
    console.log(new Date().getTime())
}, 3000)

fs.readFile('./kaola.html', () => {})
```
线程数量变成了 11 个，这是因为在 Node 中有一些 IO 操作（DNS，FS）和一些 CPU 密集计算（Zlib，Crypto）会启用 Node 的线程池，而线程池默认大小为 4，因此线程数变成了 11。

### 手动更改线程池默认大小：
```js
process.env.UV_THREADPOOL_SIZE = 64
```

## Libuv
Libuv 是一个跨平台的异步 IO 库，它结合了 UNIX 下的 libev 和 Windows 下的 IOCP 的特性，最早由 Node.js 的作者开发，专门为 Node.js 提供多平台下的异步IO支持。Libuv 本身是由 C++ 语言实现的，Node.js 中的非阻塞 IO 以及事件循环的底层机制都是由 libuv 实现的。
