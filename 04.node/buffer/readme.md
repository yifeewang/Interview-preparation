# Node.js核心模块-buffer

## Buffer 探究
看一段使用stream操作文件的例子:
```js
var fileName = path.resolve(__dirname, 'data.txt');
var stream=fs.createReadStream(fileName);
console.log('stream内容',stream);
stream.on('data',function(chunk){
    console.log(chunk instanceof Buffer)
    console.log(chunk);
})
```

看一下打印结果，发现第一个 stream 是一个对象 ，截图部分内容:
```js
apple@macs-MacBook-Air buffer % node index.js
stream内容 ReadStream {
  _readableState: ReadableState {
    objectMode: false,
    highWaterMark: 65536,
    buffer: BufferList { head: null, tail: null, length: 0 },
    length: 0,
    pipes: null,
    pipesCount: 0,
    flowing: null,
    ended: false,
    endEmitted: false,
    reading: false,
    sync: true,
    needReadable: false,
    emittedReadable: false,
    readableListening: false,
    resumeScheduled: false,
    emitClose: false,
    autoDestroy: false,
    destroyed: false,
    defaultEncoding: 'utf8',
    awaitDrainWriters: null,
    multiAwaitDrain: false,
    readingMore: false,
    decoder: null,
    encoding: null,
    [Symbol(kPaused)]: null
```

第二个和第三个打印结果:
```js
true
<Buffer 27 68 65 6c 6c 6f 20 77 6f 72 6c 64 21 27>
```

Buffer 对象，类似数组，它的元素为 16 进制的两位数，即 0 到 255 的数值。可以看出 stream 中流动的数据是 Buffer 类型，二进制数据，接下来开始我们的 Buffer 探索之旅。 

## 什么是二进制
二进制是计算机最底层的数据格式，字符串，数字，视频，音频，程序，网络包等，在最底层都是用二进制来进行存储。这些高级格式和二进制之间，都可以通过固定的编码格式进行相互转换。 例如，C 语言中 int32 类型的十进制整数（无符号），就占用 32bit 即 4byte，十进制的 3 对应的二进制就是00000000 00000000 00000000 00000011。字符串也是同理，可以根据 ASCII 编码规则或者 unicode 编码规则（如 utf-8）等和二进制进行相互转换。总之，计算机底层存储的数据都是二进制格式，各种高级类型都有对应的编码规则和二进制进行相互转换。

## node 中为什么会出现 Buffer 这个模块
在最初的javascript生态中，javascript还运行在浏览器端，对于处理 Unicode 编码的字符串数据很容易，但是对于处理二进制以及非Unicode编码的数据无能为力，但是对于Server端操作TCP/HTTP以及文件I/O的处理是必须的。我想就是因此在Node.js里面提供了Buffer类处理二进制的数据，可以处理各种类型的数据。 

## Buffer 创建
在 NodeJS v6.0.0版本之前，Buffer实例是通过 Buffer 构造函数创建的，即使用 new 关键字创建，它根据提供的参数返回不同的 Buffer，但在之后的版本中这种声明方式就被废弃了，替代 new 的创建方式主要有以下几种。 

### 1. Buffer.alloc 和 Buffer.allocUnsafe(创建固定大小的 buffer)
用 Buffer.alloc 和 Buffer.allocUnsafe 创建 Buffer 的传参方式相同，参数为创建 Buffer 的长度，数值类型。
```js
const fs = require('fs');
const path = require('path');
var fileName = path.resolve(__dirname, 'data.txt');
var stream=fs.createReadStream(fileName);
stream.on('data',function(chunk){
})


// Buffer.alloc 和 Buffer.allocUnsafe 创建 Buffer
// Buffer.alloc 创建 Buffer,创建一个大小为6字节的空buffer，经过了初始化
let buf1 = Buffer.alloc(6);

// Buffer.allocUnsafe 创建 Buffer，创建一个大小为6字节的buffer，未经过初始化
let buf2 = Buffer.allocUnsafe(6);

console.log(buf1); // <Buffer 00 00 00 00 00 00>
console.log(buf2); // <Buffer 00 e7 8f a0 00 00>
```
通过代码可以看出，用 Buffer.alloc 和 Buffer.allocUnsafe 创建Buffer 是有区别的：
>   Buffer.alloc 创建的 Buffer 是被初始化过的，即 Buffer 的每一项都用 00 填充

>   Buffer.allocUnsafe 创建的 Buffer 并没有经过初始化，在内存中只要有闲置的 Buffer 就直接 “抓过来” 使用。 

Buffer.allocUnsafe 创建 Buffer 使得内存的分配非常快，但已分配的内存段可能包含潜在的敏感数据，有明显性能优势的同时又是不安全的，所以使用需格外 “小心”。

### 2、Buffer.from(根据内容直接创建 Buffer)

>   Buffer.from(str, ) 支持三种传参方式：

1.第一个参数为字符串，第二个参数为字符编码，如 ASCII、UTF-8、Base64 等等。 
2.传入一个数组，数组的每一项会以十六进制存储为 Buffer 的每一项。 
3.传入一个Buffer，会将 Buffer 的每一项作为新返回 Buffer 的每一项。

说明:Buffer目前支持的编码格式

ascii - 仅支持 7 位 ASCII 数据。 
utf8 - 多字节编码的 Unicode 字符 
utf16le - 2 或 4 个字节，小端编码的 Unicode 字符 
base64 - Base64 字符串编码 
binary - 二进制编码。 
hex - 将每个字节编码为两个十六进制字符。

demo：
1.传入字符串和字符编码：
```js
// 传入字符串和字符编码
let buf = Buffer.from("hello", "utf8");

console.log(buf); // <Buffer 68 65 6c 6c 6f>
```

2.传入数组：
```js
// 数组成员为十进制数
let buf = Buffer.from([1, 2, 3]);

console.log(buf); // <Buffer 01 02 03>

// 数组成员为十六进制数
let buf = Buffer.from([0xe4, 0xbd, 0xa0, 0xe5, 0xa5, 0xbd]);

console.log(buf); // <Buffer e4 bd a0 e5 a5 bd>
console.log(buf.toString("utf8")); // 你好
```

在 NodeJS 中不支持 GB2312 编码，默认支持 UTF-8，在 GB2312 中，一个汉字占两个字节，而在 UTF-8 中，一个汉字占三个字节，所以上面 “你好” 的 Buffer 为 6 个十六进制数组成。 
```js
// 数组成员为字符串类型的数字
let buf = Buffer.from(["1", "2", "3"]);
console.log(buf); // <Buffer 01 02 03>
```
传入的数组成员可以是任何进制的数值，当成员为字符串的时候，如果值是数字会被自动识别成数值类型，如果值不是数字或成员为是其他非数值类型的数据，该成员会被初始化为 00。 创建的 Buffer 可以通过 toString 方法直接指定编码进行转换，默认编码为 UTF-8。 

传入 Buffer：
```js
// 传入一个 Buffer
let buf1 = Buffer.from("hello", "utf8");

let buf2 = Buffer.from(buf1);

console.log(buf1); // <Buffer 68 65 6c 6c 6f>
console.log(buf2); // <Buffer 68 65 6c 6c 6f>
console.log(buf1 === buf2); // false
console.log(buf1[0] === buf2[0]); // true
buf1[1]=12;
console.log(buf1); // <Buffer 68 0c 6c 6c 6f>
console.log(buf2); // <Buffer 68 65 6c 6c 6f>
```
当传入的参数为一个 Buffer 的时候，会创建一个新的 Buffer 并复制上面的每一个成员。

Buffer 为引用类型，一个 Buffer 复制了另一个 Buffer 的成员，当其中一个 Buffer 复制的成员有更改，另一个 Buffer 对应的成员不会跟着改变，说明传入buffer创建新的Buffer的时候是一个深拷贝的过程。

## Buffer 与 stream
### stream 的流动为什么要使用二进制 Buffer
原因一： 
node官方使用二进制作为数据流动肯定是考虑过很多，比如在上一篇 想学 Node.js，stream 先有必要搞清楚 文章已经说过，stream 主要的设计目的——是为了优化IO操作（文件IO和网络IO），对应后端无论是文件IO还是网络IO，其中包含的数据格式都是未知的，有可能是字符串，音频，视频，网络包等等，即使就是字符串，它的编码格式也是未知的，可能ASC编码，也可能utf-8编码，对于这些未知的情况，还不如直接使用最通用的格式二进制. 

原因二：
Buffer对于http请求也会带来性能提升。
举一个例子：
```js
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(function (req, res) {
    const fileName = path.resolve(__dirname, 'buffer-test.txt');
    fs.readFile(fileName, function (err, data) {
        res.end(data)   // 测试1 ：直接返回二进制数据
        // res.end(data.toString())  // 测试2 ：返回字符串数据
    });
});
server.listen(8000);
```
代码中的buffer-test文件大小增加到50KB左右，然后使用ab工具测试一下性能，你会发现无论是从吞吐量（Requests per second）还是连接时间上，返回二进制格式比返回字符串格式效率提高很多。为何字符串格式效率低？—— 因为网络请求的数据本来就是二进制格式传输，虽然代码中写的是 response 返回字符串，最终还得再转换为二进制进行传输，多了一步操作，效率当然低了。

### Buffer 在 stream 数据流转充当的角色
我们可以把整个流(stream)和Buffer的配合过程看作公交站。在一些公交站，公交车在没有装满乘客前是不会发车的，或者在特定的时刻才会发车。当然，乘客也可能在不同的时间，人流量大小也会有所不同，有人多的时候，有人少的时候，乘客或公交车站都无法控制人流量。 

不论何时，早到的乘客都必须等待，直到公交车接到指令可以发车。当乘客到站，发现公交车已经装满，或者已经开走，他就必须等待下一班车次。

总之，这里总会有一个等待的地方，这个等待的区域就是Node.js中的Buffer，Node.js不能控制数据什么时候传输过来，传输速度，就好像公交车站无法控制人流量一样。他只能决定什么时候发送数据(公交车发车)。如果时间还不到，那么Node.js就会把数据放入Buffer等待区域中，一个在 RAM 中的地址，直到把他们发送出去进行处理。

注意点：
Buffer虽好也不要瞎用，Buffer与String两者都可以存储字符串类型的数据，但是，String与Buffer不同，在内存分配上面，String直接使用v8堆存储，不用经过c++堆外分配内存，并且Google也对String进行优化，在实际的拼接测速对比中，String比Buffer快。但是Buffer的出现是为了处理二进制以及其他非Unicode编码的数据，所以在处理非utf8数据的时候需要使用到Buffer来处理。