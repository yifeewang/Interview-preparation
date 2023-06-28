const fs = require('fs');
let buf = Buffer.alloc(6);// 创建6字节长度的buf缓存对象

// 打开文件
fs.open('read-demo.txt', 'r', (err, fd) => {
  // 读取文件
  fs.read(fd, buf, 0, 3, 0, (err, bytesRead, buffer) => {
    console.log(111, bytesRead);
    console.log(222, buffer);
    console.log(22222, buffer.toString());

    // 继续读取
    fs.read(fd, buf, 3, 3, 3, (err, bytesRead, buffer) => {
      console.log(333, bytesRead);
      console.log(444, buffer);
      console.log(444, buffer.toString());
    });
  });
});

// 3
// <Buffer e4 bd a0 00 00 00>
// wha

// 3
// <Buffer e4 bd a0 e5 a5 bd>
// what,s

