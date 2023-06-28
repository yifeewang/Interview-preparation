const fs = require('fs');
const path = require('path');
let buf = Buffer.alloc(6);// 创建6字节长度的buf缓存对象
const filePath = path.join(__dirname,'readFile-demo.js')
// 打开文件
fs.open('write-demo.txt', 'a', (err, fd) => {
    const fileResultBuf = fs.readFileSync(filePath);
  // 写入文件
  fs.write(fd, fileResultBuf, 0, 54, 19, (err, bytesRead, buffer) => {
    console.log(111, bytesRead);
    console.log(222, buffer);
    console.log(22222, buffer.toString());

    // 继续写入
    const newBuffer = new Buffer('写入文件数据内容2');
    fs.write(fd, newBuffer, 0, 25, 74, (err, bytesRead, buffer) => {
      console.log(333, bytesRead);
      console.log(444, buffer);
      console.log(444, buffer.toString());
    });
  });
});

// 111 54
// 222 <Buffer 66 75 6e 63 74 69 6f 6e 20 6e 61 6d 65 73 28 61 2c 20 62 29 20 7b 0a 20 20 20 20 72 65 74 75 72 6e 20 61 20 2b 20 62 0a 7d 0a 0a 6e 61 6d 65 73 28 31 ... 4 more bytes>
// 22222 function names(a, b) {
//     return a + b
// }

// names(1, 2)
// (node:55458) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
// 333 25
// 444 <Buffer e5 86 99 e5 85 a5 e6 96 87 e4 bb b6 e6 95 b0 e6 8d ae e5 86 85 e5 ae b9 32>
// 444 写入文件数据内容2