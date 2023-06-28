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
